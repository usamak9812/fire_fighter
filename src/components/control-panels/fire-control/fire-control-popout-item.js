Polymer({
  select: function(){
    if(this.selected.object != this.objectData){
      this.selectedItem = this;
      this.fire("selectbybutton");
      this.job("select wait", function(){
        this.selected.object = this.objectData;
      }, 1);
    }
  },
  openModeSelect: function(e){
    this.fire("openmodeselect", {fire: this.objectData});
  }
});