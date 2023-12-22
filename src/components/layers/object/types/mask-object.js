 Polymer({
  getPolygonPoints: function(u, x, y){
    var op = this.objectData.points;
    var ps = "";
    for(var p in op){
      ps += (op[p][0] + x) + "," + (op[p][1] + y) + " ";
    }
    return ps;
  },
  getLineVisible: function(i){
    if(i == "node-edit"){
      return 1;
    }
    return 0;
  },
  select: function(e){
    this.fire("captureobjectundo");
    this.selected.object = this.objectData;
  }
});