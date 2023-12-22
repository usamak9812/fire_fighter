Polymer({
  ready: function(){
    if(this.selected.object == this.objectData){
      this.selectedItem = this;
    }
  },
  observe: {
    "selected.object": "selectedChange"
  },
  selectedChange: function(o, n){
    if(n == this.objectData){
      this.selectedItem = this;
      this.$.shadow.setZ(1);
    }
    else{
      this.$.shadow.setZ(0);
    }
  },
  select: function(){
    if(this.selected.object != this.objectData){
      this.selectedItem = this;
      this.fire("selectbybutton");
      this.job("select wait", function(){
        this.selected.object = this.objectData;
      }, 1);
    }
  },
  toggleGroup: function(e){
    var groupIndex = parseInt(e.target.innerText) - 1;
    this.groups[groupIndex] = !this.groups[groupIndex];
  },
  toggleModeSelect: function(e){
    this.fire("togglemodeselect", {action: this.objectData == this.selected.object ? "toggle" : "open"});
  },
  toggleLock: function(e){
    this.fire("captureobjectundo");
    this.objectData.locked = !this.objectData.locked;
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