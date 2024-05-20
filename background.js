chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    const endTime = message.endTime;
    const delayInMinutes = (endTime - Date.now()) / 1000 / 60;
    chrome.alarms.create('timerAlarm', { delayInMinutes: delayInMinutes });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'timerAlarm') {
    const audio = new Audio(chrome.runtime.getURL('alarm.mp3'));
    audio.play();
    alert('¡El tiempo ha terminado!');
    chrome.storage.local.remove('endTime');
  }
});
