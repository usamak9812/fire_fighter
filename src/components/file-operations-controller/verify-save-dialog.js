Polymer({
  verify: function(saveAction, postAction){
    this.saveAction = saveAction;
    this.postAction = postAction;
    this.open();
  },
  doSave: function(){
    this.saveAction(function(){
      this.postAction();
    }.bind(this));
    this.close();
  },
  doNotSave: function(){
    this.postAction();
    this.close();
  },
  doCancel: function(){
    this.close();
  }
});