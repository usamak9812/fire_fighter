Polymer({
	extensionVal: 0,
  addCustom: function(){
    var obj = {
      name: this.entry.name,
      offset: this.entry.offset,
      graphic: this.entry.graphic,
      type: "front",
      scale: 0.5,
      flip: 1,
      size: {width: this.entry.width, height: this.entry.height},
      frameCount: this.entry.frames,
      opacity: 1,
      rotation: 0,
      position: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      layer: this.entry.layer
    };
  	if(this.entry.name === "Smoke Extension" || this.entry.name == "Fire Extension"){
  		var ids = ["a", "b", "c"];
  		obj.sub = ids[this.extensionVal];
  		this.extensionVal = this.extensionVal < 2 ? this.extensionVal + 1 : 0;
  	}
    this.objects.push(obj);
    this.super();
  }
});