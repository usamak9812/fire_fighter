Polymer({
  select: function(e){
    var input = 0;
    if(e.touches){
      input = e.touches.length;
    }
    else{
      input = e.button + 1;
    }
    if(input){
      this.fire("captureobjectundo");
      this.selected.object = this.objectData;
    }
  }
});