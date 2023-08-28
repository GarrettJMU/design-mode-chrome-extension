const toggleSwitch = document.getElementById('toggleSwitch');
const statusLabel = document.getElementById('statusLabel');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];

    // Check the current state of designMode
    chrome.runtime.sendMessage({
        action: "getDesignModeStatus",
        tabId: currentTab.id
    }, (response) => {
        const isOn = response === "on";
        toggleSwitch.checked = isOn;
        statusLabel.textContent = isOn ? "On" : "Off";
    });
});

toggleSwitch.addEventListener('change', function() {
    const mode = toggleSwitch.checked ? "on" : "off";
    statusLabel.textContent = toggleSwitch.checked ? "On" : "Off";

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];

        chrome.runtime.sendMessage({
            action: "toggleDesignMode",
            tabId: currentTab.id,
            mode: mode
        });
    });
});
