

    Polymer({

      observe: {

        "pads[0]": "updatePadConnection",

        "pads[1]": "updatePadConnection",

        "pads[2]": "updatePadConnection",

        "pads[3]": "updatePadConnection"

      },

      updatePadConnection: function(o, n){

        this.$["" + this.pads.indexOf(n)].pad = n;

      }

    });

  