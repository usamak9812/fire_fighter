Polymer({
  particleCreators: {},
  particleLimbo: [],
  ready: function(){
    this.hPI = Math.PI / 2;
    this.dPI = Math.PI * 2;
    this.particles = [];
    this.lastDelta = 0;
    this.timeDiff = 16;
    this.addEventListener("createparticle", function(e){
      if(!this.particleCreators[e.detail.particle.uid]){
        this.particleCreators[e.detail.particle.uid] = {last: e.detail.particle, limbo: e.detail.particle};
      }
      else{
        this.particleCreators[e.detail.particle.uid].last = e.detail.particle;
        this.particleCreators[e.detail.particle.uid].limbo = e.detail.particle;
      }
      e.detail.particle.timeout = 5;
      this.particleLimbo.push(e.detail.particle);
    });
    window.requestAnimationFrame(this.updateParticles.bind(this));
    // this.updateParticles();
  },
  observe: {
    "view.scaledGlobalScale": "updateScale"
  },
  updateScale: function(){
    this.scale = this.view.scaledGlobalScale / 32;
  },
  updateParticles: function(delta){
    this.timeDiff = this.view.time.activeDelta;
    // this.timeDiff = (this.timeDiff + delta - this.lastDelta) / 2;
    // this.lastDelta = delta;
    this.particleLimbo.forEach(function(p){
      this.particles.push(p);
    }.bind(this));
    this.particleLimbo = [];
    this.particles.forEach(function(p){
      this.calcWind(p, this.timeDiff);
      if(this.particleCreators[p.uid].last != p){
        p.life += this.timeDiff / 2500;
        p.frame = Math.ceil(120 * p.life);
        if(p.life > 0.2 && !p.wide){
          p.rotation += p.random * 2;
        }
        else{
          p.rotation += p.random;
        }
        if(p.life > 1){
          this.particles.splice(this.particles.indexOf(p), 1);
        }
      }
      else{
        p.timeout--;
        if(p.timeout === 0){
          this.particleCreators[p.uid].last = null;
        }
      }
    }.bind(this));
    window.requestAnimationFrame(this.updateParticles.bind(this));
  },
  calcArc: function(mag, life, wide){
    return (life * mag * (wide ? 1.3 : 1.1)) + 0.1;
  },
  calcParticleScale: function(life, scale, wide, mag, range){
    var w, h;
    if(wide){
      w = (life * mag / 35) + (scale * 0.1);
      h = (mag / 100) + (scale * 0.35);
    }
    else{
      var w = (life * mag / 160) + (scale);
      var h = (mag / 100) + (scale * 0.35);
      // var w = scale * width * mag / 25;
      // var h = scale * mag / 50;
    }
    return w + "," + h;
  },
  calcWind: function(particle, timeDiff){
    var sprayAngle = particle.vector.angle + this.hPI;
    var angularEffect;
    var speedEffect;
    if(sprayAngle < 0){
      sprayAngle += this.dPI;
    }
    else if(sprayAngle > this.dPI){
      sprayAngle -= this.dPI;
    }
    var diff = (this.wind.direction * 0.0174532925) - sprayAngle;
    if(diff >= Math.PI){
      diff -= this.dPI;
    }
    else if(diff < -Math.PI){
      diff += this.dPI;
    }
    if(diff >= this.hPI){
      angularEffect = this.hPI - (diff - this.hPI);
      speedEffect = -(this.hPI - angularEffect);
    }
    else if(diff < -this.hPI){
      angularEffect = -this.hPI - (diff + this.hPI);
      speedEffect = -(this.hPI + angularEffect);
    }
    else{
      angularEffect = diff;
      speedEffect = this.hPI - Math.abs(angularEffect);
    }
    if(speedEffect < 0){
      particle.vector.magnitude += (particle.vector.magnitude / 200) * speedEffect * 0.014 * this.wind.speed * this.scale * (timeDiff / 16);
    }
    particle.vector.angle += (particle.vector.magnitude / 200) * angularEffect * 0.0001  * this.wind.speed / this.scale * (timeDiff / 16);
  }
});