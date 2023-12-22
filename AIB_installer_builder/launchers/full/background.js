var fileID = null;

var isTrial = false;

chrome.app.runtime.onLaunched.addListener(function(e) {
  if(e.items){
    chrome.app.window.create(
      "index.html",
      {
        id: "viewer",
        innerBounds: {
          minWidth: 800,
          minHeight: 600
        },
        resizable: true
      },
      function(window){
        window.contentWindow.openFile = e.items[0].entry;
      }
    );
  }
  else{
    chrome.app.window.create("video-start.html", {
      id: "video",
      innerBounds: {
        minWidth: 800,
        minHeight: 600
      },
      resizable: true
    });
  }

});