Polymer({
  ready: function(){
    this.super();
    this.job("load wait", function(){
      this.open();
    }, 100);
  },
  create: function(){
    this.close();
    this.job("close wait", function(){
      this.file.create(false, function(){
        var ctx = this.canvas.getContext("2d");
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }.bind(this));
    }, 500);
  },
  load: function(){
    this.close();
    this.job("close wait", function(){
      this.file.loadSelected(function(fileSelected){
      this.loadAnnotations();
        this.close();
      }.bind(this));
    }, 500);
  },
  loadRecent: function(e){
    this.file.loadRecent(this.file.recents[e.target.id], function(fileSelected){
      this.loadAnnotations();
      this.close();
    }.bind(this));
  },
  loadAnnotations: function(){
    this.inputMode = this.inputMode == "node-edit" ? "obj-edit" : this.inputMode;
    var ctx = this.canvas.getContext("2d");
    var lastOp = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.async(function(){
      if(this.session.view.savedAnnotations){
        var img = document.createElement("img");
        img.src = this.session.view.savedAnnotations;
        ctx.drawImage(img, 0, 0);
      }
    }, 500);
    ctx.globalCompositeOperation = lastOp;
  },
  openAbout: function(){
    this.about.open();
  },
  extentionless: function(name){
    return name.slice(0, name.lastIndexOf("."));
  }
});