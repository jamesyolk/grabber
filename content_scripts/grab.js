(function() {

    if (window.hasRun) {
        return;
    }

    window.hasRun = true;

    function downloadSuccess(id) {
        console.log(`download success: ${id}`);
    }

    function downloadError(error) {
        console.error(`download error: ${error}`);
    }

    function grabURL() {
        let videoURL = document.querySelector("div[class*=videoWrapper] video source").src;
        let downloading = browser.downloads.download({url: videoURL});
        
        downloading.then(downloadSuccess)
                   .catch(downloadError);

        alert(videoURL);
    }


    browser.runtime.onMessage.addListener((message) => {
        if (message.start === "grabbing") {
            //alert(message.start);
            grabURL();
        }
    });

})();