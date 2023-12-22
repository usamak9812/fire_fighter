Polymer({
  selected: null,
  togglePanel: function(){
    this.view.annotationClearWait = true;
    this.job("shift wait", function(){
      this.view.offset.x += 0.01;
      this.job("shift wait", function(){
        this.view.offset.x -= 0.01;
        this.job("shift wait", function(){
          this.view.annotationClearWait = false;
        }, 10);
      }, 10);
    }, 1000);
    this.panels.vehicle.open = !this.panels.vehicle.open;
  }
});