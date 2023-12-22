Polymer({
  observe:{
    "selected.object.layer": "toggleButtonActive"
  },
  toggleButtonActive: function(o, n){
    this.$.up.disabled = (typeof n == "number" ? false: true);
    this.$.down.disabled = (typeof n == "number" ? false: true);
  },
  moveLayer: function(e){
    if(this.selected){
      this.fire("captureobjectundo");
      var current = this.selected.object;
      if(e.target.id == "up" && this.selected.object.layer != 5){
        this.selected.object.layer++;
      }
      else if(e.target.id == "down" && this.selected.object.layer !== 0){
        this.selected.object.layer--;
      }
      this.async(function(){
        this.selected.object = current;
      }, 1);
    }
  }
});