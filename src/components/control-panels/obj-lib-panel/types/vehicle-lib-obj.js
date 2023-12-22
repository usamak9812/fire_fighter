Polymer({
  addCustom: function(){
    var vehicle = {
      name: this.entry.name,
      type: this.entry.type,
      subtype: this.entry.subtype,
      graphic: this.entry.graphic,
      thumb: this.entry.thumb,
      scale: this.entry.scale,
      locked: false,
      path: "",
      pathLast: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      futurePath: "",
      speed: 0,
      pathColor: this.colors[this.currentColor],
      centerOfRotation: this.entry.centerOfRotation,
      turnRadius: this.entry.turnRadius,
      speedRange: {
        forwardMax: this.entry.speed.forwardMax,
        reverseMax: this.entry.speed.reverseMax
      },
      rotation: 0,
      position: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      layer: 3,
      points: []
    };
    if(this.entry.turret){
      vehicle.turret = {
        graphic: this.entry.turret.graphic,
        auto: false,
        angle: {
          current: 0,
          max: this.entry.turret.angle.max,
          min: this.entry.turret.angle.min
        },
        position: {
          x: this.entry.turret.position.x,
          y: this.entry.turret.position.y
        },
        target: {
          active: true,
          x: 10000,
          y: 10000
        },
        agents: JSON.parse(JSON.stringify(this.entry.turret.agents)),
        power: false,
        wide: false,
        type: "agent_off",
        active: false
      };
    }
    if(this.entry.boom){
      vehicle.hold = true;
      vehicle.boom = {
        extended: this.entry.boom.extended,
        pMode: "agent_off"
      };
    }
    if(this.entry.plow){
      vehicle.plow = JSON.parse(JSON.stringify(this.entry.plow));
    }
    vehicle.path = "M" + vehicle.position.x + " " + vehicle.position.y;
    this.objects.push(vehicle);
    this.currentColor = (this.currentColor != this.colors.length - 1 ? this.currentColor + 1 : 0);
    this.super();
  }
});