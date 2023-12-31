

var Child;
var instance;

beforeEach(function() {
  // Ensure a clean environment for each test.
  window.Base = Polymer.Base;
  window.Child = Object.create(Base);
  Child._registerFeatures = function() {};
  Child._initFeatures = function() {};
  Child.setAttributeToProperty = function() {};
  Child._doBehavior = function(name, args) {
    if (this[name]) {
      this[name].apply(this, args || []);
    }
  };
  window.instance = Object.create(Child);
});

suite('addFeature', function() {

  test('mixes the feature into Base', function() {
    assert.notOk(Base.someProperty);
    Base._addFeature({someProperty: 123});
    assert.equal(Base.someProperty, 123);
  });

});

suite('registerCallback', function() {

  test('calls registered() after registerFeatures()', function() {
    var called = [];
    Child._registerFeatures = function() {
      called.push('1');
    };
    Child.registered = function() {
      called.push('2');
    };
    assert.deepEqual(called, []);
    Child.registerCallback();
    assert.includeMembers(called, ['1', '2']);
  });

});

suite('createdCallback', function() {

  // TODO(nevir): sinonify.
  test('calls lifecycle events in the proper order', function() {
    var called = [];
    Child.created = function() {
      called.push('created');
    };
    assert.deepEqual(called, []);
    instance.createdCallback();
    assert.deepEqual(called, ['created']);
  });

  test('calls initFeatures()', function() {
    var called = false;
    Child._initFeatures = function() {
      called = true;
    };
    instance.createdCallback();
    assert.isTrue(called);
  });

  test('calls initFeatures() with the correct `this`', function() {
    Child._initFeatures = function() {
      assert.equal(this, instance);
    };
    instance.createdCallback();
  });

});

suite('attachedCallback', function() {

  test('calls attached()', function() {
    var called = false;
    Child.attached = function() {called = true};
    instance.attachedCallback();
    assert.isTrue(called);
  });

});

suite('detachedCallback', function() {

  test('calls detached()', function() {
    var called = false;
    Child.detached = function() {called = true};
    instance.detachedCallback();
    assert.isTrue(called);
  });

});

suite('attributeChangedCallback', function() {

  test('calls attributeChanged()', function() {
    var args = null;
    Child.attributeChanged = function() {args = arguments};
    instance.attributeChangedCallback('attr', null, 1, 'stuff');

    assert.equal(args.length, 4);
    assert.equal(args[0], 'attr');
    assert.equal(args[1], null);
    assert.equal(args[2], 1);
    assert.equal(args[3], 'stuff');
  });

});

