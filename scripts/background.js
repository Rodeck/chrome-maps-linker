chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        openPopup();
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openPopup') {
        openPopup();
    }
  });

function openPopup() {
    chrome.windows.create({
        url: chrome.runtime.getURL('popup.html'),
        type: 'popup',
        width: 400,
        height: 600
      });
}