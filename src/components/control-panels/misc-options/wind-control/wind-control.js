Polymer("wind-control", {
  ready: function(){
    this.$["speed-slider"].addEventListener("mousewheel", function(e){
      if(e.wheelDelta > 0){
        this.wind.speed++;
      }
      else{
        this.wind.speed--;
      }
    }.bind(this));
    this.addEventListener("mousedown", function(e){
      this.pause = true;
    });
    this.addEventListener("mouseup", function(e){
      if(this.interactMode){
        this.pause = false;
      }
    });
    this.addEventListener("mouseout", function(e){
      if(this.interactMode){
        this.pause = false;
      }
    });
  }
});