Polymer({

  step: 0,

  next: function(){

    this.step++;

  },

  back: function(){

    this.step--;

  },

  open: function(){

    this.newConfig = {

      buttons: null,

      axes: null

    }

    window.requestAnimationFrame(this.pollPad.bind(this));

    this.super();

  },

  pollPad: function(){

    var pads = navigator.getGamepads();

    var i = 0;

    var pad = null

    for(i = 0; i != pads.length; i++){

      if(pads[i] && pads[i].id == this.padID){

        pad = pads[i];

        break;

      }

    }

    if(pad){

      if(!this.newConfig.buttons){

        this.newConfig.buttons = new Array(pad.buttons.length);

      }

      if(!this.newConfig.axes){

        this.newConfig.axes = new Array(pad.axes.length);

      }

      for(var j = 0; j != pads[i].axes.length; j++){

        if(!this.newConfig.axes[j] && pads[i].axes[j] == 1){

          console.log("axis", j, this.configSteps[this.step].reference)

          this.newConfig.axes[j] = this.configSteps[this.step].reference;

          this.step++;

          break;

        }

      }

      for(var h = 0; h != pads[i].buttons.length; h++){

        if(!this.newConfig.buttons[h] && pads[i].buttons[h].value == 1){

          this.newConfig.buttons[h] = this.configSteps[this.step].reference;

          this.step++;

          break;

        }

      }

    }

    else{

      this.step = 0;

      this.padID = null;

      this.close();

    }

    if(this.step == this.configSteps.length){

      this.step = 0;

      this.padConfigDB[this.padID] = this.newConfig;

      console.log(this.padConfigDB);

      this.close();

    }

    if(this.opened){

      window.requestAnimationFrame(this.pollPad.bind(this));

    }

  },

  configSteps: [

    {
      name: "Face Button 1",
      description: "Press the primary action button. Usually the 'A' button.",
      category: "buttons",
      reference: "a",
      pos: {x:184, y: 112}
    },

    {
      name: "Face Button 2",
      description: "The secondary action button. Usually the 'B' button.",
      category: "buttons",
      reference: "b",
      pos: {x:200, y: 128}
    },

    {
      name: "Face Button 3",
      description: "Extra action button. Usually the 'X' button.",
      category: "buttons",
      reference: "c",
      pos: {x:168, y: 128}
    },

    {
      name: "Face Button 4",
      description: "Extra action button. Usually the 'Y' button.",
      category: "buttons",
      reference: "d",
      pos: {x:184, y: 144}
    },

    {
      name: "Left Bumper",
      description: "Left shoulder button, the clicky one. Also potentially another face button.",
      category: "buttons",
      reference: "lb",
      pos: {x:72, y: 162}
    },

    {
      name: "Right Bumper",
      description: "Right shoulder button, the clicky one. Also potentially another face button.",
      category: "buttons",
      reference: "rb",
      pos: {x:184, y: 162}
    },

    {
      name: "Option Button 1",
      description: "Primary option button. Usually the 'Start' button.",
      category: "buttons",
      reference: "oa",
      pos: {x:148, y: 140}
    },

    {
      name: "Option Button 2",
      description: "Secondary option button. Usually the 'Back' or 'Option' button.",
      category: "buttons",
      reference: "ob",
      pos: {x:108, y: 140}
    },

    {
      name: "Option Button 3",
      description: "Extra option button. Usually the one located at the center of the controller.",
      category: "buttons",
      reference: "oc",
      pos: {x:128, y: 128}
    },

    {
      name: "Left Analog Button",
      description: "The button when the left analog stick is pressed.",
      category: "buttons",
      reference: "la",
      pos: {x:72, y: 128}
    },

    {
      name: "Right Analog Button",
      description: "The button when the right analog stick is pressed.",
      category: "buttons",
      reference: "ra",
      pos: {x:152, y: 96}
    },

    {
      name: "Left Analog Vertical",
      description: "The up and down action of the left analog stick.",
      category: "axes",
      reference: "lv",
      pos: {x:72, y: 140}
    },

    {
      name: "Left Analog Horizontal",
      description: "The left and right action of the left analog stick.",
      category: "axes",
      reference: "lh",
      pos: {x:84, y: 128}
    },

    {
      name: "Right Analog Vertical",
      description: "The up and down action of the right analog stick.",
      category: "axes",
      reference: "rv",
      pos: {x:152, y: 108}
    },

    {
      name: "Right Analog Horizontal",
      description: "The left and right action of the right analog stick.",
      category: "axes",
      reference: "rh",
      pos: {x:164, y: 96}
    },

    {
      name: "D-Pad Vertical",
      description: "The up and down action of the D-Pad.",
      category: "axes",
      reference: "dv",
      pos: {x:104, y: 108}
    },

    {
      name: "D-pad Horizontal",
      description: "The left and right action of the D-Pad.",
      category: "axes",
      reference: "dh",
      pos: {x:116, y: 96}
    },

    {
      name: "Left Trigger",
      description: "The left trigger button. the 'squishy' one.",
      category: "buttons",
      reference: "lt",
      pos: {x:52, y: 152}
    },

    {
      name: "Right Trigger",
      description: "The right trigger button. the 'squishy' one.",
      category: "buttons",
      reference: "rt",
      pos: {x:204, y: 152}
    }

  ]

})