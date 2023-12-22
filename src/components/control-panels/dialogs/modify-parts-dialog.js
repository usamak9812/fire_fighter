Polymer({
  list: [],
  parsed: function(name){
    var n = name.slice(name.indexOf("_") + 1);
    if(n.indexOf("_L") != -1){
      n = "left " + n.slice(0, n.indexOf("_L")) + n.slice(n.indexOf("_L") + 2);
    }
    else if(n.indexOf("_R") != -1){
      n = "right " + n.slice(0, n.indexOf("_R")) + n.slice(n.indexOf("_R") + 2);
    }
    return n.replace(/_/g, " ");
  },
  getPartImageURL: function(name){
    var planeName = name.slice(0, name.indexOf("_"));
    return "/assets/lib/aircraft/" + planeName + "/" + name + ".svg";
  },
  modifyList: function(e){
    var idx = parseInt(e.target.id.slice(0, e.target.id.indexOf("_")));
    if(e.target.checked){
      this.list.push(idx);
    }
    else{
      this.list.splice(this.list.indexOf(idx), 1);
    }
  },
  cancel: function(){
    this.close();
  },
  detach: function(){
    var n = JSON.parse(JSON.stringify(this.selected.object));
    n.name = this.selected.object.parts[this.list[0]].name;
    n.parts = [];
    this.list.sort(function(a, b){return a - b;});
    for(var i = 0; i != this.list.length; i++){
      var part = this.selected.object.parts.splice(this.list[i] - i, 1)[0];
      n.parts.push(part);
    }
    var offset = {x:0 , y:0};
    for(var j = 0; j != n.parts.length; j++){
      offset.x += n.parts[j].offset.x;
      offset.y += n.parts[j].offset.y;
    }
    offset.x = (128 - (offset.x / n.parts.length));
    offset.y = (128 - (offset.y / n.parts.length));
    for(var k = 0; k != n.parts.length; k++){
      n.parts[k].offset.x += offset.x;
      n.parts[k].offset.y += offset.y;
    }
    var ang = Math.atan2(offset.y, offset.x) + this.selected.object.rotation;
    var mag = Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));
    offset.x = Math.cos(ang) * mag;
    offset.y = Math.sin(ang) * mag;
    n.position.x -= offset.x * this.view.scaledGlobalScale / 32;
    n.position.y -= offset.y * this.view.scaledGlobalScale / 32;
    this.list = [];
    this.objects.splice(this.objects.indexOf(this.selected.object), 0, n);
    this.selected.object = null;
    this.job("deselect wait", function(){
      this.selected.object = n;
    }, 0);
    this.close();
  }
});