

    Polymer({

      toggle: function(e){

        var bounds = this.$.button.getBoundingClientRect();

        this.$.overlay.toggle();

      }

    })

  