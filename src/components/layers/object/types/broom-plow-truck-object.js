Polymer({
  plowRotation: 0,
  ready: function(){
    window.requestAnimationFrame(this.updatePlow.bind(this));
  },
  updatePlow: function(){
    var pos = this.objectData.plow.position * 15;
    if(this.plowRotation > pos){
      this.plowRotation -= 0.5;
    }
    else if(this.plowRotation < pos){
      this.plowRotation += 0.5;
    }
    window.requestAnimationFrame(this.updatePlow.bind(this));
  }
});