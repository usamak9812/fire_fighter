Polymer({
  fireModeOptionsOpen: false,
  sprayModeOptionsOpen: false,
  spikeModeOptionsOpen: false,
  clockColorOptionsOpen: false,
  fireModes: ["fire_both", "fire_fire", "fire_smoke", "fire_off"],
  clockColors: ["black", "grey", "red"],
  sprayModes: [],
  spikeModes: ["agent_water", "agent_foam", "agent_clean" ,"agent_off"],
  ready: function(){
    this.hsl = {h:0,s:0,l:0};
    this.lastPosition = {x:-10000, y:-10000};
    this.$.vector.pointB = this.cursor.layer.current;
  },
  observe: {
    "cursor.changed": "cursorChange",
    "selected.object": "selectionChanged",
    "view.time.delta": "update",
    "view.zoom": "zoomChanged",
    "inputMode": "hideArrows"
  },
  zoomChanged: function(){
    this.style.display = "none";
    this.job("zoom wait", function(){
      this.style.display = "block";
    }, 500);
  },
  selectionChanged: function(){
    this.hsl = this.selected.object.hsl ? this.selected.object.hsl : {h:0,s:0,l:0};
    if(this.selected.object){
      this.lastPosition.x = this.selected.object.position.x;
      this.lastPosition.y = this.selected.object.position.y;
      if(this.selected.object.turret){
        this.sprayModes = Object.keys(this.selected.object.turret.agents);
        this.sprayModes.push("agent_off");
      }
    }
    this.spikeModeOptionsOpen = false;
    this.clockColorOptionsOpen = false;
    this.sprayModeOptionsOpen = false;
    this.fireModeOptionsOpen = false;
  },
  update: function(){
    if(this.selected.object){
      if(this.lastPosition.x != this.selected.object.position.x ||
         this.lastPosition.y != this.selected.object.position.y){
        this.style.opacity = "0";
        this.lastPosition.x = this.selected.object.position.x;
        this.lastPosition.y = this.selected.object.position.y;
      }
      else{
        this.style.opacity = "1";
      }
    }
  },
  cursorChange: function(){
    if(this.cursor.action == 1){
      if(this.inputMode == "obj-move"){
        this.doMove();
      }
      else if(this.inputMode == "obj-scale"){
        this.doScale();
      }
      else if(this.inputMode == "obj-scale-vertical"){
        this.doScaleVertical();
      }
      else if(this.inputMode == "obj-scale-horizontal"){
        this.doScaleHorizontal();
      }
      else if(this.inputMode == "obj-rotate"){
        this.doRotate();
      }
      else if(this.inputMode == "obj-wind"){
        this.doWind();
      }
      else if(this.inputMode == "obj-opacity"){
        this.doOpacity();
      }
      else if(this.inputMode == "obj-spray-target"){
        this.doTarget();
      }
      else if(this.inputMode == "obj-animation"){
        this.doAnimation();
      }
    }
    else if(this.cursor.action === 0){
      if(this.inputMode.indexOf("obj-drive") != -1 && !this.view.motionFreeze){
        this.selected.object = null;
      }
      if(this.inputMode.indexOf("obj") > -1){
        if(this.targetChange == 1){
          this.clearTarget();
        }
        else if(this.targetChange > 1){
          // this.selected.object = null;
        }
        this.targetChange = 0;
        this.inputMode = "obj-edit";
      }
    }
  },
  doAnimation: function(){
    var obj = this.selected.object;
    obj.animationSpeed = obj.animationSpeed || 33.333333;
    this.selected.object.animationSpeed += this.cursor.screen.delta.y / 4;
    obj.animationSpeed = Math.max(Math.min(100, obj.animationSpeed), 8.333333);
  },
  doTarget: function(){
    this.targetChange++;
    var t = this.selected.object.turret.target;
    t.x = this.cursor.layer.current.x;
    t.y = this.cursor.layer.current.y;
  },
  doWind: function(){
    this.selected.object.speed -= this.cursor.screen.delta.x / 2;
    if(this.selected.object.speed < 0){
      this.selected.object.speed = 0;
    }
    else if(this.selected.object.speed > 60){
      this.selected.object.speed = 60;
    }
  },
  doOpacity: function(){
    this.selected.object.opacity -= this.cursor.screen.delta.y / 100;
    if(this.selected.object.opacity < 0.1){
      this.selected.object.opacity = 0.1;
    }
    else if(this.selected.object.opacity > 1){
      this.selected.object.opacity = 1;
    }
  },
  doMove: function(){
    if(this.selected.object.turret){
      this.selected.object.turret.type = "agent_off";
    }
    if(this.selected.object.path !== undefined){
      this.selected.object.futurePath = "M" + this.selected.object.position.x + " " + this.selected.object.position.y;
      this.selected.object.path = "M" + this.selected.object.position.x + " " + this.selected.object.position.y;
      this.selected.object.pathLast.x = this.selected.object.position.x;
      this.selected.object.pathLast.y = this.selected.object.position.y;
    }
    this.job("path wait", function(){
      this.view.pathVisibility = true;
    }, 0);
    var diffX = this.selected.object.position.x + this.cursor.layer.delta.x;
    var diffY = this.selected.object.position.y + this.cursor.layer.delta.y;
    if(diffY < this.view.size.height && diffY > 0){
      this.selected.object.position.y += this.cursor.layer.delta.y;
    }
    else{
      this.inputMode = "obj-edit";
    }
    if(diffX < this.view.size.width && diffX > 0){
      this.selected.object.position.x += this.cursor.layer.delta.x;
    }
    else{
      this.inputMode = "obj-edit";
    }
  },
  doScale: function(){
    var fac = this.selected.object.scaleFactor || 4;
    var updated = this.selected.object.scale - (fac / 250 * this.cursor.screen.delta.y);
    if(updated < 0.01 * fac){
      updated = 0.01 * fac;
    }
    else if(updated > 1 * fac){
      updated = 1 * fac;
    }
    this.selected.object.scale = updated;
  },
  doScaleVertical: function(){
    this.selected.object.size.height += Math.round(this.cursor.screen.delta.y);
  },
  doScaleHorizontal: function(){
    this.selected.object.size.width += Math.round(this.cursor.screen.delta.x);
  },
  doRotate: function(){
    this.job("rot wait", function(){
      this.selected.object.rotation = this.$.vector.vector.current.angle + (Math.PI / 2);
    }, 0);
    // this.selected.object.rotation += this.$.vector.vector.delta.angle;
  },
  start: function(e){
    this.showArrows(e.target);
    this.fire("captureobjectundo");
    this.fireModeOptionsOpen = false;
    this.sprayModeOptionsOpen = false;
    this.spikeModeOptionsOpen = false;
    this.clockColorOptionsOpen = false;
    if(e.target.id == "delete"){
      this.fire("verifyDeleteObject");
    }
    else{
      this.inputMode = "obj-" + e.target.id;
    }
  },
  showArrows: function(button){
    if(button.id == "scale-horizontal" ||
       button.id == "direction" ||
       button.id == "spread" ||
       button.id == "wind" ||
       button.id == "evacuee-count"){
      button.appendChild(this.$["hori-arrows"]);
      this.$["hori-arrows"].style.opacity = "1";
    }
    else if(button.id == "scale-vertical" ||
            button.id == "scale" ||
            button.id == "opacity" ||
            button.id == "wind" ||
            button.id == "animation"){
      button.appendChild(this.$["vert-arrows"]);
      this.$["vert-arrows"].style.opacity = "1";
    }
    // e.target.appendChild(this.$["vert-arrows"]);
    // this.$["vert-arrows"].style.opacity = "1";
  },
  hideArrows: function(mode){
    if(mode != "obj-edit"){
      this.$["vert-arrows"].style.opacity = "0";
      this.$["hori-arrows"].style.opacity = "0";
    }
  },
  toggleClockColorOptions: function(e){
    this.clockColorOptionsOpen = !this.clockColorOptionsOpen;
    console.log(this.clockColorOptionsOpen)
  },
  toggleSprayModeOptions: function(e){
    this.sprayModeOptionsOpen = !this.sprayModeOptionsOpen;
    this.spikeModeOptionsOpen = false;
  },
  toggleSpikeModeOptions: function(e){
    this.spikeModeOptionsOpen = !this.spikeModeOptionsOpen;
    this.sprayModeOptionsOpen = false;
  },
  togglePlowRotation: function(){
    this.selected.object.plow.position--;
    if(this.selected.object.plow.position < -1){
      this.selected.object.plow.position = 1;
    }
  },
  modeSelect: function(e){
    var type = e.target.id.slice(0, 5);
    this.fire("captureobjectundo");
    if(type == "spike"){
      this.selected.object.boom.pMode = e.target.id.slice(6);
      this.spikeModeOptionsOpen = false;
    }
    else{
      this.selected.object.turret.type = e.target.id.slice(6);
      this.sprayModeOptionsOpen = false;
    }
    
    this.job("close wait", function(){
      this.selected.object = null;
    }, 259);
  },
  clockColorSelect: function(e){
    console.log(e.target)
    var color = e.target.id;
    this.fire("captureobjectundo");
    this.selected.object.color = color;
    this.clockColorOptionsOpen = false;
  },
  toggleFireModeOptions: function(e){
    this.fireModeOptionsOpen = !this.fireModeOptionsOpen;
  },
  toggleHorizontalFlip: function(e){
  	this.selected.object.flip = this.selected.object.flip === 1 ? -1 : 1;
  },
  fireModeSelect: function(e){
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
    this.fireModeOptionsOpen = false;
  },
  removeSelected: function(){
    this.fire("captureobjectundo");
    var idx = this.objects.indexOf(this.selected.object);
    this.objects.splice(idx, 1);
    this.selected.object = {position: {x: 100000, y: 100000}};
    this.verifyNoMoreWarnZones();
    this.verifyNoMoreFuelLeaks();
  },
  verifyNoMoreWarnZones: function(){
    var w = false;
    for(var i = 0; i != this.objects.length; i++){
      if(this.objects[i].type == "warn"){
        w = true;
      }
    }
    this.warn.exists = w;
  },
  verifyNoMoreFuelLeaks: function(){
    var w = false;
    for(var i = 0; i != this.objects.length; i++){
      if(this.objects[i].type == "leak"){
        w = true;
      }
    }
    this.leak.exists = w;
  },
  openModifyPartsDialog: function(){
    this.fire("captureobjectundo");
    this.fire("open-modify-parts");
  },
  toggleLock: function(){
    this.fire("captureobjectundo");
    if(this.selected.object.type == "vehicle"){
      this.view.lockedTo = (this.view.lockedTo == this.selected.object ? null : this.selected.object);
    }
    else{
      this.selected.object.locked = !this.selected.object.locked;
    }
  },
  togglePlaneSide: function(){
    this.fire("captureobjectundo");
    this.selected.object.right = !this.selected.object.right;
  },
  toggleEvacueesMode: function(){
    this.fire("captureobjectundo");
    this.selected.object.active = !this.selected.object.active;
    if(this.selected.object.active){
      this.selected.object.deployed = true;
    }
    this.selected.object = null;
  },
  toggleEvacueesSlide: function(){
    this.fire("captureobjectundo");
    this.selected.object.deployed = !this.selected.object.deployed;
    if(!this.selected.object.deployed){
      this.selected.object.active = false;
    }
  },
  togglePower: function(){
    this.fire("captureobjectundo");
    this.selected.object.turret.power = !this.selected.object.turret.power;
  },
  toggleWide: function(){
    this.fire("captureobjectundo");
    this.selected.object.turret.wide = !this.selected.object.turret.wide;
  },
  toggleExtend: function(){
    this.fire("captureobjectundo");
    this.selected.object.boom.extended = !this.selected.object.boom.extended;
  },
  toggleAuto: function(){
    this.fire("captureobjectundo");
    this.selected.object.turret.autoSpray = !this.selected.object.turret.autoSpray;
    if(!this.selected.object.turret.autoSpray){
      this.selected.object.turret.type = "agent_off";
    }
    else{
      this.view.motionFreeze = true;
    }
  },
  enableNodeEditMode: function(){
    this.inputMode = "node-edit";
  },
  
  disableNodeEditMode: function(){
    this.inputMode = "obj-edit";
  },
  selectImage: function(){
    chrome.fileSystem.chooseEntry({
      type: "openFile",
      accepts: [{mimeTypes: ["image/*"]}],
      acceptsAllTypes: false,
      acceptsMultiple: false
    },
    function(entry){
      entry[0].file(function(file){
        var reader = new FileReader();
        reader.onloadend = function(e){
          if(reader.result){
            this.fire("captureobjectundo");
            this.selected.object.graphic = reader.result;
          }
        }.bind(this);
        reader.readAsDataURL(file);
      }.bind(this));
    }.bind(this));
  },
  clearTarget: function(e){
    this.selected.object.turret.target.x = 10000;
    this.selected.object.turret.target.y = 10000;
  }
});