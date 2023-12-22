Polymer({
  open: true,
  selected: null,
  modeSelect: false,
  ready: function(){
    // this.$["content-scroll-panel"].addEventListener("scroll", function(){
    //   this.modeSelect = false;
    // }.bind(this));
    this.addEventListener("togglemodeselect", function(e){
      this.job("select wait", function(){
        this[e.detail.action + "ModeOptions"]();
      }, 100);
    });
    this.addEventListener("selectbybutton", function(e){
      this.fire("captureobjectundo");
      this.lockFireModeClose = true;
      this.inputMode = "obj-edit";
      this.selected.doJump = false;//!this.interactMode;
    });
  },
  togglePanel: function(){
    this.view.annotationClearWait = true;
    this.job("shift wait", function(){
      this.view.offset.x += 0.01;
      this.job("shift wait", function(){
        this.view.offset.x -= 0.01;
        this.job("shift wait", function(){
          this.view.annotationClearWait = false;
        }, 10);
      }, 10);
    }, 1000);
    if(!this.panels.evacuation){
      this.panels.evacuation = {open: true, popped: false};
    }
    this.panels.evacuation.open = !this.panels.evacuation.open;
    this.modeSelect = false;
  },
  openPopout: function(){
    chrome.app.window.create("/components/control-panels/evacuation-control/evacuation-control-popout.html", {
      id: "evacuation-panel-popout",
      innerBounds: {
        minWidth: 352,
        maxWidth: 352,
        minHeight: 440
      }
    }, function(w){
      w.contentWindow.objects = this.objects;
      w.contentWindow.selected = this.selected;
      w.contentWindow.view = this.view;
    }.bind(this));
  }
});