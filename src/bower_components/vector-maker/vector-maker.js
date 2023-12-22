Polymer({

  ready: function(){

    this.vector = {

      current: {

        angle: 0,

        length: 0,

        rise: 0,

        run: 0

      },

      last: {

        angle: 0,

        length: 0,

        rise: 0,

        run: 0

      },

      delta: {

        angle: 0,

        length: 0,

        rise: 0,

        run: 0

      }

    }

  },

  observe: {

    "pointA.x": "calculateVector",

    "pointA.y": "calcualteVector",

    "pointB.x": "calculateVector",

    "pointB.y": "calcualteVector"

  },

  calculateVector: function(){

    if(this.pointA && this.pointB){

      var c = this.vector.current;

      var l = this.vector.last;

      var d = this.vector.delta;

      l.rise = c.rise;

      l.run = c.run;

      l.length = c.length;

      l.angle = c.angle;

      c.rise = this.pointA.y - this.pointB.y;

      c.run = this.pointB.x - this.pointA.x;

      c.length = Math.sqrt(Math.pow(c.rise, 2) + Math.pow(c.run, 2));

      c.angle = Math.atan2(-c.rise, c.run);

      d.rise = c.rise - l.rise;

      d.run = c.run - l.run;

      d.length = c.length - l.length;

      d.angle = c.angle - l.angle;

    }

  }

})