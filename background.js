chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "toggleDesignMode":
            chrome.scripting.executeScript({
                target: {tabId: message.tabId},
                function: setDesignMode,
                args: [message.mode]
            });
            break;

        case "getDesignModeStatus":
            chrome.scripting.executeScript({
                target: {tabId: message.tabId},
                function: getDesignModeStatus,
                args: []
            }, ([result]) => {
                sendResponse(result.result);
            });
            return true;  // this will keep the message channel open for the asynchronous response
    }
});

function setDesignMode(mode) {
    document.designMode = mode;
}

function getDesignModeStatus() {
    return document.designMode;
}
