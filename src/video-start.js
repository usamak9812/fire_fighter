document.addEventListener("DOMContentLoaded", function(){
  chrome.app.window.current().fullscreen();
  window.onkeydown = window.onkeyup = function(e){
    if(e.keyCode == 27){
      startProgram();
    }
    e.preventDefault();
  };
  document.querySelector("video").onended = function(){
    startProgram();
  };
});
function startProgram(){
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
    function(){
      chrome.app.window.current().close();
    }
  );
}