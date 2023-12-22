Polymer({
  fullscreen: false,
  fileOptions: [
    {
      name: "New",
      icon: "note-add"
    },
    {
      name: "Load",
      icon: "folder"
    },
    {
      name: "Save",
      icon: "save"
    },
    {
      name: "Save Copy",
      icon: "content-copy"
    },
    {
      name: "Print View",
      icon: "print"
    },
    {
      name: "Splash Screen",
      icon: "menu"
    }
  ],
  fileOptionsOpen: 0,
  observe: {
    "session.view.motionFreeze": "updateFreezeIndicator",
    "session.interactMode": "updateInteractIndicator"
  },
  ready: function(){
    this.fullscreenCheck();
    chrome.app.window.current().onFullscreened.addListener(function(){
      this.fullscreen = true;
    }.bind(this));
    chrome.app.window.current().onRestored.addListener(function(){
      this.fullscreen = false;
    }.bind(this));
    window.addEventListener("mousedown", this.closeFileOptions.bind(this));
    window.addEventListener("touchstart", this.closeFileOptions.bind(this));
    window.addEventListener("keyup", function(e){
      if(e.keyCode == 27){
        this.session.selected.object = null;
      }
    }.bind(this));
    window.addEventListener("keypress", function(e){
      switch(e.keyCode){
        case 19:
          this.saveFile();
      }
    }.bind(this));
  },
  fullscreenCheck: function(){
    if(chrome.app.window.current().isFullscreen()){
      this.fullscreen = true;
    }
    else{
      this.fullscreen = false;
    }
    this.job("fs check", this.fullscreenCheck, 1000);
  },
  toggleFileOptions: function(){
    this.job("open file options wait", function(){
      this.fileOptionsOpen = (this.fileOptionsOpen === 0 ? 1 : 0);
    }, 100);
  },
  closeFileOptions: function(e){
    this.job("closecheckwait", function(){
      if(e.path[0].id != "file-options"){
        this.fileOptionsOpen = 0;
      }
    }, 100);
  },
  fileAction: function(e){
    var action = e.target.id;
    switch(action){
      case "New":
        this.newFile();
        break;
      case "Load":
        this.loadFile();
        break;
      case "Save":
        this.saveFile();
        break;
      case "Print View":
        this.fire("print");
        break;
      case "Save Copy":
        this.saveFileCopy();
        break;
      case "Splash Screen":
        this.showSplashScreen();
    }
  },
  settingsAct: function(){
    this.fire("open-settings");
  },
  toggleFullscreen: function(){
    if(this.fullscreen){
      chrome.app.window.current().restore();
    }
    else{
      chrome.app.window.current().fullscreen();
    }
  },
  setInteract: function(e){
    this.session.interactMode = (e.target.id == "interact");
    this.session.selected.object = null;
    this.session.view.time.pause = !this.session.interactMode;
  },
  toggleTags: function(){
    this.session.view.namesVisible = !this.session.view.namesVisible;
  },
  togglePaths: function(){
    this.session.view.pathsVisible = !this.session.view.pathsVisible;
  },
  toggleMotion: function(){
    this.session.view.motionFreeze = !this.session.view.motionFreeze;
  },
  updateFreezeIndicator: function(){
    this.$["motion-pause-indicator"].style.opacity = this.session.view.motionFreeze ? "1" : "0";
  },
  updateInteractIndicator: function(){
    this.$.pauseIndicatorText.style.opacity = this.session.interactMode ? "0" : "1";
  },
  toggleWarnZone: function(){
    this.session.warnZone.visible = !this.session.warnZone.visible;
  },
  toggleFuelLeak: function(){
    this.session.fuelLeak.visible = !this.session.fuelLeak.visible;
  },
  disableAllAgents: function(){
    this.session.objects.forEach(object => {
      if(object.turret){
        object.turret.type = "agent_off";
      }
    });
  },
  disableAllFires: function(){
    this.session.objects.forEach(object => {
      if(object.type == "fire"){
        object.mode = "fire_off";
      }
    });
  },
  newFile: function(){
    this.file.create(false, function(){
      this.fire("clearsettings");
      var ctx = this.canvas.getContext("2d");
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }.bind(this));
  },
  loadFile: function(){
    this.file.loadSelected(function(){
      this.inputMode = this.inputMode == "node-edit" ? "obj-edit" : this.inputMode;
      var ctx = this.canvas.getContext("2d");
      var lastOp = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.async(function(){
        if(this.session.view.savedAnnotations){
          var img = document.createElement("img");
          img.src = this.session.view.savedAnnotations;
          ctx.drawImage(img, 0, 0);
        }
      }, 500);
      ctx.globalCompositeOperation = lastOp;
    }.bind(this));
  },
  saveFile: function(){
    var selected = this.session.selected.object;
    this.session.selected.object = null;
    this.session.view.savedAnnotations = this.canvas.toDataURL("image/png");
    this.file.saveActive(function(){
      this.session.selected.object = selected;
    }.bind(this));
  },
  saveFileCopy: function(){
    var selected = this.session.selected.object;
    this.session.selected.object = null;
    this.session.view.savedAnnotations = this.canvas.toDataURL("image/png");
    this.file.saveCopy(function(){
      this.session.selected.object = selected;
    }.bind(this));
  },
  showSplashScreen: function(){
    this.fire("showsplashscreen");
  },
  doUndo: function(){
    this.undo.undo();
  },
  doRedo: function(){
    this.undo.redo();
  }
});