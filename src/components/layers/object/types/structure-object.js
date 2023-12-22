Polymer({
  observe: {
    "objectData.size.width": "widthChanged",
    "objectData.size.height": "heightChanged"
  },
  widthChanged: function(){
    if(this.objectData.size.width < 3){
      this.objectData.size.width = 3;
    }
    else if(this.objectData.size.width > 512){
      this.objectData.size.width = 512;
    }
  },
  heightChanged: function(){
    if(this.objectData.size.height < 3){
      this.objectData.size.height = 3;
    }
    else if(this.objectData.size.height > 512){
      this.objectData.size.height = 512;
    }
  }
});