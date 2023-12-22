Polymer({
  maxRecents: 10,
  ready: function(){
    this.recents = [];
    this.getRecents(function(recents){
      this.verifyRecents(recents);
    }.bind(this));
  },
  getRecents: function(callback){
    chrome.storage.local.get("recents", function(data){
      if(data.recents){
        recents = data.recents;
      }
      else{
        recents = [];
      }
      callback(recents);
    }.bind(this));
  },
  setRecents: function(){
    chrome.storage.local.set({"recents":this.recents});
  },
  addRecent: function(newRecent){
    var existing = this.checkExistingRecent(newRecent.path);
    if(!existing){
      this.recents.unshift(newRecent);
      if(this.recents.length == 11){
        this.recents.pop();
      }
    }
    else{
      var idx = this.recents.indexOf(existing);
      this.recents[idx] = newRecent;
      this.recents.unshift(this.recents.splice(idx, 1)[0]);
    }
    this.recents.slice(this.maxRecents);
    this.setRecents();
  },
  removeRecent: function(recent){
    for(var i = 0; i != this.recents.length; i++){
      if(this.recents[i] == recent){
        this.recents.splice(i, 1);
        break;
      }
    }
    this.setRecents();
  },
  verifyRecents: function(recents){
    if(recents.length > 0){
      chrome.fileSystem.restoreEntry(recents[0].id, function(entry){
        if(entry){
          this.recents.push({
            name: recents[0].name,
            id: recents[0].id,
            path: recents[0].path
          });
        }
        recents.shift();
        this.verifyRecents(recents);
      }.bind(this));
    }
    else{
      this.setRecents();
    }
  },
  create: function(init, callback){
    if(this.saveObject){
      this.$.dialog.verify(this.saveActive.bind(this), function(){
        this.prepNew(init, callback);
      }.bind(this));
    }
    else{
      this.prepNew(init, callback);
    }
  },
  prepNew: function(init, callback){
    this.saveObject = JSON.parse(JSON.stringify(this.newObjectTemplate));
    this.activeFile = null;
    this.saveCurrent = false;
    this.saveObject.view.offset.x = -960 + (chrome.app.window.current().innerBounds.width / 2);
    this.saveObject.view.offset.y = -960 + (chrome.app.window.current().innerBounds.height / 2);
    callback();
    if(!init){
      this.job("close wait", function(){
        this.fire("open-settings");
      }, 500);
    }
  },
  checkExistingRecent: function(path){
    for(var i = 0; i != this.recents.length; i++){
      if(this.recents[i].path == path){
        return this.recents[i];
      }
    }
    return null;
  },
  loadSelected: function(callback){
    this.$.dialog.verify(this.saveActive.bind(this), function(){
      chrome.fileSystem.chooseEntry({
        type: "openWritableFile",
        accepts: [
          {
            extensions: this.allowedExtensions.split(",")
          }
        ],
        acceptsAllTypes: false
      },
      function(entry){
        if(entry){
          var recent;
          chrome.fileSystem.getDisplayPath(entry, function(path){
            var id = chrome.fileSystem.retainEntry(entry);
            var existing = this.checkExistingRecent(path);
            if(existing){
              recent = existing;
            }
            else{
              recent = {
                id: id,
                name: entry.name,
                path: path
              };
            }
            this.activeFile = recent;
            this.addRecent(recent);
            this.loadDataFromFile(entry, callback);
          }.bind(this));
        }
        else{
          callback(false);
        }
      }.bind(this));
    }.bind(this));
  },
  loadRecent: function(recent, callback){
    chrome.fileSystem.restoreEntry(recent.id, function(entry){
      if(entry){
        this.activeFile = recent;
        this.addRecent(recent);
        this.loadDataFromFile(entry, callback);
      }
      else{
        callback(false);
      }
    }.bind(this));
  },
  loadDataFromFile: function(entry, callback){
    entry.file(function(file){
      var reader = new FileReader();
      reader.onload = function(){
        this.saveObject = JSON.parse(reader.result);
        callback(true);
      }.bind(this);
      reader.readAsText(file);
    }.bind(this));
  },
  saveActive: function(callback){
    if(this.activeFile){
      chrome.fileSystem.restoreEntry(this.activeFile.id, function(entry){
        this.saveDataToFile(entry, callback);
      }.bind(this));
    }
    else{
      this.saveCopy(callback);
    }
  },
  saveCopy: function(callback){
    chrome.fileSystem.chooseEntry({
      type: "saveFile",
      suggestedName: "untitled.act",
      accepts: [
        {
          extensions: this.allowedExtensions.split(",")
        }
      ],
      acceptsAllTypes: false
    },
    function(entry){
      if(entry){
        chrome.fileSystem.getDisplayPath(entry, function(path){
          var id = chrome.fileSystem.retainEntry(entry);
          var recent = {
            id: id,
            name: entry.name,
            path: path
          };
          this.activeFile = recent;
          this.addRecent(recent);
          this.saveDataToFile(entry, callback);
        }.bind(this));
      }
      else{
        callback(false);
      }
    }.bind(this));
  },
  saveDataToFile: function(entry, callback){
    entry.createWriter(function(writer){
      writer.onwriteend = function(){
        if(writer.length === 0){
          var saveString = JSON.stringify(this.saveObject);
          var blob = new Blob([saveString], {type: "text/plain"});
          writer.write(blob);
          callback(true);
        }
      }.bind(this);
      writer.truncate(0);
    }.bind(this));
  }
});