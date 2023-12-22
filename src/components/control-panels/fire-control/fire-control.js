Polymer({
  open: true,
  selected: null,
  modeSelect: false,
  fireModes: ["fire_both", "fire_fire", "fire_smoke", "fire_off"],
  ready: function(){
    this.$["content-scroll-panel"].addEventListener("scroll", function(){
      this.modeSelect = false;
    }.bind(this));
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
  observe: {
    "selected.object": "selectedObjectChanged",
  },
  selectedObjectChanged: function(oldObj, newObj){
    chrome.storage.local.set({selected: this.selected});
    if(!this.lockFireModeClose){
        this.closeModeOptions();
    }
    else{
      this.lockFireModeClose = false;
    }
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
    this.panels.fire.open = !this.panels.fire.open;
    this.closeModeOptions();
    this.modeSelect = false;
  },
  openPopout: function(){
    chrome.app.window.create("/components/control-panels/fire-control/fire-control-popout.html", {
      id: "fire-panel-popout",
      innerBounds: {
        minWidth: 176,
        maxWidth: 176,
        minHeight: 440
      }
    }, function(w){
      w.contentWindow.objects = this.objects;
      w.contentWindow.selected = this.selected;
      w.contentWindow.view = this.view;
    }.bind(this));
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
  },
  openModeOptions: function(){
    var vert_off = this.selectedItem.offsetTop + 72 - this.$["content-scroll-panel"].scrollTop;
    this.$["button-panel"].style.top = vert_off + "px";
    for(var i = 0; i != this.fireModes.length; i++){
      var mode = this.$[this.fireModes[i]];
      mode.style.webkitTransform = "translateX(" + (128 + (52 * i)) + "px)";
      mode.style.opacity = "1";
    }
    this.modeSelect = true;
  },
  closeModeOptions: function(){
    for(var i = 0; i != this.fireModes.length; i++){
      var mode = this.$[this.fireModes[i]];
      mode.style.webkitTransform = "translateX(0)";
      mode.style.opacity = "0";
    }
    this.modeSelect = false;
  },
  toggleModeOptions: function(){
    if(this.modeSelect){
      this.closeModeOptions();
    }
    else{
      this.openModeOptions();
    }
  },
  changeMode: function(e){
    this.fire("captureobjectundo");
    this.selected.object.mode = e.target.id;
    for(var g = 0; g != 4; g++){
      if(this.selected.object.groups[g]){
        for(var i = 0; i != this.objects.length; i++){
          var object = this.objects[i];
          if(object.type == "fire" && object.groups[g]){
            this.objects[i].mode = e.target.id;
          }
        }
      }
    }
    this.modeSelect = false;
    setTimeout(this.closeModeOptions.bind(this), 250);
  },
  addFire: function(){
    this.fire("captureundostate");
    var newFire = {
      type: "fire",
      name: "New Fire",
      mode: "fire_both",
      groups: [false, false, false, false],
      layer: 5,
      opacity: 0.9,
      position: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      locked: true,
      speed: 15,
      rotation: 0,
      scale: 0.5
    };
    this.objects.push(newFire);
    this.selected.object = newFire;
    this.inputMode = "obj-edit";
  },
  removeFire: function(){
    if(this.selected.object){
      var idx = this.objects.indexOf(this.selected.object);
      this.objects.splice(idx, 1);
      if(this.objects[idx]){
        this.selected.object = this.objects[idx];
        this.selected.doJump = true;
      }
      else if(this.objects[idx - 1]){
        this.selected.object = this.objects[idx - 1];
        this.selected.doJump = true;
      }
      else{
        this.selected.object = null;
      }
    }
  }
});