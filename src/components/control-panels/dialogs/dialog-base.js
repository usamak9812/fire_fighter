Polymer({
  open: function(){
    this.super();
    this.detectEsc = function(e){
      if(e.keyCode == 27){
        this.close();
      }
    }.bind(this);
    this.escListener = document.addEventListener("keyup", this.detectEsc);
  },
  close: function(){
    this.super();
    document.removeEventListener("keyup", this.detectEsc);
  }
});