Polymer({

  ready: function(){

    this.hsl = {h: 0, s: 100, l: 50, a: 1};

    this.rgb = {r: 255, g: 0, b: 0, a: 1};

    this.hex = "#ff0000";

    this.color = new HSLColour(this.hsl.h, this.hsl.s, this.hsl.l);

    var hueLightnessCanvas = this.$["hue-lightness"];

    this.hueLightnessContext = hueLightnessCanvas.getContext("2d");

    var saturationCanvas = this.$["saturation"];

    this.saturationContext = saturationCanvas.getContext("2d");

    this.updateSaturationGradient();

    this.updateHueLightnessGradient();

  },

  observe: {

    "hsl.h": "updateColor",

    "hsl.s": "updateColor",

    "hsl.l": "updateColor",

    "rgb.r": "updateColor",

    "rgb.g": "updateColor",

    "rgb.b": "updateColor"

  },

  updateColor: function(){

    var hsl = this.color.getHSL();

    var rgb = this.color.getIntegerRGB();

    if(hsl.h != this.hsl.h || hsl.s != this.hsl.s || hsl.l != this.hsl.l){

      this.color = new HSLColour(this.hsl.h, this.hsl.s, this.hsl.l);

      this.rgb = this.color.getIntegerRGB();

      this.hex = this.color.getCSSHexadecimalRGB();

      this.updateSaturationGradient();

      this.updateHueLightnessGradient();

    }

    else if(rgb.r != this.rgb.r || rgb.g != this.rgb.g || rgb.b != this.rgb.b){

      this.color = new RGBColour(this.rgb.r, this.rgb.g, this.rgb.b);

      this.hsl = this.color.getHSL();

      this.hex = this.color.getCSSHexadecimalRGB();

      this.updateSaturationGradient();

      this.updateHueLightnessGradient();

    }

  },

  setPreset: function(e){

    this.tracking = false;

    this.rgb = this.presets[parseInt(e.target.id.slice(e.target.id.lastIndexOf("_") + 1))];

  },

  updateSaturationGradient: function(){

    var satMax = "hsl(" + this.hsl.h + ",100%," + this.hsl.l + "%)";

    var satMin = "hsl(" + this.hsl.h + ",0%," + this.hsl.l + "%)";

    var satGrad = this.saturationContext.createLinearGradient(0, 100, 0, 0);

    satGrad.addColorStop(0, satMin);

    satGrad.addColorStop(1, satMax);

    this.saturationContext.fillStyle = satGrad;

    this.saturationContext.fillRect(0, 0, 16, 100);

  },

  updateHueLightnessGradient: function(){

    var v = this.hsl.s / 100;

    this.hueLightnessContext.clearRect(0, 0, 180, 100);

    var hueGrad = this.hueLightnessContext.createLinearGradient(0, 0, 180, 0);

    hueGrad.addColorStop(0, "rgba(255, 0, 0, " + v + ")");

    hueGrad.addColorStop(1 / 6, "rgba(255, 255, 0, " + v + ")");

    hueGrad.addColorStop(2 / 6, "rgba(0, 255, 0, " + v + ")");

    hueGrad.addColorStop(3 / 6, "rgba(0, 255, 255, " + v + ")");

    hueGrad.addColorStop(4 / 6, "rgba(0, 0, 255, " + v + ")");

    hueGrad.addColorStop(5 / 6, "rgba(255, 0, 255, " + v + ")");

    hueGrad.addColorStop(1, "rgba(255, 0, 0, " + v + ")");

    var lightGradTop = this.hueLightnessContext.createLinearGradient(0, 50, 0, 0);

    lightGradTop.addColorStop(1, "rgba(255, 255, 255, 1)");

    lightGradTop.addColorStop(0, "rgba(255, 255, 255, 0)");

    var lightGradBottom = this.hueLightnessContext.createLinearGradient(0, 50, 0, 100);

    lightGradBottom.addColorStop(1, "rgba(0, 0, 0, 1)");

    lightGradBottom.addColorStop(0, "rgba(0, 0, 0, 0)");

    this.hueLightnessContext.fillStyle = hueGrad;

    this.hueLightnessContext.fillRect(0, 0, 180, 100);

    this.hueLightnessContext.fillStyle = lightGradTop;

    this.hueLightnessContext.fillRect(0, 0, 180, 50);

    this.hueLightnessContext.fillStyle = lightGradBottom;

    this.hueLightnessContext.fillRect(0, 50, 180, 50);

  },

  downSaturation: function(e){

    var bounds = this.$["saturation"].getBoundingClientRect();

    var y = e.clientY - bounds.top;

    this.tracking = false;

    this.hsl.s = 100 - y;

  },

  trackSaturation: function(e){

    var bounds = this.$["saturation"].getBoundingClientRect();

    var y = e.clientY - bounds.top;

    this.tracking = true;

    this.hsl.s = 100 - y;

    if(this.hsl.s > 100){

      this.hsl.s = 100;

    }

    else if(this.hsl.s < 0){

      this.hsl.s = 0

    }

  },

  downHueLightness: function(e){

    var bounds = this.$["hue-lightness"].getBoundingClientRect();

    var x = e.clientX - bounds.left;

    var y = e.clientY - bounds.top;

    this.tracking = false;

    this.hsl.h = x * 2;

    this.hsl.l = 100 - y;

  },

  trackHueLightness: function(e){

    var bounds = this.$["hue-lightness"].getBoundingClientRect();

    var x = e.clientX - bounds.left;

    var y = e.clientY - bounds.top;

    this.tracking = true;

    this.hsl.h = x * 2;

    if(this.hsl.h > 360){

      this.hsl.h = 360;

    }

    else if(this.hsl.h < 0){

      this.hsl.h = 0

    }

    this.hsl.l = 100 - y;

    if(this.hsl.l > 100){

      this.hsl.l = 100;

    }

    else if(this.hsl.l < 0){

      this.hsl.l = 0

    }

  }

})