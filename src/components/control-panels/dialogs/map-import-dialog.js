Polymer({
  ready: function(){
    this.super();
    this.key = "AIzaSyD7zm-H6Plz6TtLZRWCEcz0Qx-IkshdtQ0";
    this.version = "quarterly";
    this.labelStyles = {
      on: "&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative%7Celement:labels%7Cvisibility:off&style=feature:landscape%7Celement:labels.icon%7Cvisibility:off&style=feature:landscape%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Celement:labels%7Cvisibility:off&style=feature:water%7Celement:labels%7Cvisibility:off",
      off: "&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative%7Celement:labels%7Cvisibility:off&style=feature:landscape%7Celement:labels.icon%7Cvisibility:off&style=feature:landscape%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Celement:labels%7Cvisibility:off&style=feature:water%7Celement:labels%7Cvisibility:off"
    };
    window.addEventListener("message", this.importMap.bind(this));
  },
  cancel: function(){
    this.close();
    this.job("closewait", function(){
      this.bgDialog.open();
    }, 500);
  },
  getMapPosition: function(e){
    this.$.map.contentWindow.postMessage("getMapLocation", "*");
  },
  importMap: function(e){
    if(e.data){
      this.$.request.url = "http://maps.googleapis.com/maps/api/staticmap?" +
                          "size=640x640&maptype=" + e.data.type + "&scale=2&" +
                          "center=" + e.data.lat + "," + e.data.lng + "&" +
                          "zoom=" + e.data.zoom + "&key=" + this.key + "&v=" + this.version +
                          this.labelStyles[e.data.labels ? "on" : "off"];
      this.$.request.go();
    }
  },
  saveMap: function(e){
    var reader = new FileReader();
    reader.onload = () => {
      this.bgDialog.addNewMap(this.name, reader.result)
      this.close();
      this.$.overlay.className = "";
      this.name = "";
      this.job("closewait", function(){
        this.bgDialog.open();
        this.bgDialog.setFirstMap();
      }, 500);
    };
    reader.readAsDataURL(e.detail.response);
  }
});