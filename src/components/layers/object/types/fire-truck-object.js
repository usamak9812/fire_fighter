Polymer({
  ppm: 600,
  generateParticle: 0,
  generateParticleFrequency: 2,
  ready: function(){
    this.uid = 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    window.addEventListener("keydown", function(e){
      if(e.keyCode > 48 && e.keyCode < 57){
        this.generateParticleFrequency = e.keyCode - 49;
      }
    }.bind(this));
    window.requestAnimationFrame(this.createParticle.bind(this));
    // this.job("createparticle", this.createParticle, 500);
  },
  observe: {
    "objectData.turret.power": "updateRange",
    "objectData.turret.type": "updateRange",
    "objectData.turret.wide": "updateRange",
    "view.scaledGlobalScale": "updateRange",
    "objectData.position.x": "checkDistance",
    "objectData.position.y": "checkDistance",
    "objectData.rotation": "checkDistance",
    "objectData.turret.target.x": "checkDistance",
    "objectData.turret.target.y": "checkDistance",
    "objectData.turret.autoSpray": "initAutoOff",
    "objectData.moving": "checkAutoOff"
  },
  updateRange: function(){
    this.scale = this.view.scaledGlobalScale / 32;
    var t = this.objectData.turret;
    if(t.type != "agent_off"){
      this.range = t.agents[t.type][t.power ? "high" : "low"];
      this.range *= (t.wide ? 0.6 : 1) * this.scale;
    }
    this.checkDistance();
  },
  checkAutoOff: function(o, n){
    if(n){
      this.moveStart = new Date().getTime();
    }
    else if(!n && new Date().getTime() - this.moveStart > 1000){
      this.objectData.turret.autoSpray = false;
    }
  },
  createParticle: function(){
    if(this.objectData.turret.active && this.interactMode &&
       this.objectData.turret.type != "agent_off" &&
       !this.objectData.turret.autoSpray){
      var o = this.objectData;
      //lp = layer position of turret object
      var lp = {x: 0, y: 0};
      //va = vector angle of the turret relative to the vehicle pivot point
      var va = Math.atan2(o.turret.position.y, o.turret.position.x + 10);
      //vd = vector distance of the turret relative to the vehicle pivot point
      var vd  = Math.sqrt(Math.pow(o.turret.position.x * this.scale, 2) +
                          Math.pow(o.turret.position.y * this.scale, 2));
      lp.x  = (Math.cos(o.rotation + va) * vd + o.position.x);
      lp.y  = (Math.sin(o.rotation + va) * vd + o.position.y);
      // var width = Math.max(0.1, this.scale);
      var mag = Math.max(0, this.distance);
      this.generateParticle++;
      if(this.generateParticle > /*Math.ceil(100 / mag)*/this.generateParticleFrequency){
        this.generateParticle = 0;
        this.fire("createparticle", {
          particle: {
            uid: this.uid,
            life: 0,
            frame: 0,
            wide: (o.turret.type == "agent_water" || o.turret.type == "agent_foam") && o.turret.wide,
            type: o.turret.type + (o.turret.wide && (o.turret.type == "agent_water" || o.turret.type == "agent_foam") ? "_fog": ""),
            position: lp,
            rotation: 0,
            random: (Math.random() - 0.5),
            range: this.range + ((mag / 4)),
            vector: {
              angle: (o.turret.target.x == 10000 ? o.rotation : o.rotation + o.turret.angle.current),
              magnitude: mag + ((mag / 4))
            }
          }
        });
      }
    }
    window.requestAnimationFrame(this.createParticle.bind(this));
  },
  checkDistance: function(){
    var o = this.objectData;
    //lp = layer position of turret object
    var lp = {x: 0, y: 0};
    //va = vector angle of the turret relative to the vehicle pivot point
    var va = Math.atan2(o.turret.position.y, o.turret.position.x);
    //vd = vector distance of the turret relative to the vehicle pivot point
    var vd  = Math.sqrt(Math.pow(o.turret.position.x * this.scale, 2) + Math.pow(o.turret.position.y * this.scale, 2));
    lp.x  = Math.cos(o.rotation + va) * vd + o.position.x;
    lp.y  = Math.sin(o.rotation + va) * vd + o.position.y;
    //target point
    var tp = o.turret.target;
    //distance to the target from the turret
    var td = Math.sqrt(Math.pow(tp.x - lp.x, 2) + Math.pow(tp.y - lp.y, 2));
    var ta = Math.atan2(tp.y - lp.y, tp.x - lp.x);
    if(o.turret.target.x == 10000){
      ta = o.rotation;
    }
    else{
      ta = ta - o.rotation;
    }
    ta -= ta > Math.PI ? Math.PI * 2 : 0;
    ta += ta < -Math.PI ? Math.PI * 2 : 0;
    o.turret.active = true;
    if(ta > o.turret.angle.max && o.turret.target.x != 10000){
      ta = o.turret.angle.max;
      if(this.inputMode != "obj-spray-target" && !this.objectData.turret.autoSpray){
        o.turret.type = "agent_off";
      }
    }
    else if(ta < o.turret.angle.min && o.turret.target.x != 10000){
      ta = o.turret.angle.min;
      if(this.inputMode != "obj-spray-target" && !this.objectData.turret.autoSpray){
        o.turret.type = "agent_off";
      }
    }
    o.turret.angle.current = ta;
    this.distance = td - (10 * this.scale);
    if(this.distance > this.range){
      this.distance = this.range;
    }
  }
});