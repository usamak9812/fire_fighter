Polymer("obj-control-item", {
  observe: {
    "selected.object": "selectedChanged"
  },
  selectedChanged: function(o, n){
    if(n == this.objectData){
      this.$.shadow.setZ(1);
    }
    else{
      this.$.shadow.setZ(0);
    }
  },
  select: function(){
    if(this.selected.object != this.objectData){
      this.selected.object = this.objectData;
      this.inputMode = "obj-edit";
    }
    // this.selected.doJump = true;
    this.selected.doJump = false;
  },
  move: function(e){
    this.fire("captureobjectundo");
    var dir = (e.target.id == "up" ? 1 : -1);
    var idx = this.objects.indexOf(this.objectData);
    if(idx + dir > -1 && idx + dir < this.objects.length){
      this.objects.splice(idx + dir, 0, this.objects.splice(idx, 1)[0]);
    }
  }
});