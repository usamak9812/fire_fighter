Polymer({
  objectWidth: 152,
  ready: function(){
    this.contentWidth = (this.entries.length * this.objectWidth) + 2;
    this.$.scroll.addEventListener("mousewheel", function(e){
      this.scrollLeft -= e.wheelDelta;
    });
  }
});