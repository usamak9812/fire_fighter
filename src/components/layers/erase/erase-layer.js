Polymer({
  started: false,
  ready: function(){
    this.lastPoint = {x:0, y:0};
  },
  startErase: function(e){
    if(e.button === 0){
      this.fire("pauseEmitters");
      this.lastPoint.x = this.view.cursor.position.x;
      this.lastPoint.y = this.view.cursor.position.y;
      this.canvasContext.globalCompositeOperation = "destination-out";
      this.started = true;
    }
  },
  moveErase: function(e){
    if(this.started){
      var cur = this.view.cursor;
      this.canvasContext.beginPath();
      this.canvasContext.lineWidth = this.draw.weight.value * 10;
      this.canvasContext.lineJoin = "round";
      this.canvasContext.lineCap = "round";
      this.canvasContext.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.canvasContext.lineTo(cur.position.x, cur.position.y);
      this.canvasContext.closePath();
      this.canvasContext.stroke();
      this.lastPoint.x = cur.position.x;
      this.lastPoint.y = cur.position.y;
    }
  },
  endErase: function(e){
    if(this.started){
      this.fire("unpauseEmitters");
      this.started = false;
    }
  }
});