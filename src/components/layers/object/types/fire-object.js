Polymer("fire-object", {
  count: 16,
  spread: 10,
  ready: function(){
    this.particles = [];
    this.job("init wait", function(){
      for(var i = 0; i != this.count; i++){
        this.particles.push({
          pos: i / this.count,
          frame: 30720 / (i * 120),
          rot: Math.random() * 360,
          rand: Math.random() - 0.5,
          mode: "fire_off"
        });
      }
    }, 100);
  },
  observe: {
    "view.time.activeDelta": "update",
    "objectData.locked": "lockedChanged"
  },
  update: function(){
    if(this.objectData.mode != "fire_off"){
      this.disabled = false;
      this.$["smoke-particles"].style.display = "block";
    }
    if(!this.disabled){
      this.particles.forEach(function(particle){
        if(this.view.time.activeDelta > 0){
          particle.pos += this.view.time.activeDelta / 7500;
        }
        particle.rot += (Math.ceil(particle.rand) - 0.5) * 2;
        var fireOff = 20;
        particle.frame = Math.max(Math.floor((120 + fireOff) * particle.pos) - fireOff, 4);
        if(particle.pos > 1){
          particle.mode = this.objectData.mode;
          particle.rot = Math.random() * 360;
          particle.rand = Math.random() - 0.5;
          particle.pos -= 1;
        }
      }.bind(this));
      if(this.objectData.mode == "fire_off"){
        var disable = true;
        for(var i = 0; i != this.particles.length; i++){
          if(this.particles[i].mode != "fire_off"){
            disable = false;
            break;
          }
        }
        if(disable){
          this.disabled = true;
          this.$["smoke-particles"].style.display = "none";
        }
      }
    }
  },
  lockedChanged: function(o, n){
    if(n){
      this.windSource = this.wind;
    }
    else{
      this.windSource = this.objectData;
    }
  },
  // select: function(e){
  //   if(e.button == 0 || e.touches.length == 1){
  //     this.selected.object = this.objectData;
  //   }
  // }
});