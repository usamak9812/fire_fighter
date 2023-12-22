Polymer("layer-manager", {
  width: 1920,
  height: 1920,
  centerX: 0,
  centerY: 0,
  ready: function(){
    this.root = this.$.root;
    this.framePosition = this.$.root.getBoundingClientRect();
    this.windowDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.addEventListener("mousewheel", function(e){
      this.fire("pauseEmitters");
      this.view.zoom += e.wheelDelta / 2000;
    });
    window.addEventListener("resize", function(e){
      this.view.offset.x += (window.innerWidth - this.windowDimensions.width) / 2;
      this.view.offset.y += (window.innerHeight - this.windowDimensions.height) / 2;
      this.windowDimensions.width = window.innerWidth;
      this.windowDimensions.height = window.innerHeight;
      this.updateFramePosition();
    }.bind(this));
  },
  observe: {
    "cursor.changed": "cursorAction",
    "view.zoom": "zoomChange",
    "view.offset.x": "updateFramePosition",
    "view.offset.y": "updateFramePosition",
    "selected.doJump": "jumpToSelection",
    "centerX": "updateFramePosition"
  },
  cursorAction: function(){
    if(this.cursor.action == 1){
      if(this.inputMode == "pan"){
        this.doPan();
      }
    }
    else if(this.cursor.action == 2){
      if(Math.abs(this.cursor.pinch.change) > this.cursor.pinch.threshold){
        this.view.zoom = this.cursor.pinch.zoomStart + (this.cursor.pinch.change / 250);
      }
      else{
        this.doPan();
      }
    }
    if(this.cursor.action === 0 && this.interactMode){
      this.view.time.pause = false;
    }
    else{
      this.view.time.pause = true;
    }
    if(this.inputMode == "erase"){
      // this.cursor.size = (this.draw.weight.value * 10 * this.view.scaledZoom;
      this.cursor.size = this.draw.weight.value * 10;
    }
    else if(this.inputMode == "node-edit"){
    }
    else{
      // this.cursor.size = this.draw.weight.value * this.view.scaledZoom;
      this.cursor.size = this.draw.weight.value;
    }
  },
  zoomChange: function(){
    this.zooming = true;
    this.job("target zoom wait", function(){
      this.zooming = false;
    }, 500);
    this.updateFramePosition();
  },
  updateFramePosition: function(){
    this.centerX = (window.innerWidth / 2) - this.view.offset.x;
    this.centerY = (window.innerHeight / 2) - this.view.offset.y;
    window.setTimeout(function(){
      this.rootFrame = this.$.root.getBoundingClientRect();
    }.bind(this), 0);
  },
  doPan: function(){
    var diffX = this.view.offset.x + this.cursor.layer.delta.x;
    var diffY = this.view.offset.y + this.cursor.layer.delta.y;
    if(diffY < window.innerHeight - (window.innerHeight / 2) &&
       diffY > -this.view.size.height + (window.innerHeight / 2)){
      this.view.offset.y += this.cursor.layer.delta.y;
      this.centerY -= this.cursor.layer.delta.y;
    }
    if(diffX < window.innerWidth - (window.innerWidth / 2) &&
       diffX > -this.view.size.width + (window.innerWidth / 2)){
      this.view.offset.x += this.cursor.layer.delta.x;
      this.centerX -= this.cursor.layer.delta.x;
    }
    this.view.offset = JSON.parse(JSON.stringify(this.view.offset));
  },
  jumpToSelection: function(o, n){
    if(n && this.selected.object){
      var selectedObject = this.selected.object;
      var x = selectedObject.position.x;
      var y = selectedObject.position.y;
      this.view.offset.x = -(x - (window.innerWidth / 2));
      this.view.offset.y = -(y - (window.innerHeight / 2));
      this.centerX = x;
      this.centerY = y;
    }
    this.selected.doJump = false;
  },
  setTargetUndo: function(){
    this.inputMode = "obj-spray-target";
    this.fire("captureobjectundo");
  },
  moveTarget: function(e){
    e.preventTap();
  },
  moveNode: function(e){
    // console.log(e);
    var node = this.selected.object.points[e.target.id];
    node[0] = this.cursor.layer.current.x - this.selected.object.position.x;
    node[1] = this.cursor.layer.current.y - this.selected.object.position.y;
    this.selected.object.update = !this.selected.object.update;
    e.preventTap();
  },
  clearTarget: function(){
    this.selected.object.turret.type = "agent_off";
    this.selected.object.turret.target.x = 10000;
    this.selected.object.turret.target.y = 10000;
  },
  targetPlacementDone: function(){
    this.inputMode = "obj-edit";
    this.job("place end wait", function(){
      this.selected.object = null;
    }, 0);
  },
  selectPathEnd: function(e){
    var objIndex = parseInt(e.target.id);
    this.selected.object = this.objects[objIndex];
  },
  movePathEnd: function(e){
    this.inputMode = "obj-drive-path";
    e.preventTap();
  },
  clearPathEnd: function(){
    this.selected.object.points = [];
  },
  pathEndPlacementDone: function(){
    this.inputMode = "obj-edit";
  },
  pow: function(val){
    return Math.pow(2, val);
  },
  clearParticles: function(){
    for(var i = 0; i != 6; i++){
      this.$["layer_" + i].particles = [];
    }
  }
});