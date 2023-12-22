Polymer({
  observe: {
    "view.zoom": "hideLayer",
    "view.offset.x": "hideLayer",
    "view.offset.y": "hideLayer"
  },
  hideLayer: function(){
    if(!this.view.annotationClearWait && !this.view.lockedTo){
      this.style.display = "none";
      this.job("hide wait", function(){
        this.style.display = "block";
      }, 750);
    }
  }
});