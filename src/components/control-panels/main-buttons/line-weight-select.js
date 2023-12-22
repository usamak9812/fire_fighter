Polymer({
  weightList: [
    {
      name: "light",
      value: 1
    },
    {
      name: "medium",
      value: 5
    },
    {
      name: "heavy",
      value: 10
    }
  ],
  weight: {
    name: "medium",
    value: 5
  },
  opened: false,
  weightSelect: function(e){
    if(this.inputMode != "draw" && this.inputMode != "erase"){
      this.inputMode = "draw";
    }
    for(var i = 0; i != this.weightList.length; i++){
      if(this.weightList[i].name == e.target.id){
        this.weight = this.weightList[i];
        break;
      }
    }
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
    for(var i = 0; i != this.weightList.length; i++){
      var weightItem = this.$[this.weightList[i].name];
      if(delay){
        weightItem.style.webkitTransitionDelay = ((this.weightList.length - i) * 0.125) + "s";
      }
      else{
        weightItem.style.webkitTransitionDelay = "0";
      }
      weightItem.style.webkitTransform = "translateY(" + ((i * 48) + 32) + "px)";
      weightItem.style.pointerEvents = "auto";
      weightItem.style.opacity = 1;
    }
  },
  close: function(){
    this.opened = false;
    for(var i = this.weightList.length - 1; i != -1; i--){
      var weightItem = this.$[this.weightList[i].name];
      weightItem.style.webkitTransitionDelay = (i * 0.125) + "s";
      weightItem.style.webkitTransform = "translateY(0px)";
      weightItem.style.pointerEvents = "none";
      weightItem.style.opacity = 0;
    }
  }
});