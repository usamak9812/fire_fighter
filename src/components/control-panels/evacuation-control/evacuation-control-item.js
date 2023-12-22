Polymer({
  ready: function(){
    if(this.selected.object == this.objectData){
      this.selectedItem = this;
    }
    this.objectData.deployed = this.objectData.deployed || false;
    this.objectData.right = this.objectData.right || false;
  },
  switchSide: function(){
    this.fire("captureobjectundo");
    this.objectData.right = !this.objectData.right;
  },
  toggleDeploy: function(){
    this.fire("captureobjectundo");
    this.objectData.deployed = !this.objectData.deployed;
    if(!this.objectData.deployed){
      this.objectData.active = false;
    }
  },
  toggleEvacuees: function(e){
    this.fire("captureobjectundo");
    this.objectData.active = !this.objectData.active;
    if(this.objectData.active){
      this.objectData.deployed = true;
    }
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