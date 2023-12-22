VERSION_NUMBER = "1.2.14";

Polymer("app-main", {
  inputMode: "pan",
  isTrial: false,
  maskWarned: false,
  sessionTemplate: {
    driveMode: "PathFollow",
    interactMode: false,
    warnZone: {
      exists: false,
      visible: false
    },
    fuelLeak: {
      exists: false,
      visible: true
    },
    panels: {
      fire: {
        open: true,
        popped: false
      },
      evacuation: {
        open: false,
        popped: false
      },
      vehicle: {
        open: false,
        popped: false
      },
      obj: {
        open: true
      },
      misc: {
        open: true
      },
      lib: {
        open: true
      }
    },
    wind: {
      speed: 0,
      direction: 0
    },
    view:{
      lockedTo: null,
      savedAnnotations: null,
      maxLayers: 5,
      namesVisible: false,
      pathsVisible: false,
      motionFreeze: false,
      offset: {
        x: 0,
        y: 0
      },
      size: {
        width: 1920,
        height: 1920
      },
      background: {
        color: "#ffffff",
        url: "",
        scale: 1,
        isPermanent: false,
        scaleLock: false,
        position: {
          x: 0,
          y:0
        }
      },
      globalScale: 1,
      scaledGlobalScale: 1,
      zoom: 4,
      scaledZoom: 1,
      time: {
        delta: 0,
        activeDelta: 0,
        last: 0,
        pause: false
      }
    },
    draw: {
      color: "red",
      weight: {
        name: "medium",
        value: 4
      }
    },
    selected: {
      object: null,
      doJump: true
    },
    objects: []
  },
  ready: function(){
    chrome.runtime.getBackgroundPage(bg => {
      this.isTrial = bg.isTrial;
    });
    this.$.file.create(true, function(){});
    this.canvas = null;
    this.library = this.$.library;
    this.addEventListener("clearsettings", function(){
      this.$["settings"].clear();
    });
    this.addEventListener("verifyClearAllAnnotations", function(){
      this.$["clear-annotation-dialog"].open();
    });
    this.addEventListener("open-settings", function(){
      this.$["settings"].open();
    });
    this.addEventListener("open-modify-parts", function(){
      this.$["modify-parts-dialog"].open();
    });
    this.addEventListener("captureobjectundo", function(){
      this.$.undo.captureObjectUndo(true);
    });
    this.addEventListener("capturesettingundo", function(e){
      this.$.undo.captureSettingUndo(e.detail.parent, e.detail.name);
    });
    this.addEventListener("captureannotationundo", function(){
      this.$.undo.captureAnnotationUndo();
    });
    this.addEventListener("showsplashscreen", function(){
      this.$.intro.open();
    });
    this.addEventListener("maskwarn", function(){
      if(!this.maskWarned){
        this.$["mask-warn"].open();
        this.maskWarned = true;
      }
    });
    this.addEventListener("print", function(){
      var ctx = this.canvas.getContext("2d");
      var data = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.session.view.annotationClearWait = true;
      var r = this.$.lm.getBoundingClientRect();
      var s = 986 / r.width;
      this.session.selected.object = null;
      this.$.lm.style.transform = "scale(" + s + ")";
      this.job("a", function(){
        var top = (750 - this.$.lm.getBoundingClientRect().height) / 2;
        this.session.view.annotationClearWait = true;
        this.$.lm.style.marginTop = top + "px";
        this.job("b", function(){
          window.print();
          this.session.view.annotationClearWait = true;
          this.$.lm.style.transform = "";
          this.$.lm.style.marginTop = "";
          this.job("c", function(){
            ctx.putImageData(data, 0, 0);
            this.session.view.annotationClearWait = false;
          }, 10);
        }, 1);
      }, 1);
    });
    window.requestAnimationFrame(this.updateTime.bind(this));
  },
  observe: {
    "session.driveMode": "driveModeChanged",
    "session.wind.speed": "windSpeedChanged",
    "session.wind.direction": "windDirectionChanged",
    "session.view.offset": "viewOffsetChanged",
    "session.view.namesVisible": "namesVisibleChanged",
    "session.view.pathsVisible": "pathsVisibleChanged",
    "session.view.motionFreeze": "motionFreezeChanged",
    "session.view.zoom": "zoomChanged",
    "session.view.globalScale": "globalScaleChanged",
    "session.draw.color": "colorChanged",
    "session.draw.weight": "weightChanged",
    "session.selected.object": "selectionChanged",
    "session.interactMode": "interactModeChanged",
    "inputMode": "inputModeChanged"
  },
  loadAnnotations: function(){
    this.inputMode = this.inputMode == "node-edit" ? "obj-edit" : this.inputMode;
    var canvas = this.$.lm.$.gpl.canvas;
    var ctx = canvas.getContext("2d");
    var lastOp = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.async(function(){
      if(this.session.view.savedAnnotations){
        var img = document.createElement("img");
        img.src = this.session.view.savedAnnotations;
        ctx.drawImage(img, 0, 0);
      }
    }, 500);
    ctx.globalCompositeOperation = lastOp;
  },
  interactModeChanged: function(o, n){
    this.inputMode = this.inputMode == "node-edit" ? "obj-edit" : this.inputMode;
  },
  inputModeChanged: function(o, n){
    if(n == "draw" || n == "erase"){
      this.session.selected.object = null;
    }
  },
  driveModeChanged: function(o){this.$.undo.captureSettingUndo(this.session, "driveMode", o);},
  windSpeedChanged: function(o){this.$.undo.captureSettingUndo(this.session.wind, "speed", o);},
  windDirectionChanged: function(o){this.$.undo.captureSettingUndo(this.session.wind, "direction", o);},
  viewOffsetChanged: function(o){this.$.undo.captureSettingUndo(this.session.view, "offset", o);},
  namesVisibleChanged: function(o){this.$.undo.captureSettingUndo(this.session.view, "namesVisible", o);},
  pathsVisibleChanged: function(o){this.$.undo.captureSettingUndo(this.session.view, "pathsVisible", o);},
  motionFreezeChanged: function(o){
    this.$.undo.captureSettingUndo(this.session.view, "motionFreeze", o);
    this.$.undo.captureObjectUndo(true);
  },
  colorChanged: function(o){this.$.undo.captureSettingUndo(this.session.draw, "color", o);},
  weightChanged: function(o){this.$.undo.captureSettingUndo(this.session.draw, "weight", o);},
  zoomChanged: function(o){
    this.$.undo.captureSettingUndo(this.session.view, "zoom", o);
    this.session.view.scaledZoom = Math.pow(2, this.session.view.zoom);
  },
  globalScaleChanged: function(o, n){
    this.session.view.scaledGlobalScale = Math.pow(2, this.session.view.globalScale);
  },
  selectionChanged: function(){
    if(!this.session.selected.object){
      this.session.selected.doJump = false;
      this.session.selected.object = {position: {x: -100000, y: -100000}};
    }
  },
  deselect: function(e){
    if(e.path[0] == this.$.lm){
      this.job("deselect wait", function(){
        if(this.inputMode != "pan" && this.inputMode != "node-edit" && this.cursor.action != 2){
          this.session.selected.object = null;
        }
      }, 0);
    }
  },
  updateTime: function(e){
    if(!chrome.app.window.current().isMinimized()){
      var time = this.session.view.time;
      time.activeDelta = (e - time.last);
      time.last = e;
      if(time.pause){
        time.delta = 0;
      }
      else{
        time.delta = time.activeDelta;
      }
    }
    window.requestAnimationFrame(this.updateTime.bind(this));
  },
  sessionChanged: function(){
    this.job("clear wait", function(){
      this.$.undo.clearStack();
      this.$.lm.clearParticles();
    }, 500);
  }
});