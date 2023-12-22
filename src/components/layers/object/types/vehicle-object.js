Polymer({
  turnRate: 0,
  speed: 0,
  go: false,
  goFalseCount: -1,
  pointDistance: 5,
  scale: 1,
  minSpeed: 0.025,
  lastVector: Object,
  init: true,
  observe: {
    "view.time.last": "update",
    "view.pathsVisible": "pathVisibilityChanged",
    "view.scaledGlobalScale": "scaledGlobalScaleChanged",
    "inputMode": "checkDeselect",
    "view.motionFreeze": "motionFreezeChanged",
    "view.lockedTo": "checkLock"
  },
  checkLock: function(o, n){
    this.objectData.locked = (n == this.objectData);
  },
  motionFreezeChanged: function(o, n){
    if((!n || o == "obj-drive-forward") && !this.view.motionFreeze){
      this.selected.object = null;
    }
    this.updateFuturePath();
  },
  scaledGlobalScaleChanged: function(){
    this.scale = this.view.scaledGlobalScale / 32;
  },
  pathVisibilityChanged: function(){
    if(this.view.pathsVisible){
      this.objectData.path = "M" + this.objectData.position.x + " " + this.objectData.position.y;
      this.objectData.pathLast.x = this.objectData.position.x;
      this.objectData.pathLast.y = this.objectData.position.y;
    }
    else{
      this.objectData.path = "";
    }
  },
  select: function(e){
    if(this.objectData.points.length > 0 && !this.view.motionFreeze && this.objectData.speed > 0){
      this.clearMotion();
    }
    else{
      this.super([e]);
    }
  },
  startDrive: function(){
    if(this.inputMode == "obj-edit"){
      this.selected.object = this.objectData;
      this.inputMode = "obj-drive-forward";
    }
  },
  update: function(){
    //Stop all vehicle rotation and momentum if the move or
    //rotate commands are received
    if((this.inputMode == "obj-move" || this.inputMode == "obj-rotate") && this.selected.object == this.objectData){
      this.clearMotion();
    }
    var goLast = this.inputMode == "obj-drive-path" ? true : this.go;
    this.goFalseCount += (this.go ? 0 : 1);
    this.go = (this.inputMode.indexOf("obj-drive") != -1 && this.selected.object == this.objectData);
    if(this.initPoint){
      var dir = this.calcDir();
      if(dir){
        this.objectData.lastDirection = dir;
      }
    }
    if(this.go && !goLast){
      this.goFalseCount = 0;
      this.objectData.lastDirection = "forward";
      this.turnRate = 0;
      this.initPoint = {
        x: this.cursor.screen.current.x,
        y: this.cursor.screen.current.y
      };
      this.clearMotion();
    }
    if(this.go && this.objectData.speed < this.minSpeed && this.objectData.speed > -this.minSpeed){
      if(this.objectData.lastDirection == "reverse"){
        this.objectData.speed = -this.minSpeed;
      }
      else{
        this.objectData.speed = this.minSpeed;
      }
    }
    if(this.objectData.speed >= this.minSpeed || this.objectData.speed <= -this.minSpeed){
      this.objectData.moving = true;
      var vector = this["handle" + this.driveMode + "Mode"]();
      this.updateAcceleration(vector);
      this.updateTurn(vector);
      this.updateFuturePath();
      if(!this.view.motionFreeze){
        this.updateMotion(vector);
      }
    }
    else{
      this.objectData.moving = false;
      this.lastVector = null;
    }
  },
  updateFuturePath: function(){
    if(this.view.motionFreeze){
      this.objectData.futurePath = "M" + this.objectData.position.x + " " + this.objectData.position.y;
      this.objectData.pathLast.x = this.objectData.position.x;
      this.objectData.pathLast.y = this.objectData.position.y;
      for(var i = 0; i != this.objectData.points.length; i++){
        this.objectData.futurePath = this.objectData.futurePath + " " + "L" +
                                     this.objectData.points[i].x + " " +
                                     this.objectData.points[i].y;
      }
    }
    else{
      this.objectData.futurePath = "";
    }
  },
  calcDir: function(){
    var rise = this.initPoint.y - this.cursor.screen.current.y;
    var run = this.initPoint.x - this.cursor.screen.current.x;
    if(rise > 10 || rise < -10 || run > 10 || run < -10){
      this.initPoint = null;
      var angle = Math.atan2(rise, run);
      angle -= (angle > Math.PI ? Math.PI * 2 : 0);
      var diff = angle - this.objectData.rotation + (Math.PI / 2);
      diff -= (diff > Math.PI ? Math.PI * 2 : 0);
      diff += (diff < -Math.PI ? Math.PI * 2 : 0);
      if(diff > 0){
        return "reverse";
      }
      else{
        return "forward";
      }
    }
    return null;
  },
  getChangeVector: function(position, scalar){
    var rise = position.y - this.objectData.position.y;
    var run = position.x - this.objectData.position.x;
    var angle = Math.atan2(rise, run) - this.objectData.rotation;
    if(this.objectData.lastDirection == "reverse"){
      if(angle > 0){
        angle -= Math.PI;
      }
      else{
        angle += Math.PI;
      }
      angle = -angle;
    }
    var distance = Math.sqrt(Math.pow(rise, 2) + Math.pow(run, 2));
    var magnitude = Math.max(0, Math.min(1, distance / scalar));
    if(angle < -Math.PI){
      angle += 2 * Math.PI;
    }
    else if(angle > Math.PI){
      angle -= 2 * Math.PI;
    }
    return {angle: angle, magnitude: magnitude, distance: distance};
  },
  updateAcceleration: function(vector){
    var accelerationRate = (!this.go ? 10 : 40);
    var slowEffect = 5;
    var dir = (this.objectData.lastDirection == "forward" ? 1 : -1);
    var drag = ((this.objectData.speed / accelerationRate) + (Math.abs(this.turnRate))) / slowEffect;
    if(!this.go && this.objectData.points.length === 0){
      this.objectData.speed = this.objectData.speed - (drag * this.view.time.activeDelta / 6);
    }
    else{
      this.objectData.speed = this.objectData.speed - drag + (vector.magnitude / accelerationRate * dir);
    }
    if(dir == 1){
      this.objectData.speed = Math.max(0, Math.min(1, this.objectData.speed));
    }
    else{
      this.objectData.speed = Math.max(-1, Math.min(0, this.objectData.speed));
    }
  },
  updateTurn: function(vector){
    var rate = 0.05;
    var damp = 0.85;
    if(vector.magnitude !== 0){
      this.turnRate += vector.angle * rate * this.objectData.speed;
    }
    this.turnRate *= damp;
    this.turnRate = (Math.max(-1, Math.min(1, this.turnRate)));
  },
  updateMotion: function(vector){
    var mult = (this.view.time.activeDelta > 64 ? Math.max(Math.min(Math.abs(vector.angle), 1), 0.1) : 1);
    var turnChange = this.turnRate / this.objectData.turnRadius * 2.1 * this.view.time.activeDelta / 16 * mult;
    this.objectData.rotation += turnChange;
    if(this.objectData.rotation > Math.PI){
      this.objectData.rotation -=  2 * Math.PI;
    }
    else if(this.objectData.rotation < -Math.PI){
      this.objectData.rotation += 2 * Math.PI;
    }
    var rise = Math.sin(this.objectData.rotation);
    var run = Math.cos(this.objectData.rotation);
    //var maxSpeed = 100;//this.objectData.speedRange[this.objectData.lastDirection + "Max"];
    var change = {
      x: run * this.objectData.speed * this.scale * this.view.time.activeDelta / 20,
      y: rise * this.objectData.speed * this.scale * this.view.time.activeDelta / 20
    };
    this.objectData.position.x += change.x;
    this.objectData.position.y += change.y;
    var dist = Math.sqrt(Math.pow(this.objectData.pathLast.x - this.objectData.position.x, 2) +
                         Math.pow(this.objectData.pathLast.y - this.objectData.position.y, 2));
    if(Math.abs(dist) > 2 * this.scale && this.view.pathsVisible){
      this.objectData.path = this.objectData.path + " " + "L" +
                             this.objectData.position.x + " " +
                             this.objectData.position.y;
      this.objectData.pathLast.x = this.objectData.position.x;
      this.objectData.pathLast.y = this.objectData.position.y;
    }
    this.checkBounds();
    if(this.view.lockedTo == this.objectData){
      this.view.offset.x -= change.x;
      this.view.offset.y -= change.y;
    }
  },
  checkBounds: function(){
    var pos = this.objectData.position;
    if(pos.x > 1912){
      this.clearMotion();
      pos.x = 1912;
    }
    else if(pos.x < 8){
      this.clearMotion();
      pos.x = 8;
    }
    else if(pos.y > 1912){
      this.clearMotion();
      pos.y = 2040;
    }
    else if(pos.y < 8){
      this.clearMotion();
      pos.y = 8;
    }
  },
  handlePathFollowMode: function(){
    if(this.goFalseCount == 1 && !this.init){
      this.objectData.points.push({
        x: this.cursor.layer.current.x,
        y: this.cursor.layer.current.y
      });
      this.init = false;
    }
    if(this.go && this.objectData.points.length > 0){
      // var lastPoint = this.objectData.points[this.objectData.points.length - 1];
      // var dist = Math.sqrt(Math.pow(lastPoint.x - this.cursor.layer.current.x, 2) +
      //                     Math.pow(lastPoint.y - this.cursor.layer.current.y, 2));
      // if(dist > 20 * this.scale){
        this.objectData.points.push({
          x: this.cursor.layer.current.x,
          y: this.cursor.layer.current.y
        });
      // }
    }
    else if(this.go){
      this.objectData.points.push({
        x: this.cursor.layer.current.x,
        y: this.cursor.layer.current.y
      });
    }
    var vector;
    while(this.objectData.points.length !== 0){
      vector = this.getChangeVector(this.objectData.points[0], 50 * this.scale);
      if(vector.magnitude < this.objectData.turnRadius / 40){
        this.objectData.points.splice(0, 1);
      }
      else{
        break;
      }
    }
    var v;
    if(this.objectData.points.length > 0){
      v = this.objectData.points[0];
      vector = this.getChangeVector(v, 50 * this.scale);
      vector.magnitude = 0.6;
    }
    else{
      var dir = (this.lastDiection == "forward" ? 1 : -1);
      vector = {
        angle: this.objectData.rotation,
        magnitude: 0,
        distance: 0
      };
    }
    return vector;
  },
  handleToLastMode: function(){
    var v;
    if(this.go){
      this.objectData.points = [{
        x: this.cursor.layer.current.x,
        y: this.cursor.layer.current.y
      }];
    }
    var vector;
    if(this.objectData.points.length == 1){
      vector = this.getChangeVector(this.objectData.points[0], 50 * this.scale);
      if(vector.magnitude < this.objectData.turnRadius / 40){
        this.objectData.points = [];
        v = {
          x: this.objectData.position.x + (Math.cos(this.objectData.rotation) * this.scale),
          y: this.objectData.position.y + (Math.sin(this.objectData.rotation) * this.scale)
        };
      }
      else{
        v = this.objectData.points[0];
      }
      vector = this.getChangeVector(v, 50 * this.scale);
    }
    else{
      vector = {
        angle: this.objectData.rotation,
        magnitude: 0,
        distance: 0
      };
    }

    return vector;
  },
  handleImmediateMode: function(){
    var v;
    if(this.go){
      v = {
        x: this.cursor.layer.current.x,
        y: this.cursor.layer.current.y
      };
      return this.getChangeVector(v, 50 * this.scale);
    }
    else{
      vector = {
        angle: this.objectData.rotation,
        magnitude: 0,
        distance: 0
      };
      return vector;
    }
  },
  clearMotion: function(){
    //stop momentum
    this.objectData.speed = 0;
    //make sure the acceleration and rotation do not get calculated on
    //the next frame
    this.objectData.points = [];
    this.objectData.lastDirection = null;
  }
});