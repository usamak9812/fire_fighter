Polymer({
  colorList: [
    "black",
    "gray",
    "white",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet"
  ],
  opened: false,
  big: false,
  bigChanged: function(old_val, new_val){
    if(new_val){
      this.space = 64;
    }
    else{
      this.space = 48;
    }
    if(this.opened){
      this.open(false);
    }
  },
  colorSelect: function(e){
    this.view.waitDraw = true;
    this.job("draw wait", function(){
      this.view.waitDraw = false;
    }, 500);
    this.selectedColor = e.target.id;
    this.inputMode = "draw";
    this.close();
  },
  toggle: function(e){
    if(this.opened){
      this.close();
    }
    else{
      this.open(true);
    }
  },
  open: function(delay){
    this.opened = true;
    for(var i = 0; i != this.colorList.length; i++){
      var colorItem = this.$[this.colorList[i]];
      if(delay){
        colorItem.style.webkitTransitionDelay = ((this.colorList.length - i) * 0.025625) + "s";
      }
      else{
        colorItem.style.webkitTransitionDelay = "0";
      }
      colorItem.style.webkitTransform = "translateY(" + ((i * 48) + 32) + "px)";
      colorItem.style.pointerEvents = "auto";
      colorItem.style.opacity = 1;
    }
  },
  close: function(){
    this.opened = false;
    for(var i = this.colorList.length - 1; i != -1; i--){
      var colorItem = this.$[this.colorList[i]];
      colorItem.style.webkitTransitionDelay = (i * 0.025625) + "s";
      colorItem.style.webkitTransform = "translateY(0px)";
      colorItem.style.pointerEvents = "none";
      colorItem.style.opacity = 0;
    }
  }
});