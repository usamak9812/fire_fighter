
  Polymer({
  
    is: 'dynamic-element',

    ready: function() {
      var url = this.resolveUrl('outer-element.html');
      this.importHref(url, function() {
        this.$.outer = document.createElement('outer-element');
        Polymer.dom(this.root).appendChild(this.$.outer);
        this._hasContent = true;
        if (this._callback) {
          this._callback();
        }
      }, function() {
        assert.fail('failed to load import', url);
      });
    },

    whenDynamicContentReady: function(callback) {
      this._callback = callback;
      if (this._hasContent) {
        this._callback();
      }
    }

  });
