Polymer("edit-buttons", {
  inputModeChanged: function(){
    this.$["line-width"].close();
    this.$.color.close();
  },
  setInputMode: function(e){
    // if(this.inputMode == "erase" && e.target.id == "erase"){
    //   this.fire("verifyClearAllAnnotations", []);
    // }
    this.inputMode = e.target.id;
  },
  captureAnnotations: function(){
//     this.view.zoom = 1;
//     this.view.globalScale = 1;
    var scale = window.innerWidth / this.view.scaledZoom / this.view.scaledGlobalScale / 8;
    console.log(this.view.scaledGlobalScale, scale)
    var annotations = this.canvas.toDataURL();
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var entry;
    this.library.Misc.forEach(item => {
      if(item.name =="Custom Image"){
        entry = item;
      }
    })
    var obj = {
      name: "Captured Annotation",
      graphic: annotations,
      type: entry.type,
      scale: scale,
      scaleFactor: scale * 2,
      rotation: 0,
      position: {
        x: -this.view.offset.x + (window.innerWidth / 2),
        y: -this.view.offset.y + (window.innerHeight / 2)
      },
      layer: 5
    };
    this.objects.push(obj);
  }
});