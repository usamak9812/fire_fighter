Polymer({
  maps: [
    {
      title: "Airfield",
      url: "/assets/lib/map/Airfield.svg",
      thumb: "/assets/lib/map/Airfield_thumb.png",
      scale: 1.79,
      permanent: true,
      scaleLock: true
    },
    {
      title: "Atlanta",
      url: "/assets/lib/map/Atlanta.svg",
      thumb: "/assets/lib/map/Atlanta_thumb.png",
      scale: 1.92,
      permanent: true,
      scaleLock: true
    },
    {
      title: "Crash Site",
      url: "/assets/lib/map/Crash_Site.svg",
      thumb: "/assets/lib/map/crash_site_thumb.png",
      scale: 6,
      permanent: true,
      scaleLock: true
    },
    {
      title: "John Wayne Airport",
      url: "/assets/lib/map/John_Wayne_Airport.svg",
      thumb: "/assets/lib/map/john_wayne_airport_thumb.png",
      scale: 2.58,
      permanent: true,
      scaleLock: true
    },
    {
      title: "Saint George",
      url: "/assets/lib/map/Saint_George.svg",
      thumb: "/assets/lib/map/saint_george_thumb.png",
      scale: 1.73,
      permanent: true,
      scaleLock: true
    },
    {
      title: "Salt Lake City",
      url: "/assets/lib/map/Salt_Lake_City.svg",
      thumb: "/assets/lib/map/salt_lake_city_thumb.png",
      scale: 1.52,
      permanent: true,
      scaleLock: true
    },
    {
      title: "San Jose",
      url: "/assets/lib/map/San_Jose.svg",
      thumb: "/assets/lib/map/san_jose_thumb.png",
      scale: 2.06,
      permanent: true,
      scaleLock: true
    },
    {
      title: "Terminal and Taxiway",
      url: "/assets/lib/map/Terminal_and_Taxiway.svg",
      thumb: "/assets/lib/map/terminal_and_taxiway_thumb.png",
      scale: 5.1,
      permanent: true,
      scaleLock: true
    }
  ],
  ready: function(){
    this.super();
    this.imageLoader = document.createElement("img");
    this.imageLoader.style.position = "absolute";
    this.imageLoader.style.zIndex = "-100000";
    document.body.appendChild(this.imageLoader);
    this.canvas = document.createElement("canvas");
    this.canvas.width = 480;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.job("get wait", function(){
      chrome.storage.local.get("maps", function(items){
        if(items.maps){
          if(items.maps.length > this.maps.length){
            this.maps = items.maps;
          }
        }
      }.bind(this));
    }, 1000);
    document.addEventListener("paste", e => {
      var items = e.clipboardData.items;
      if(e.clipboardData.items[0].type == "image/png" && this.opened){
        this.getImageData(items[0].getAsFile());
      }
    });
  },
  generateThumbnail: function(mapUrl, callback){
    this.imageLoader.onload = () => {
      var dimensions = this.imageLoader.getBoundingClientRect();
      var width = dimensions.width;
      var height = dimensions.height;
      if(width > height){
        var scaleFactor = 480 / width;
        width = 480;
        height = height * scaleFactor;
      }
      else{
        var scaleFactor = 480 / height;
        height = 480;
        width = width * scaleFactor;
      }
      this.canvas.width = width;
      this.canvas.height = height;
      this.context.drawImage(this.imageLoader, 0, 0, width, height);
      callback(this.canvas.toDataURL());
    };
    this.imageLoader.src = mapUrl;
  },
  pasteImage: function(){
//     this._simulateDrop();
    document.execCommand("paste");
  },
  select: function(e){
    var bg = e.target.id;
    this.changeMap(bg);
  },
  changeMap: function(bgUrl){
    this.close();
    this.job("create wait", () => {
      this.file.create(false, () => {
        this.view.background.url = bgUrl;
        for(var i = 0; i != this.maps.length; i++){
          if(this.maps[i].url == bgUrl){
            this.view.globalScale = this.maps[i].scale;
            this.view.background.isPermanent = this.maps[i].permanent;
            this.view.background.scaleLock = this.maps[i].scaleLock || this.maps[i].permanent;
            break;
          }
        }
      })
    }, 500);
  },
  openMap: function(){
    this.close();
    this.job("open-wait", () => {
      this.mapImportDialog.open();
    }, 500);
  },
  openImage: function(){
    chrome.fileSystem.chooseEntry({
      type: "openFile",
      accepts: [
        {
          mimeTypes: ["image/*"]
        }
      ],
      acceptsAllTypes: false,
      acceptsMultiple: false
    },
    function(entry){
      entry[0].file(function(file){
        var reader = new FileReader();
        reader.onloadend = function(e){
          if(reader.result){
            console.log(reader.result)
            for(var i = 0; i != this.maps.length; i++){
              if(this.maps[i].url == reader.result){
                this.maps.unshift(this.maps.splice(i, 1)[0]);
                this.setFirstMap();
                break;
              }
              else if(i == this.maps.length - 1){
                this.addNewMap(file.name.slice(0, -4), reader.result);
                break;
              }
            }
          }
        }.bind(this);
        reader.readAsDataURL(file);
      }.bind(this));
    }.bind(this));
  },
  addNewMap(mapName, mapUrl){
    console.log("here")
    this.generateThumbnail(mapUrl, thumbnailUrl => {
      this.maps.unshift({
        title: mapName,
        url: mapUrl,
        thumb: thumbnailUrl,
        scale: 1,
        permanent: false,
        scaleLock: false
      });
      this.setFirstMap();
    });
  },
  over: function(e){
    e.preventDefault();
    var items = e.dataTransfer.items;
  },
  _simulateDrop: function(){
    var config = {
      preventDefault: function(){},
      dataTransfer: {
        items: [
          {
            type: "text/html",
            getAsString: function(callback){callback('src="https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"')}
          }
        ]
      }
    };
    this.drop(config);
  },
  drop: function(e){
    e.preventDefault();
    var items = e.dataTransfer.items;
    for(var i = 0; i != items.length; i++){
      if(items[i].type.indexOf("image") != -1){
        this.getImageData(items[i].getAsFile());
        break;
      }
      else if(items[i].type == "text/html"){
        items[i].getAsString(s => {
          var start = s.indexOf('src="') + 5;
          var end = s.indexOf('"', start);
          s = s.slice(start, end);
          this.$.fetcher.url = s;
          this.$.fetcher.go();
        });
        break;
      }
    }
  },
  handleFetch: function(e){
    console.log(e)
    var arrayBufferView = new Uint8Array(e.detail.response);
    var blob = new Blob([arrayBufferView], {type:"image/*"});
    this.getImageData(e.detail.response);
  },
  getImageData: function(blob){
    var reader = new FileReader();
    reader.onloadend = () => {
      this.$["map-preview"].style.backgroundImage = "url(" + reader.result.replace(/text\/html/g, "image/png") + ")";
      this.nameMap = true;
    };
    reader.readAsDataURL(blob);
  },
  nameCancel: function(){
    this.nameMap = false;
  },
  setNewMap: function(){
    console.log(this.$["map-preview"].style.backgroundImage);
    this.addNewMap(this.$["map-name"].value, this.$["map-preview"].style.backgroundImage.slice(5, -2));
    this.nameCancel();
  },
  setFirstMap: function(){
    chrome.storage.local.set({maps: this.maps});
    this.changeMap(this.maps[0].url);
  },
  removeVerify: function(e){
    e.stopPropagation();
    this.removeItem = e.target.id;
  },
  removeCancel: function(){
    this.removeItem = null;
  },
  removeCustom: function(e){
    for(var i = 0; i != this.maps.length; i++){
      if(this.maps[i].url == this.removeItem){
        this.maps.splice(i, 1);
        break;
      }
    }
    chrome.storage.local.set({maps: this.maps});
    this.removeItem = null;
  },
  closeToParent: function(){
    this.close();
    this.job("switch wait", function(){
      this.settingsDialog.open();
    }, 500);
  }
});