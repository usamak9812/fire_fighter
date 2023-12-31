

suite('basic path bindings', function() {

  var el;

  setup(function() {
    el = document.createElement('x-stuff');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('downward data flow', function() {
    // Setup 
    var nested = {
      obj: {
        value: 42
      }
    };
    el.expectedNestedSubpath = 'nested';
    el.expectedNestedValue = nested;
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = nested.obj;
    el.$.compose.expectedObjSubpath = 'obj';
    el.$.compose.expectedObjValue = nested.obj;
    el.$.forward.expectedObjSubpath = 'obj';
    el.$.forward.expectedObjValue = nested.obj;
    el.$.forward.$.compose.expectedObjSubpath = 'obj';
    el.$.forward.$.compose.expectedObjValue = nested.obj;
    // Do the thing
    el.nested = nested;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 1);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.obj, nested.obj);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.obj, nested.obj);
    assert.equal(el.$.forward.$.compose.obj, nested.obj);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from basic element property change', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.$.basic.notifyingValue = 42;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from composed element property change', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.$.compose.$.basic1.notifyingValue = 42;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from forward\'s composed element property change', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.$.forward.$.compose.$.basic1.notifyingValue = 42;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from setPathValue in top element', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.setPathValue('nested.obj.value', 42);
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from setPathValue in composed element', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.$.compose.setPathValue('obj.value', 42);
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from setPathValue in forward element', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.$.forward.setPathValue('obj.value', 42);
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from setPathValue in forward\'s composed element', function() {
    // Setup
    var nested = {
      obj: {
        value: 41
      }
    };
    el.nested = nested;
    el.expectedNestedSubpath = 'nested.obj.value';
    el.expectedNestedValue = 42;
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 42;
    el.$.compose.expectedObjSubpath = 'obj.value';
    el.$.compose.expectedObjValue = 42;
    el.$.forward.expectedObjSubpath = 'obj.value';
    el.$.forward.expectedObjValue = 42;
    el.$.forward.$.compose.expectedObjSubpath = 'obj.value';
    el.$.forward.$.compose.expectedObjValue = 42;
    el.clearObserverCounts();
    // Do the thing
    el.$.forward.$.compose.setPathValue('obj.value', 42);
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 0);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from object change in compose element', function() {
    // Setup
    el.nested = {
      obj: {
        value: 41
      }
    };
    var obj = {
      value: 42
    };
    el.expectedNestedSubpath = 'nested.obj';
    el.expectedNestedValue = obj;
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = obj;
    el.$.compose.expectedObjSubpath = 'obj';
    el.$.compose.expectedObjValue = obj;
    el.$.forward.expectedObjSubpath = 'obj';
    el.$.forward.expectedObjValue = obj;
    el.$.forward.$.compose.expectedObjSubpath = 'obj';
    el.$.forward.$.compose.expectedObjValue = obj;
    el.clearObserverCounts();
    // Do the thing
    el.$.compose.obj = obj;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 1);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from object change in forward element', function() {
    // Setup
    el.nested = {
      obj: {
        value: 41
      }
    };
    var obj = {
      value: 42
    };
    el.expectedNestedSubpath = 'nested.obj';
    el.expectedNestedValue = obj;
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = obj;
    el.$.compose.expectedObjSubpath = 'obj';
    el.$.compose.expectedObjValue = obj;
    el.$.forward.expectedObjSubpath = 'obj';
    el.$.forward.expectedObjValue = obj;
    el.$.forward.$.compose.expectedObjSubpath = 'obj';
    el.$.forward.$.compose.expectedObjValue = obj;
    el.clearObserverCounts();
    // Do the thing
    el.$.forward.obj = obj;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 1);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('notification from object change in forward\'s compose element', function() {
    // Setup
    el.nested = {
      obj: {
        value: 41
      }
    };
    var obj = {
      value: 42
    };
    el.expectedNestedSubpath = 'nested.obj';
    el.expectedNestedValue = obj;
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = obj;
    el.$.compose.expectedObjSubpath = 'obj';
    el.$.compose.expectedObjValue = obj;
    el.$.forward.expectedObjSubpath = 'obj';
    el.$.forward.expectedObjValue = obj;
    el.$.forward.$.compose.expectedObjSubpath = 'obj';
    el.$.forward.$.compose.expectedObjValue = obj;
    el.clearObserverCounts();
    // Do the thing
    el.$.forward.$.compose.obj = obj;
    // Verify
    assert.equal(el.observerCounts.nestedSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjChanged, 1);
    assert.equal(el.observerCounts.nestedObjSubpathChanged, 1);
    assert.equal(el.observerCounts.nestedObjValueChanged, 1);
    assert.equal(el.$.compose.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.compose.observerCounts.objValueChanged, 1);
    assert.equal(el.$.forward.observerCounts.objSubpathChanged, 1);
    assert.equal(el.$.forward.observerCounts.objValueChanged, 1);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.basic.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, 42);
    assert.equal(el.$.basic.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.compose.$.basic2.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic1.getAttribute('attrvalue'), '42');
    assert.equal(el.$.forward.$.compose.$.basic2.getAttribute('attrvalue'), '42');
  });

  test('negation', function() {
    // Setup
    var nested = {
      obj: {
        value: false
      }
    };
    // Do the thing
    el.nested = nested;
    // Verify
    assert.equal(el.$.basic.notifyingValue, false);
    assert.equal(el.$.compose.$.basic1.notifyingValue, false);
    assert.equal(el.$.compose.$.basic2.notifyingValue, false);
    assert.equal(el.$.compose.$.basic3.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, false);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, false);
    assert.equal(el.$.forward.$.compose.$.basic3.notifyingValue, true);
    assert.equal(el.$.basic.hasAttribute('attrvalue'), false);
    assert.equal(el.$.compose.$.basic1.hasAttribute('attrvalue'), false);
    assert.equal(el.$.compose.$.basic2.hasAttribute('attrvalue'), false);
    assert.equal(el.$.compose.$.basic3.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic1.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic2.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic3.hasAttribute('attrvalue'), true);

    // Do another thing
    el.$.basic.notifyingValue = true;
    // Verify
    assert.equal(el.$.basic.notifyingValue, true);
    assert.equal(el.$.compose.$.basic1.notifyingValue, true);
    assert.equal(el.$.compose.$.basic2.notifyingValue, true);
    assert.equal(el.$.compose.$.basic3.notifyingValue, false);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic3.notifyingValue, false);
    assert.equal(el.$.basic.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic1.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic2.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic3.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic1.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic2.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic3.hasAttribute('attrvalue'), false);

    // Do another thing
    el.$.forward.$.compose.$.basic1.notifyingValue = false;
    // Verify
    assert.equal(el.$.basic.notifyingValue, false);
    assert.equal(el.$.compose.$.basic1.notifyingValue, false);
    assert.equal(el.$.compose.$.basic2.notifyingValue, false);
    assert.equal(el.$.compose.$.basic3.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, false);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, false);
    assert.equal(el.$.forward.$.compose.$.basic3.notifyingValue, true);
    assert.equal(el.$.basic.hasAttribute('attrvalue'), false);
    assert.equal(el.$.compose.$.basic1.hasAttribute('attrvalue'), false);
    assert.equal(el.$.compose.$.basic2.hasAttribute('attrvalue'), false);
    assert.equal(el.$.compose.$.basic3.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic1.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic2.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic3.hasAttribute('attrvalue'), true);

    // Do another thing
    el.setPathValue('nested.obj.value', true);
    // Verify
    assert.equal(el.$.basic.notifyingValue, true);
    assert.equal(el.$.compose.$.basic1.notifyingValue, true);
    assert.equal(el.$.compose.$.basic2.notifyingValue, true);
    assert.equal(el.$.compose.$.basic3.notifyingValue, false);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic3.notifyingValue, false);
    assert.equal(el.$.basic.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic1.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic2.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic3.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic1.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic2.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic3.hasAttribute('attrvalue'), false);

    // Do another thing
    // no two way binding through negation
    el.$.compose.$.basic3.notifyingValue = true;
    // Verify
    assert.equal(el.$.basic.notifyingValue, true);
    assert.equal(el.$.compose.$.basic1.notifyingValue, true);
    assert.equal(el.$.compose.$.basic2.notifyingValue, true);
    assert.equal(el.$.compose.$.basic3.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic1.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic2.notifyingValue, true);
    assert.equal(el.$.forward.$.compose.$.basic3.notifyingValue, false);
    assert.equal(el.$.basic.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic1.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic2.hasAttribute('attrvalue'), true);
    assert.equal(el.$.compose.$.basic3.hasAttribute('attrvalue'), false);
    assert.equal(el.$.forward.$.compose.$.basic1.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic2.hasAttribute('attrvalue'), true);
    assert.equal(el.$.forward.$.compose.$.basic3.hasAttribute('attrvalue'), false);

  });

  test('simlarly named properties', function() {
    var nested = {
      obj: {
        value: 41,
        value2: 99
      }
    };
    el.nested = nested;
    assert.equal(el.$.compose.$.basic1.notifyingValue, 41);
    assert.equal(el.$.compose.$.basic1.othervalue, 99);
    el.setPathValue('nested.obj.value', 42);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.othervalue, 99);
    el.setPathValue('nested.obj.value2', 98);
    assert.equal(el.$.compose.$.basic1.notifyingValue, 42);
    assert.equal(el.$.compose.$.basic1.othervalue, 98);
  });

});

suite('path effects', function() {

  var el;

  setup(function() {
    el = document.createElement('x-stuff');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('observer with multiple args, path last', function() {
    // Setup 
    var nested = {
      obj: {
        value: 42
      }
    };
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = nested.obj;
    // Do the thing
    el.a = 'a';
    el.b = 'b';
    el.nested = nested;
    // Verify
    assert.equal(el.observerCounts.multipleChanged, 1);
  });

  test('observer with multiple args, path not last', function() {
    // Setup 
    var nested = {
      obj: {
        value: 42
      }
    };
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = nested.obj;
    // Do the thing
    el.a = 'a';
    el.nested = nested;
    el.b = 'b';
    // Verify
    assert.equal(el.observerCounts.multipleChanged, 1);
  });

  test('observer with multiple args, path first, then last', function() {
    // Setup 
    var nested = {
      obj: {
        value: 42
      }
    };
    el.nested = nested;
    el.clearObserverCounts();
    el.expectedNestedObjSubpath = 'nested.obj';
    el.expectedNestedObjValue = nested.obj;
    // Do the thing
    el.a = 'a';
    el.b = 'b';
    // Verify
    assert.equal(el.observerCounts.multipleChanged, 1);

    // Setup
    el.expectedNestedObjSubpath = 'nested.obj.value';
    el.expectedNestedObjValue = 43;
    // Do another thing
    el.setPathValue('nested.obj.value', 43);
    // Verify
    assert.equal(el.observerCounts.multipleChanged, 2);
  });

  test('observer & computed with multiple path args', function() {
    // Setup 
    var nested = {
      b: 33,
      obj: {
        c: 66
      }
    };
    // Do the thing
    el.a = 1;
    el.nested = nested;
    // Verify
    // Multiple-dependency observers with dependencies on the same
    // object will be called once for each dependency on the shared object
    assert.equal(el.observerCounts.multiplePathsChanged, 2);
    assert.equal(el.computedFromPaths, 100);
    assert.equal(el.$.boundChild.computedFromPaths, 100);
  });

});

suite('path API', function() {

  var el;

  setup(function() {
    el = document.createElement('x-stuff');
    document.body.appendChild(el);
  });

  teardown(function() {
    document.body.removeChild(el);
  });

  test('getPathValue', function() {
    el.simple = 11;
    el.nested = {
      again: {
        again: {
          wayOverThere: 99
        },
        there: 55
      },
      here: 42
    };
    assert.equal(el.getPathValue('simple'), 11);
    assert.equal(el.getPathValue('nested'), el.nested);
    assert.equal(el.getPathValue('nested.here'), 42);
    assert.equal(el.getPathValue('nested.again'), el.nested.again);
    assert.equal(el.getPathValue('nested.again.there'), 55);
    assert.equal(el.getPathValue('nested.again.again'), el.nested.again.again);
    assert.equal(el.getPathValue('nested.again.again.wayOverThere'), 99);
  });

  test('setPathValue', function() {
    el.setPathValue('simple', 11);
    el.setPathValue('nested', {});
    el.setPathValue('nested.here', 42);
    el.setPathValue('nested.again', {});
    el.setPathValue('nested.again.there', 55);
    el.setPathValue('nested.again.again', {});
    el.setPathValue('nested.again.again.wayOverThere', 99);
    assert.equal(el.simple, 11);
    assert.equal(el.getPathValue('simple'), 11);
    assert.equal(el.getPathValue('nested'), el.nested);
    assert.equal(el.nested.here, 42);
    assert.equal(el.getPathValue('nested.here'), 42);
    assert.equal(el.getPathValue('nested.again'), el.nested.again);
    assert.equal(el.nested.again.there, 55);
    assert.equal(el.getPathValue('nested.again.there'), 55);
    assert.equal(el.getPathValue('nested.again.again'), el.nested.again.again);
    assert.equal(el.nested.again.again.wayOverThere, 99);
    assert.equal(el.getPathValue('nested.again.again.wayOverThere'), 99);
  });

});

