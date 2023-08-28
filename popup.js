let isOn = false;

document.getElementById('toggleBtn').addEventListener('click', function() {
    isOn = !isOn;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        const mode = isOn ? "on" : "off";

        chrome.runtime.sendMessage({
            action: "toggleDesignMode",
            tabId: currentTab.id,
            mode: mode
        });
    });
});
