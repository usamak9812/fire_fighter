Polymer({
  objects: [],
  selected: {
    object: null,
    doJump: true
  },
  modeSelect: false,
  fireModes: ["fire_both", "fire_fire", "fire_smoke", "fire_off"],
  ready: function(){
    this.objects = window.objects;
    this.selected = window.selected;
    this.view = window.view;
    var parent = chrome.app.window.get("viewer");
    parent.onClosed.addListener(function(){
      chrome.app.window.get("fire-panel-popout").close();
    });
    this.addEventListener("openmodeselect", function(e){
      this.modeSelectFire = e.detail.fire;
      this.job("select wait", function(){
        this.openModeOptions(e);
      }, 100);
    });
  },
  openModeOptions: function(fire){
    this.$["button-panel"].style.transform = "translateX(0)";
    this.modeSelect = true;
  },
  closeModeOptions: function(){
    this.$["button-panel"].style.transform = "translateX(-200px)";
    this.modeSelect = false;
  },
  changeMode: function(e){
    this.fire("captureobjectundo");
    this.modeSelectFire.mode = e.target.id;
    for(var g = 0; g != 4; g++){
      if(this.modeSelectFire.groups[g]){
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