Polymer({
  add: function(){
    this.fire("captureobjectundo");
    this.addCustom();
    this.async(function(){
      this.selected.object = this.objects[this.objects.length - 1];
    }, 0);
    this.inputMode = "obj-edit";
  },
  stripUnderscores: function(name){
    return name.replace(/_/g, ' ');
  }
});