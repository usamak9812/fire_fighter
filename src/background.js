var fileID = null;
var isTrial = false;
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create(
    "index.html",
    // "video-start.html",
    {
      id: "viewer",
      // id: "video",
      innerBounds: {
        minWidth: 800,
        minHeight: 600
      },
      resizable: true
    }
  );
});