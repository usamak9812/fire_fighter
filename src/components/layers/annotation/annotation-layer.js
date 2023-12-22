Polymer({
  ready: function(){
    this.job("aeese", function(){
      this.canvas = this.$.canvas;
      this.context = this.$.canvas.getContext("2d");
    }, 0);
  },
  observe: {
    "cursor.changed": "cursorAction"
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
    this.fire("captureannotationundo");
    var cursor = this.cursor.layer;
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
  },
  doErase: function(){
    this.fire("captureannotationundo");
    var cursor = this.cursor.layer;
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
});