(function() {

    browser.tabs.executeScript({file: "/content_scripts/grab.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);

    /*
     * Callback for executeScript
     */

    function listenForClicks() {
        document.addEventListener("click", (e) => {

            /*  
             * If user click on popup, initiate contact with content script
             */
            if (e.target.classList.contains("grab")) {
                
                browser.tabs.query({active: true, currentWindow: true})
                    .then(sendGrabMessage)
                    .catch(reportError);
            }

            /*  
             * Initiate download with the URL sent back from content script
             */

            function downloadVideo(downloadURL) {
                var downloading = browser.downloads.download({url: downloadURL});
        
                downloading.then(downloadSuccess)
                           .catch(downloadError);
            }

            function downloadSuccess(id) {
                console.log(`download success: ${id}`);
            }
        
            function downloadError(error) {
                console.error(`download error ${error}`);
            }          

            /*  
             * Send request to content script for grabbing the video URL
             * then listens for response back from content script
             */
            function sendGrabMessage(tabs) {
                var sending = browser.tabs.sendMessage(tabs[0].id, {start: "grabbing"});

                sending.then(handleResponse, handleResponseError);
            }

            function handleResponse(message) {
                downloadVideo(message.response);
            }

            function handleResponseError(error) {
                console.error(`Error ${error}`);
            }       

            /*
             * Error callback for sendGrabMessage
             */

            function reportError(error) {
                console.error(`Could not grab ${error}`);
            }
        });
    }

    /*
     * Error callback for executeScript
     */

    function reportExecuteScriptError(error) {
        console.error(`Failed to execute grab content script: ${error.message}`);
    }
})();