
    
    Polymer({
      
      ready: function(){
        
        this.pointA = {x: 400, y:400};
        
        this.pointB = {x: 100, y:100};
        
      },
      
      updateVector: function(e){
        
        console.log(e);
        
        this.pointB.x = e.x;
        
        this.pointB.y = e.y;
        
      }
      
    })
    
  