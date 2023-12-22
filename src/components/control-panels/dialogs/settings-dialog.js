Polymer({
  rotation: -Math.PI / 2,
  position: {x: 0, y:0},
  observer: {
    "view.globalScale": "scaleChanged"
  },
  zoom: function(e){
    if(!this.view.background.scaleLock){
      this.view.globalScale += e.wheelDelta / 2000;
    }
  },
  scaleChanged: function(o, n){
    this.updatePermanentMapData();
  },
  updatePermanentMapData: function(){
    this.job("store wait", function(){
      for(var i = 0; i != this.backgroundSelectDialog.maps.length; i++){
        if(this.backgroundSelectDialog.maps[i].url == this.view.background.url && 
           !this.backgroundSelectDialog.maps[i].permanent){
          this.backgroundSelectDialog.maps[i].scale = this.view.globalScale;
          this.backgroundSelectDialog.maps[i].scaleLock = this.view.background.scaleLock;
          chrome.storage.local.set({maps: this.backgroundSelectDialog.maps});
          break;
        }
      }
    }, 500);
  },
  rotateStart: function(){
    this.rotating = true;
  },
  rotate: function(e){
    var center = {x:0, y:0};
    var ref = this.$["map-adjust-panel"].getBoundingClientRect();
    center.x = ref.left + 290;
    center.y = ref.top + 290;
    this.rotation = Math.atan2(e.clientY - center.y, e.clientX - center.x);
  },
  rotateEnd: function(){
    this.rotating = false;
  },
  clear: function(){
    this.rotation = -Math.PI / 2;
    this.position.x = 960 * this.view.scaledGlobalScale;
    this.position.y = 960 * this.view.scaledGlobalScale;
  },
  closePanel: function(){
    this.toggle();
  },
  changeDriveMode: function(e){
    this.driveMode = e.target.id;
  },
  openBackgroundSelect: function(){
    this.close();
    this.job("transition wait", function(){
      this.backgroundSelectDialog.open();
    }, 500);
  },
  removeImage: function(){
    this.view.background.url = "";
    this.view.background.scale = 1;
  },
  pan: function(e){
    if(!this.rotating){
      this.globalScale = 1;
      this.position.x += e.ddx * this.view.scaledGlobalScale;
      this.position.y += e.ddy * this.view.scaledGlobalScale;
    }
  },
  toggleScaleLock: function(){
    this.view.background.scaleLock = !this.view.background.scaleLock;
    this.updatePermanentMapData();
  },
  getCheckIconState: function(l){return l ? "check-box" : "check-box-outline-blank";},
  getCheckText: function(l){return l ? "Locked" : "Unlocked";}
});