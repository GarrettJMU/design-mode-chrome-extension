chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleDesignMode") {
        chrome.scripting.executeScript({
            target: {tabId: message.tabId},
            code: `document.designMode = "${message.mode}";`
        });
    }
});