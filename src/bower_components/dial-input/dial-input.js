Polymer("dial-input", {
  
  z: 1,
  
  scale: 1,
  
  value: 0,
  
  angle: 0,
  
  localAngle: 0,
  
  segments: 1,
  
  segmentLock: false,
  
  segmentLockTogglable: false,
  
  shiftKey: false,
  
  rangeMin: 0,
  
  rangeMax: 360,
  
  lastPos: {x:0, y:0},
  
  clickJump: true,
  
  moving: false,
  
  revs: 0,
  
  angleOffset: 0,
  
  revolutionValue: 1,
  
  loopBack: false,
  
  hideBalue: false,
  
  fadeValue: false,
  
  decimalAccuracy: -1,
  
  accentColor: "#fff",
  
  dialColor: "#aaa",
  
  backColor: "#555",
  
  largeSegmentInterval: 0,
  
  descriptor: "",
  
  ready: function(){
    
    this.generateSegments();
    
    if(this.hideValue){
      
      this.$.value.style.display = "none";
      
    }
    
    if(this.fadeValue){
      
      this.$.value.style.opacity = "0";
      
    }
    
    this.addEventListener("mousedown", function(e){
      
      e.preventDefault();
      
      this.interactStart(e.offsetX, 
                         e.offsetY, 
                         e.shiftKey);
      
    });
    
    this.addEventListener("touchstart", function(e){
      
      e.preventDefault();
      
      this.interactStart(e.touches[0].pageX - e.touches[0].target.getBoundingClientRect().left, 
                         e.touches[0].pageY - e.touches[0].target.getBoundingClientRect().top,  
                         e.touches.length == 2);
      
    });
    
    this.addEventListener("mousemove", function(e){
      
      e.preventDefault();
      
      this.interactMove(e.offsetX, 
                        e.offsetY,
                        e.shiftKey);
      
    });
    
    this.addEventListener("touchmove", function(e){
      
      e.preventDefault();
      
      this.interactMove(e.touches[0].pageX - e.touches[0].target.getBoundingClientRect().left, 
                        e.touches[0].pageY - e.touches[0].target.getBoundingClientRect().top, 
                        e.touches.length == 2);
      
    });
    
    this.addEventListener("mouseup", function(e){
      
      this.moving = false;
      
    });
    
    this.addEventListener("mouseout", function(e){
      
      this.moving = false;
      
    });
    
    this.addEventListener("touchend", function(e){
      
      if(e.touches.length == 0){
        
        this.moving = false;
        
      }
      
    });
    
    this.addEventListener("mousewheel", function(e){
      
      this.shiftKey = e.shiftKey;
      
      if(this.segmentLock ^ (this.shiftKey && this.segmentLockTogglable)){
        
        if(e.wheelDelta > 0){
        
          this.angle += (360 / this.segments);
          
        }
        
        else{
        
          this.angle -= (360 / this.segments);
          
        }
        
        this.angle = (360 / this.segments) * Math.round(this.angle / (360 / this.segments));
        
      }
      
      else{
        
        this.angle += e.wheelDelta / 200;
        
      }
      
      this.revs = Math.floor(this.angle / 360);
      
      this.localAngle = this.angle % 360;
      
      if(this.localAngle < 0){
        
        this.localAngle = 360 + this.localAngle;
        
      }
      
      if(this.fadeValue){
        
        this.$.value.style.opacity = "1";
        
      }
      
      this.doChecks();
      
    });
    
  },
  
  valueChanged: function(){
    
    this.angle = (360 / this.revolutionValue) * this.value;
    
  },
  
  zChanged: function(o, n){
    
    this.$.shadow.setZ(n);
    
  },
  
  interactStart: function(x, y, mod){
    
    this.shiftKey = mod;
    
    this.moving = true;
    
    this.lastPos.x = -(x - (this.scale * 64));
    
    this.lastPos.y = -(y - (this.scale * 64));
    
    if(this.fadeValue){
      
      this.$.value.style.opacity = "1";
      
    }
    
    if(this.clickJump){
      
      this.setAngle();
      
    }
    
  },
  
  interactMove: function(x, y, mod){
    
    if(this.moving){
      
      this.shiftKey = mod;
      
      if(this.fadeValue){
        
        this.$.value.style.opacity = "1";
        
      }
      
      this.lastPos.x = -(x - (this.scale * 64));
      
      this.lastPos.y = -(y - (this.scale * 64));
      
      this.setAngle();
      
    }
    
  },
  
  setAngle: function(){
    
    var a = this.scale * 64;
    
    var b = Math.sqrt(Math.pow(this.lastPos.x, 2) + 
            Math.pow(this.lastPos.y, 2));
    
    var c = Math.sqrt(Math.pow(this.lastPos.x, 2) + 
            Math.pow((this.lastPos.y - (this.scale * 64)), 2));
    
    var ang = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - 
              Math.pow(c, 2)) / (2 * a * b));
    
    ang = ang * (180 / Math.PI);
    
    if(this.lastPos.x > 0){
      
      ang = (180 - ang) + 180;
      
    }
    
    if(this.segmentLock ^ (this.shiftKey && this.segmentLockTogglable)){
      
      ang = (360 / this.segments) * Math.round(ang / (360 / this.segments));
      
    }
    
    if(this.localAngle - ang > 180){
      
      this.revs++;
      
    }
    
    else if(ang - this.localAngle > 180){
      
      this.revs--;
      
    }
    
    this.localAngle = ang;
    
    this.angle = (this.revs * 360) + this.localAngle;
    
    this.doChecks();
    
  },
  
  doChecks: function(){
    
    if(!this.loopBack){
  
      if((this.angle / 360) * this.revolutionValue  > this.rangeMax){
        
        this.angle = (this.rangeMax / this.revolutionValue) * 360;
        
        this.localAngle = (this.angle - (this.revs * 360));
        
      }
      
      else if((this.angle / 360) * this.revolutionValue < this.rangeMin){
        
        this.angle = (this.rangeMin / this.revolutionValue) * 360;
        
        this.localAngle = (this.angle - (this.revs * 360));
        
      }
      
      this.value = (this.angle / 360) * this.revolutionValue;
      
    }
    
    else{
      
      this.value = (this.localAngle / 360) * this.revolutionValue;
      
    }
      
    if(this.decimalAccuracy > -1){
      
      if(this.decimalAccuracy == 0){
      
        this.value = Math.round(this.value);
        
      }
      
      else{
        
        var mult = Math.pow(10, this.decimalAccuracy)
        
        this.value = Math.round(this.value * mult) / mult;
        
      }
      
    }
    
    if(this.loopBack && this.value == this.revolutionValue){
      
      this.value = 0;
      
    }
    
    if(this.fadeValue){
      
      this.job("fadeout", function(){
        
        this.$.value.style.opacity = "0";
        
      }, 500);
      
    }
    
  },
  
  generateSegments: function(){
    
    this.$.segments.innerHTML = "";
    
    var interval = 0;
    
    for(var i = 0; i < this.segments; i++){
      
      var box = document.createElement("div");
      
      box.className = "segment-box";
      
      box.style.webkitTransform = "rotate(" + ((360 / this.segments) * i ) + "deg)";
      
      var seg = document.createElement("div");
      
      if(interval == 0){
        
        seg.className = "large-segment"
        
        interval = this.largeSegmentInterval;
        
      }
      
      else{
        
        seg.className = "segment";
        
      }
      
      box.appendChild(seg);
      
      this.$.segments.appendChild(box);
      
      interval--;
      
    }
    
  }
  
});