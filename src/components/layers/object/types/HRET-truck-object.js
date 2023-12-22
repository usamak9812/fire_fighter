Polymer({
  currentFrame: 0,
  frameMin: 0,
  frameMax: 0,
  observe: {
    "objectData.boom.extended": "extendedChanged",
    "objectData.boom.pMode": "puffChanged",
    "objectData.layer": "layerChanged"
  },
  ready: function(){
    this.job("update", this.updatePuff, 1000/30);
    this.super();
  },
  updatePuff: function(){
    this.currentFrame++;
    if(this.currentFrame > this.frameMax){
      this.currentFrame = this.frameMin;
    }
    else if(this.currentFrame == 76){
      this.currentFrame = 0;
      this.frameMax = 0;
      this.frameMin = 0;
    }
    this.job("update", this.updatePuff, 1000/30);
  },
  puffChanged: function(o, n){
    if(n == "agent_off" && o != "agent_off"){
      this.currentFrame = 50;
      this.frameMax = 76;
    }
    else{
      this.frameMax = 60;
      this.frameMin = 20;
    }
  },
  layerChanged: function(){
    this.objectData.hold = true;
  },
  extendedChanged: function(o, n){
    if(!this.objectData.hold){
      this.objectData.turret.type = "agent_off";
      this.objectData.boom.pMode = "agent_off";
    }
    else{
      this.objectData.hold = false;
    }
    this.objectData.turret.position.x = (n ? 42.45 : 21.65);
  }
});