chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
  alert('Hello, Chrome!');

  sendResponse();
  return true;
});
