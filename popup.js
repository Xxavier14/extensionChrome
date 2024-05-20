document.addEventListener('DOMContentLoaded', function() {
  const startTimerButton = document.getElementById('startTimer');
  const timerElement = document.getElementById('timer');

  if (startTimerButton) {
    startTimerButton.addEventListener('click', () => {
      const endTime = Date.now() + 30 * 60 * 1000; // 30 minutos en milisegundos
      chrome.storage.local.set({ endTime: endTime }, () => {
        chrome.runtime.sendMessage({ action: 'startTimer', endTime: endTime });
        updateTimer(endTime);
      });
    });
  }

  chrome.storage.local.get('endTime', (result) => {
    if (result.endTime) {
      updateTimer(result.endTime);
    }
  });

  function updateTimer(endTime) {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = endTime - currentTime;

      if (timeLeft <= 0) {
        clearInterval(interval);
        timerElement.textContent = '00:00';
        return;
      }

      const minutes = Math.floor(timeLeft / 1000 / 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
});
