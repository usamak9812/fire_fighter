

    Polymer({
      /**
       * A single file to parse for docs
       *
       * @attribute url
       * @type String
       * @default ''
       */

      /**
       * Class documentation extracted from the parser
       *
       * @property classes
       * @type Array
       * @default []
       */
      classes: [],

      /**
       * Files to parse for docs
       *
       * @attribute sources
       * @type Array
       * @default []
       */
      sources: [],

      ready: function() {
        window.addEventListener('hashchange', this.parseLocationHash.bind(this));
        this.parseLocationHash();
      },

      parseLocationHash: function() {
        this.route = window.location.hash.slice(1);
      },

      routeChanged: function() {
        this.validateRoute();
      },

      validateRoute: function() {
        if (this.route) {
          this.classes.some(function(c) {
            // The URL fragment might be just a class name,
            // or it might be a class name followed by a '.' and then
            // a section of the page.
            // We want to match on class names here, so split on '.'.
            // E.g.: 'core-ajax.properties.xhrArgs' -> 'core-ajax'
            //       'core-xhr' -> 'core-xhr'
            if (c.name === this.route.split('.')[0]) {
              this.data = c;
              this.route = '';
              return true;
            }
          }, this);
        }
      },

      selectedChanged: function() { 
        this.data = this.classes[this.selected];
      },

      parserDataReady: function(event, detail, sender) {
        var path = '';
        if (this.sources.length) {
          var path = event.target.templateInstance.model;
          var idx = path.lastIndexOf('/');
          path = idx != -1 ? path.substr(0, idx) : '.';
        } else {
          var parts = location.pathname.split('/');
          parts.pop();
          path = parts.join('/');
        }

        var data = event.target.data;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', path + '/bower.json');

        xhr.onerror = function(e) {
          this.assimilateData(data);
        }.bind(this);

        xhr.onloadend = function(e) {

          // Add package version to data.
          if (e.target.status == 200) {
            var version = JSON.parse(e.target.response).version;
            // Assumes all classes (elements) in the list are the same version.
            for (var i = 0, c; c = data.classes[i]; ++i) {
              c.version = version;
            }
          }

          this.assimilateData(data);

        }.bind(this);

        xhr.send();
      },

      assimilateData: function(data) {
        this.classes = this.classes.concat(data.classes);
        this.classes.sort(function(a, b) {
          var na = a && a.name.toLowerCase(), nb = b && b.name.toLowerCase();
          return (na < nb) ? -1 : (na == nb) ? 0 : 1;
        });
        if (!this.data && !this.route && this.classes.length) {
          this.data = this.classes[0];
        }
        if (this.classes.length > 1) {
          this.$.toc.style.display = 'block';
        }
        this.validateRoute();
      }

    });

  