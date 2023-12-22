
  Polymer({
    is: 'x-reflect',
    properties: {
      object: {
        type: Object,
        reflectToAttribute: true,
        value: function() { return {}; }
      },
      array: {
        type: Array,
        reflectToAttribute: true,
        value: function() { return []; }
      },
      number: {
        type: Number,
        reflectToAttribute: true,
        value: 0
      },
      string: {
        type: String,
        reflectToAttribute: true,
        value: 'none'
      },
      bool: {
        type: Boolean,
        reflectToAttribute: true,
        value: true
      },
      negBool: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      date: {
        type: Date,
        reflectToAttribute: true,
        value: function() { return new Date(0); }
      },
      dashCase: {
        type: String,
        reflectToAttribute: true,
        value: 'none'
      },
      noType: {
        value: 'none'
      },
      readOnly: {
        type: String,
        value: 'default',
        readOnly: true
      }
    }
  });
