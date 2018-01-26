(function() {

    function listenForClicks() {
        document.addEventListener("click", (e) => {

            function sendGrabMessage(tabs) {
                browser.tabs.sendMessage(tabs[0].id, {start: "grabbing"});
            }

            function reportError(error) {
                console.error(`Could not grab ${error}`);
            }

            if (e.target.classList.contains("grab")) {
                
                browser.tabs.query({active: true, currentWindow: true})
                    .then(sendGrabMessage)
                    .catch(reportError);
            }
        });
    }

    function reportExecuteScriptError(error) {
        console.error(`Failed to execute grab content script: ${error.message}`);
    }

    browser.tabs.executeScript({file: "/content_scripts/grab.js"})
        .then(listenForClicks)
        .catch(reportExecuteScriptError);

})();