Polymer({
  addCustom: function(){
    this.objects.push(this.getObject(this.entry.name));
    this.super();
  },
  getObject: function(name){
    var colors = ["red", "green", "blue", "yellow"];
    var obj = {
      name: this.entry.name,
      graphic: this.entry.graphic,
      type: this.entry.type,
      scale: 0.5,
      rotation: 0,
      position: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      layer: this.entry.layer
    };
    switch(name){
      case "Label":
        obj.hsl = {h: 0, s: 100, l: 50, a: 1};
        obj.scale = 0.5;
        return obj;
      case "Mask":
        obj.points = [[-16, -32], [16,-32], [32,-16], [32,16], [16, 32], [-16, 32], [-32, 16], [-32, -16]];
        obj.update = false;
        if(this.view.background.url.indexOf("svg+xml") != -1 ||
           this.view.background.isPermanent){
          this.fire("maskwarn");
        }
        return obj;
      case "Rectangle Structure":
        obj.subtype = "rectangle";
        obj.size = {width: 100, height: 100};
        obj.hsl = {h: 0, s: 0, l: 50, a: 1};
        return obj;
      case "Round Structure":
        obj.subtype = "round";
        obj.size = {width: 100, height: 100};
        obj.hsl = {h: 0, s: 0, l: 50, a: 1};
        return obj;
      case "Evacuation Slide":
        obj.subtype = "slide";
        obj.deployed = true;
        obj.active = true;
        obj.count = 50;
        obj.infinite = false;
        obj.spread = 1;
        obj.direction = 0;
        return obj;
      case "Evacuees":
        obj.active = true;
        obj.count = 50;
        obj.infinite = false;
        obj.spread = 1;
        obj.direction = 0;
        return obj;
      case "Custom Image":
        obj.scale = 1;
        return obj;
      case "Triage Sector":
        obj.scale = 0.5;
        obj.subtype = "triage";
        return obj;
      case "Ladder":
        obj.scale = 0.5;
        obj.subtype = "ladder";
        return obj;
      case "Casualty":
        obj.graphic = obj.graphic.replace("blue", colors[Math.floor(Math.random() * 4)]);
        obj.subtype = "casualty";
        obj.type = "interactive";
        obj.scale = 0.5;
        return obj;
      case "Casualty Group":
        obj.type = "interactive";
        obj.subtype = "casualty";
        obj.scale = 0.5;
        return obj;
      case "Hot Zone":
        obj.warn = this.entry.warn;
        obj.scale = 0.5;
        obj.opacity = 0.5;
        return obj;
      case "Warm Zone":
        obj.warn = this.entry.warn;
        obj.scale = 0.5;
        obj.opacity = 0.5;
        return obj;
      case "Clock Position":
        obj.color = "black";
        obj.scale = 0.5;
        obj.opacity = 1;
        return obj;
      case "Fuel Leak":
        obj.scale = 0.05;
        obj.opacity = 0.75;
        obj.scaleFactor = 0.075;
        return obj;
      case "Fuel Puddle":
        obj.scale = 0.05;
        obj.opacity = 0.75;
        obj.scaleFactor = 0.075;
        return obj;
      default:
        return obj;
    }
  }
});