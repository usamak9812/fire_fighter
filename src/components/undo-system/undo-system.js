Polymer({
  doubleCatch: false,
  maxStackSize: 50,
  ready: function(){
    this.undoStack = [];
    this.redoStack = [];
    window.addEventListener("keypress", function(e){
      if(e.keyCode == 26){
        this[e.shiftKey ? "redo" : "undo"]();
      }
    }.bind(this));
  },
  clearStack: function(){
    this.undoStack = [];
    this.redoStack = [];
  },
  captureObjectUndo: function(clear){
    this.redoStack = clear ? [] : this.redoStack;
    var idx = this.session.objects.indexOf(this.session.selected.object);
    this.undoStack.push({
      type: "object",
      objects: JSON.stringify(this.session.objects),
      selectedIndex: idx
    });
    this.trimUndoStack();
  },
  captureSettingUndo: function(parent, name, value){
    if(!this.undoLock){
      if(!this["temp" + name]){
        this["temp" + name] = value;
      }
      this.job("delay" + name + "undo", function(){
        this.redoStack = [];
        this.undoStack.push({
          type: "setting",
          parent: parent,
          name: name,
          value: this["temp" + name]
        });
        this.trimUndoStack();
        this["temp" + name] = null;
      }, 500);
    }
    else{
      this.undoLock = false;
    }
  },
  captureAnnotationUndo: function(){
    if(!this.tempAnnotation){
      this.tempAnnotation = this.canvas.toDataURL("image/png");
    }
    this.job("annotationundo", function(){
      this.redoStack = [];
      this.undoStack.push({
        type: "annotation",
        data: this.tempAnnotation
      });
      this.trimUndoStack();
      this.tempAnnotation = null;
    }, 500);
  },
  trimUndoStack: function(){
    if(this.undoStack.length > this.maxStackSize){
      this.undoStack.splice(0, 1);
    }
  },
  undo: function(){
    var undo = this.undoStack.pop();
    if(undo){
      switch(undo.type){
        case "object":
          this.redoStack.push({
            type: "object",
            objects: JSON.stringify(this.session.objects),
            selectedIndex: this.session.objects.indexOf(this.session.selected.object)
          });
          this.session.selected.object = null;
          this.session.objects = JSON.parse(undo.objects);
          this.session.selected.object = this.session.objects[undo.selectedIndex];
          break;
        case "setting":
          this.redoStack.push({
            type: "setting",
            parent: undo.parent,
            name: undo.name,
            value: undo.parent[undo.name]
          });
          this.undoLock = true;
          undo.parent[undo.name] = undo.value;
          break;
        case "annotation":
          this.redoStack.push({
            type: "annotation",
            data: this.canvas.toDataURL("image/png")
          });
          var ctx = this.canvas.getContext("2d");
          var lastOp = ctx.globalCompositeOperation;
          ctx.globalCompositeOperation = "source-over";
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          var img = document.createElement("img");
          img.src = undo.data;
          ctx.drawImage(img, 0, 0);
          ctx.globalCompositeOperation = lastOp;
          break;
      }
    }
  },
  redo: function(){
    var redo = this.redoStack.pop();
    if(redo){
      switch(redo.type){
        case "object":
          this.captureObjectUndo(false, this.session.objects.indexOf(this.session.selected.object));
          this.session.selected.object = null;
          this.session.objects = JSON.parse(redo.objects);
          this.session.selected.object = this.session.objects[redo.selectedIndex];
          break;
        case "setting":
          this.undoStack.push({
            type: "setting",
            parent: redo.parent,
            name: redo.name,
            value: redo.parent[redo.name]
          });
          this.undoLock = true;
          redo.parent[redo.name] = redo.value;
          break;
        case "annotation":
          this.undoStack.push({
            type: "annotation",
            data: this.canvas.toDataURL("image/png")
          });
          var ctx = this.canvas.getContext("2d");
          var lastOp = ctx.globalCompositeOperation;
          ctx.globalCompositeOperation = "source-over";
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          var img = document.createElement("img");
          img.src = redo.data;
          ctx.drawImage(img, 0, 0);
          ctx.globalCompositeOperation = lastOp;
          break;
      }
    }
  }
});