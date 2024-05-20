chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    const endTime = message.endTime;
    const delayInMinutes = (endTime - Date.now()) / 1000 / 60;
    chrome.alarms.create('timerAlarm', { delayInMinutes: delayInMinutes });
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'timerAlarm') {
    chrome.runtime.sendMessage({ action: 'alarmFired' });
    chrome.storage.local.remove('endTime');
  }
});
