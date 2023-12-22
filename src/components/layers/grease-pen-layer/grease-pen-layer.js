Polymer({
  observe: {
    "cursor.changed": "cursorAction",
    "view.offset.x": "clearAnnotations",
    "view.offset.y": "clearAnnotations",
    "view.zoom": "clearAnnotations"
  },
  ready: function(){
    this.job("aeese", this.updateCanvas, 0);
    window.addEventListener("resize", this.updateCanvas.bind(this));
  },
  updateCanvas: function(){
    this.$.canvas.width = window.innerWidth;
    this.$.canvas.height = window.innerHeight;
    this.canvas = this.$.canvas;
    this.context = this.$.canvas.getContext("2d");
  },
  clearAnnotations: function(){
    if(this.context && !this.view.annotationClearWait){
      this.context.clearRect(0, 0, this.$.canvas.width, this.$.canvas.height);
      // this.cleared = true;
    }
  },
  cursorAction: function(){
    if(this.cursor.action == 1){
      if(this.inputMode == "draw"){
        this.doDraw();
      }
      else if(this.inputMode == "erase"){
        this.doErase();
      }
    }
  },
  doDraw: function(){
    if(!this.view.waitDraw){
      this.fire("captureannotationundo");
      // this.cleared = false;
      var cursor = this.cursor.screen;
      this.context.beginPath();
      this.context.globalCompositeOperation = "source-over";
      this.context.strokeStyle = this.draw.color;
      this.context.lineWidth = this.draw.weight.value;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.moveTo(cursor.last.x + 0.5, cursor.last.y + 0.5);
      this.context.lineTo(cursor.current.x + 0.5, cursor.current.y + 0.5);
      this.context.closePath();
      this.context.stroke();
    }
  },
  doErase: function(){
    if(!this.view.waitDraw){
      this.fire("captureannotationundo");
      var cursor = this.cursor.screen;
      this.context.beginPath();
      this.context.globalCompositeOperation = "destination-out";
      this.context.lineWidth = this.draw.weight.value * 10;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.moveTo(cursor.last.x + 0.5, cursor.last.y + 0.5);
      this.context.lineTo(cursor.current.x + 0.5, cursor.current.y + 0.5);
      this.context.closePath();
      this.context.stroke();
    }
  }
});