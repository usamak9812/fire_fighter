Polymer({

  ready: function(){

    this.pads = [];

    for(var i = 0; i != 4; i++){

      this.pads.push(
        {
          id: null,
          axes: {},
          buttons: {}
        }
      )

    };

    window.requestAnimationFrame(this.pollPads.bind(this));

  },

  pollPads: function(){

    pads = navigator.getGamepads();

    for(var i = 0; i != pads.length; i++){

      if(pads[i]){

        this.checkPadConnection(this.pads[i], pads[i]);

        this.updatePadInputs(this.pads[i], pads[i]);

      }

    }

    window.requestAnimationFrame(this.pollPads.bind(this));

  },

  checkPadConnection: function(pad, update){

    if(pad.id && !update){

      console.log(pad.id + " disconnected");

      pad.id = null;

    }

    else if(!pad.id && update){

      console.log(update.id + " connected");

      var config = this.$.config.getConfig(update.id);

      if(config){

        pad.id = update.id;

        var i;

        for(i = 0; i != config.axes.length; i++){

          pad.axes[config.axes[i]] = 0;

        }

        for(i = 0; i != config.buttons.length; i++){

          pad.buttons[config.buttons[i]] = false;

        }

      }

    }

  },

  updatePadInputs: function(pad, update){

    if(pad.id){

      var i = 0;

      for(var axis in pad.axes){

        pad.axes[axis] = update.axes[i];

        i++;

      }

      i = 0;

      for(var button in pad.buttons){

        pad.buttons[button] = update.buttons[i].pressed;

        i++;

      }

      if("lv" in pad.axes && "lh" in pad.axes){

        var vector = this.calculateVector(pad.axes.lv, pad.axes.lh);

        pad.axes['la'] = vector.angle;

        pad.axes['lm'] = vector.magnitude;

      }

      if("rv" in pad.axes && "rh" in pad.axes){

        var vector = this.calculateVector(pad.axes.rv, pad.axes.rh);

        pad.axes['ra'] = vector.angle;

        pad.axes['rm'] = vector.magnitude;

      }

    }

  },

  calculateVector: function(rise, run){

    var magnitude = Math.sqrt((Math.pow(rise, 2) + Math.pow(run, 2)));

    magnitude > 1 ? magnitude = 1 : magnitude;

    var angle = Math.atan2(rise, run);

    return {magnitude: magnitude, angle: angle};

  },

  applyDeadZone: function(pad){

    for(var i = 0; i != 2; i++){

      if(i == 0){

        var side = "left";

      }

      else{

        var side = "right";

      }

      var dz = parseFloat(pad[side + "_analog_dz"]);

      var h = pad[side + "_analog_h"];

      var v = pad[side + "_analog_v"];

      var mag = Math.sqrt(Math.pow(h, 2) + Math.pow(v, 2));

      if(mag > 1){

        mag = 1;

      }

      if(mag < dz){

        pad[side + "_analog_h"] = 0;

        pad[side + "_analog_v"] = 0;

      }

      else{

        var h_n = h * mag;

        var v_n = v * mag;

        pad[side + "_analog_h"] = h * h_n;

        if(h < 0){

          pad[side + "_analog_h"] = -pad[side + "_analog_h"];

        }

        pad[side + "_analog_v"] = v * v_n;

        if(v < 0){

          pad[side + "_analog_v"] = -pad[side + "_analog_v"];

        }

      }

    }

  }

});