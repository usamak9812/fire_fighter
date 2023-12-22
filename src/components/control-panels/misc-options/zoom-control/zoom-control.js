Polymer({
  increase: function(){
    this.view.zoom += 0.25;
  },
  decrease: function(){
    this.view.zoom -= 0.25;
  },
  wheelMove: function(e){
    this.view.zoom += e.wheelDelta / 2000;
  }
});