Polymer({
  observe: {
    "objectData.size.width": "widthChanged",
    "objectData.size.height": "heightChanged"
  },
  ready: function(){
    this.frame = 0;
    this.animUrl = this.objectData.graphic.slice(0, -4) + '_anim.png';
    if(this.objectData.name == "Smoke Extension" || this.objectData.name == "Fire Extension"){
    	this.animUrl = this.animUrl.slice(0, -4) + "_" + this.objectData.sub + ".png";
    }
    requestAnimationFrame(this.updateFrame.bind(this));
  },
  updateFrame: function(time){
    this.frame = Math.floor(time / (this.objectData.animationSpeed || 33.33333)) % 300;
    requestAnimationFrame(this.updateFrame.bind(this));
  },
  widthChanged: function(){
    if(this.objectData.size.width < 3){
      this.objectData.size.width = 3;
    }
    else if(this.objectData.size.width > 512){
      this.objectData.size.width = 512;
    }
  },
  heightChanged: function(){
    if(this.objectData.size.height < 3){
      this.objectData.size.height = 3;
    }
    else if(this.objectData.size.height > 512){
      this.objectData.size.height = 512;
    }
  }
});