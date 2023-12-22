Polymer({
  objects: [],
  selected: {
    object: null,
    doJump: true
  },
  ready: function(){
    this.objects = window.objects;
    this.selected = window.selected;
    this.view = window.view;
    var parent = chrome.app.window.get("viewer");
    parent.onClosed.addListener(function(){
      chrome.app.window.get("evacuation-panel-popout").close();
    });
  }
});