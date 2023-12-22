Polymer({
  ready: function(){
    this.style.display = "none";
    this.cursor = {
      changed: true,
      screen: {
        current: {
          x: 0,
          y: 0
        },
        last: {
          x: 0,
          y: 0
        },
        delta:{
          x: 0,
          y: 0
        }
      },
      layer: {
        current: {
          x: 0,
          y: 0
        },
        last: {
          x: 0,
          y: 0
        },
        delta:{
          x: 0,
          y: 0
        }
      },
      pinch: {
        zoomStart: 0,
        start: 0,
        change: 0,
        threshold: 40
      },
      size: 0,
      action: 0
    };
    this.target.addEventListener("mousedown", function(e){
      this.calcCursor([{x:e.clientX, y:e.clientY}], true);
      this.cursor.action = e.button + 1;
    }.bind(this));
    this.target.addEventListener("mousemove", function(e){
      this.calcCursor([{x:e.clientX, y:e.clientY}], false);
    }.bind(this));
    this.target.addEventListener("mouseup", function(e){
      this.calcCursor([{x:e.clientX, y:e.clientY}], false);
      this.cursor.action = 0;
    }.bind(this));
    this.target.addEventListener("mouseout", function(e){
      this.calcCursor([{x:e.clientX, y:e.clientY}], false);
      this.cursor.action = 0;
    }.bind(this));
    this.target.addEventListener("touchstart", function(e){
      if(e.touches.length == 1){
        this.calcCursor([{x:e.touches[0].clientX, y:e.touches[0].clientY}], true);
      }
      else{
        this.calcCursor([{x:e.touches[0].clientX, y:e.touches[0].clientY}, {x:e.touches[1].clientX, y:e.touches[1].clientY}], true);
      }
      this.cursor.action = e.touches.length;
    }.bind(this));
    this.target.addEventListener("touchmove", function(e){
      if(e.touches.length == 1){
        this.calcCursor([{x:e.touches[0].clientX, y:e.touches[0].clientY}], false);
      }
      else{
        this.calcCursor([{x:e.touches[0].clientX, y:e.touches[0].clientY}, {x:e.touches[1].clientX, y:e.touches[1].clientY}], false);
      }
    }.bind(this));
    this.target.addEventListener("touchend", function(e){
      this.cursor.action = 0;
      this.cursor.changed = !this.cursor.changed;
    }.bind(this));
  },
  calcCursor: function(positions, init){
    var xx;
    var yy;
    var x = positions[0].x;
    var y = positions[0].y;
    var view = this.view;
    var screen = this.cursor.screen;
    var layer = this.cursor.layer;
    var pinch = this.cursor.pinch;
    if(init){
      screen.last.x = x + 0.1;
      screen.last.y = y + 0.1;
      screen.delta.x = 0;
      screen.delta.y = 0;
      layer.last.x = ((x - this.root.getBoundingClientRect().left) / view.scaledZoom) + 0.1;
      layer.last.y = ((y - this.root.getBoundingClientRect().top) / view.scaledZoom) + 0.1;
      layer.delta.x = 0;
      layer.delta.y = 0;
      if(positions.length == 2){
        xx = positions[1].x;
        yy = positions[1].y;
        pinch.start = Math.sqrt(Math.pow(yy - y, 2) + Math.pow(xx - x, 2));
        pinch.zoomStart = view.zoom;
        pinch.change = 0;
      }
    }
    else{
      screen.last.x = screen.current.x;
      screen.last.y = screen.current.y;
      screen.delta.x = x - screen.current.x;
      screen.delta.y = y - screen.current.y;
      layer.last.x = layer.current.x;
      layer.last.y = layer.current.y;
      layer.delta.x = (x - screen.current.x) / view.scaledZoom;
      layer.delta.y = (y - screen.current.y) / view.scaledZoom;
      if(positions.length == 2){
        xx = positions[1].x;
        yy = positions[1].y;
        pinch.change = Math.sqrt(Math.pow(yy - y, 2) + Math.pow(xx - x, 2)) - pinch.start;
      }
    }
    screen.current.x = x;
    screen.current.y = y;
    x = (x - this.root.getBoundingClientRect().left) / view.scaledZoom;
    y = (y - this.root.getBoundingClientRect().top) / view.scaledZoom;
    layer.current.x = x;
    layer.current.y = y;
    this.cursor.changed = !this.cursor.changed;
    this.job("clear deltas", function(){
      screen.delta.x = 0;
      screen.delta.y = 0;
      layer.delta.x = 0;
      layer.delta.y = 0;
    }, 0);
  }
});