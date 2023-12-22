Polymer({
  observe: {
    "leakVisible": "updateVisibility",
    "interactMode": "updateVisibility"
  },
  ready: function(){
    this.leakExists = true;
  },
  updateVisibility: function(){
    this.style.opacity = (this.leakVisible || !this.interactMode ? "1" : "0");
  }
});