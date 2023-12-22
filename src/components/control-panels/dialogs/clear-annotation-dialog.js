Polymer("clear-annotation-dialog", {
  verifyYes: function(){
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.close();
  },
  verifyNo: function(){
    this.close();
  }
});