Polymer({
  addCustom: function(){
    var parts = [];
    for(var i = 0; i != this.entry.parts.length; i++){
      parts.push({
        name: this.entry.parts[i].name,
        type: "aircraft",
        graphic: this.entry.parts[i].graphic,
        rotation: 0,
        offset: {
          x: this.entry.parts[i].offset.x,
          y: this.entry.parts[i].offset.y
        }
      });
    }
    this.objects.push({
      name: this.entry.name.replace(/_/g, ' '),
      type: "aircraft",
      subType: this.entry.name,
      graphic: this.entry.graphic,
      parts: parts,
      thumb: this.entry.thumb,
      rotation: 0,
      position: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      layer: 2
    });
    this.super();
  }
});