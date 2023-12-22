Polymer({
  maxVisible: 6,
  ready: function(){
    this.particles = [];
    this.colors = ["blue", "green", "red", "yellow"];
    for(var i = 0; i != this.maxVisible; i++){
      this.particles.push({

        pos: i / this.maxVisible,
        rot: i / this.maxVisible,
        frame: (48 / (i * 2)) + 2,
        rand: Math.random() - 0.5,
        color: this.colors[Math.floor(Math.random() * 3.99)],
        active: false
      });
    }
  },
  observe: {
    "view.time.activeDelta": "update",
    "cursor.action": "actionChanged"
  },
  update: function(){
    if(this.selected.object == this.objectData){
      if(this.inputMode == "obj-spread"){
        this.updateSpread();
      }
      else if(this.inputMode == "obj-direction"){
        this.updateDirection();
      }
      else if(this.inputMode == "obj-evacuee-count"){
        this.updateCount();
      }
    }
    this.particles.forEach(function(particle){
      if(this.view.time.activeDelta > 0){
        particle.pos += this.view.time.activeDelta / 15000;
      }
      if(particle.pos < 0.17 && this.objectData.subtype == "slide"){
        particle.frame = 0;
      }
      else{
        particle.rot += this.view.time.activeDelta / 15000;
        particle.frame = Math.floor(((300 * particle.pos) % 24) + 1);
      }
      if(particle.pos > 1){
        if(this.objectData.count !== 0 || !this.interactMode || this.objectData.infinite){
          particle.active = this.objectData.active;
        }
        else{
          particle.active = false;
        }
        if(particle.active && this.interactMode && !this.objectData.infinite){
          this.objectData.count--;
        }
        particle.rand = Math.random() - 0.5;
        particle.color = this.colors[Math.floor(Math.random() * 3.99)];
        particle.pos -= 1;
        particle.rot = 0;
      }
    }.bind(this));
  },
  actionChanged: function(o, n){
    if(o === 0 && n == 1){
      if(this.inputMode == "obj-evacuee-count"){
        this.startCount = this.objectData.count;
      }
    }
    else if(o == 1 && n === 0){
      if(this.startCount == this.objectData.count && this.selected.object == this.objectData){
        this.job("infinitesetwait", function(){
          this.objectData.infinite = !this.objectData.infinite;
        }, 10);
      }
      this.startCount = null;
    }
  },
  updateCount: function(){
    var change = Math.floor(this.cursor.screen.delta.x);
    if(change !== 0){
      this.objectData.infinite = false;
    }
    this.objectData.count += change;
    this.objectData.count = this.objectData.count > 999 ? 999 : this.objectData.count;
    this.objectData.count = this.objectData.count < 0 ? 0 : this.objectData.count;
  },
  updateDirection: function(){
    this.objectData.direction += this.cursor.screen.delta.x / 100;
    if(this.objectData.direction > 2){
      this.objectData.direction = 2;
    }
    else if(this.objectData.direction < -2){
      this.objectData.direction = -2;
    }
  },
  updateSpread: function(){
    this.objectData.spread += this.cursor.screen.delta.x / 100;
    if(this.objectData.spread > 2){
      this.objectData.spread = 2;
    }
    else if(this.objectData.spread < 0){
      this.objectData.spread = 0;
    }
  },
  select: function(e){
    if(e.button === 0 || e.touches.length == 1){
      this.selected.object = this.objectData;
    }
  },
  pow: function(val, exp){
    return Math.pow(val, exp);
  }
});