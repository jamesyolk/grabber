(function() {

    if (window.hasRun) {
        return;
    }

    window.hasRun = true;

    browser.runtime.onMessage.addListener(handleMessage);

    function grabURL() {
        return document.querySelector("div[class*=videoWrapper] video source").src;
    }

    function handleMessage(request, sender, sendResponse) {
        let videoURL = grabURL();
        sendResponse({response: videoURL});
    }
})();