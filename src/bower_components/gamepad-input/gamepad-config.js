Polymer({

  currentConfigValue: null,

  configTemp: null,

  getConfig: function(id){

    console.log("getting config")

    if(this.db[id]){

      console.log("found config")

      return this.db[id];

    }

    else{

      console.log(this.useConfigDialog, this.$.steps.opened)

      if(this.useConfigDialog && !this.$.steps.opened){

        console.log("configging")

        this.$.steps.padID = id;

        this.$.steps.open();

      }

      return null;

    }

  },

  db: {

    "Performance Designed Products Gamepad for Xbox 360 (Vendor: 0e6f Product: 0401)": {
      axes: [
        "lh",
        "lv",
        "lt",
        "rh",
        "rv",
        "rt",
        "dh",
        "dv"
      ],
      buttons: [
        "a",
        "b",
        "c",
        "d",
        "lb",
        "rb",
        "ob",
        "oc",
        "oa",
        "la",
        "ra"
      ]
    }

  }

})