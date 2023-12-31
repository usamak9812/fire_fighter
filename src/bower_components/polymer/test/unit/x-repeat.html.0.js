

    /*
      Expected:

      stamped[0] ... 1
      stamped[1] ... 1-1
      stamped[2] ... 1-1-1
      stamped[3] ... 1-1-2
      stamped[4] ... 1-1-3
      stamped[5] ... 2
      ...
      stamped[13] .. 2
      ...
      stamped[36] .. 3-3-1
      stamped[37] .. 3-3-2
      stamped[38] .. 3-3-3
    */

    suite('nested pre-configured x-repeat', function() {

      test('basic rendering, downward item binding', function() {
        var stamped = Polymer.dom(configured.root).querySelectorAll('*:not(template)');
        assert.equal(stamped.length, 3 + 3*3 + 3*3*3, 'total stamped count incorrect');
        assert.equal(stamped[0].itemProp, 'prop-1');
        assert.equal(stamped[0].$.bar.itemProp, 'prop-1');
        assert.equal(stamped[1].itemProp, 'prop-1-1');
        assert.equal(stamped[1].$.bar.itemProp, 'prop-1-1');
        assert.equal(stamped[2].itemProp, 'prop-1-1-1');
        assert.equal(stamped[2].$.bar.itemProp, 'prop-1-1-1');
        assert.equal(stamped[3].itemProp, 'prop-1-1-2');
        assert.equal(stamped[3].$.bar.itemProp, 'prop-1-1-2');
        assert.equal(stamped[4].itemProp, 'prop-1-1-3');
        assert.equal(stamped[4].$.bar.itemProp, 'prop-1-1-3');
        assert.equal(stamped[13].itemProp, 'prop-2');
        assert.equal(stamped[13].$.bar.itemProp, 'prop-2');
        assert.equal(stamped[36].itemProp, 'prop-3-3-1');
        assert.equal(stamped[36].$.bar.itemProp, 'prop-3-3-1');
        assert.equal(stamped[37].itemProp, 'prop-3-3-2');
        assert.equal(stamped[37].$.bar.itemProp, 'prop-3-3-2');
        assert.equal(stamped[38].itemProp, 'prop-3-3-3');
        assert.equal(stamped[38].$.bar.itemProp, 'prop-3-3-3');
      });

      test('parent scope binding', function() {
        var stamped = Polymer.dom(configured.root).querySelectorAll('*:not(template)');
        assert.equal(stamped[0].parentProp, 'outer');
        assert.equal(stamped[0].parentItemProp, 'outerItem');
        assert.equal(stamped[1].parentItemProp, 'prop-1');
        assert.equal(stamped[1].parentParentProp, 'outer');
        assert.equal(stamped[1].parentParentItemProp, 'outerItem');
        assert.equal(stamped[2].parentItemProp, 'prop-1-1');
        assert.equal(stamped[2].parentParentItemProp, 'prop-1');
        assert.equal(stamped[2].parentParentParentProp, 'outer');
        assert.equal(stamped[2].parentParentParentItemProp, 'outerItem');
        assert.equal(stamped[38].parentItemProp, 'prop-3-3');
        assert.equal(stamped[38].parentParentItemProp, 'prop-3');
        assert.equal(stamped[38].parentParentParentProp, 'outer');
        assert.equal(stamped[38].parentParentParentItemProp, 'outerItem');
      });

      test('parent scope downward notification', function() {
        var stamped = Polymer.dom(configured.root).querySelectorAll('*:not(template)');
        configured.prop = 'yes';
        assert.equal(stamped[0].parentProp, 'yes');
        assert.equal(stamped[1].parentParentProp, 'yes');
        assert.equal(stamped[2].parentParentParentProp, 'yes');
        assert.equal(stamped[38].parentParentParentProp, 'yes');
        configured.setPathValue('item.prop', 'yay');
        assert.equal(stamped[0].parentItemProp, 'yay');
        assert.equal(stamped[1].parentParentItemProp, 'yay');
        assert.equal(stamped[2].parentParentParentItemProp, 'yay');
        assert.equal(stamped[38].parentParentParentItemProp, 'yay');
      });

      test('parent upward upward notification', function() {
        var stamped = Polymer.dom(configured.root).querySelectorAll('*:not(template)');
        stamped[38].parentParentParentProp = 'nice';
        assert.equal(configured.prop, 'nice');
        assert.equal(stamped[0].parentProp, 'nice');
        assert.equal(stamped[1].parentParentProp, 'nice');
        assert.equal(stamped[2].parentParentParentProp, 'nice');
        assert.equal(stamped[37].parentParentParentProp, 'nice');
        stamped[38].parentParentParentItemProp = 'cool';
        assert.equal(configured.item.prop, 'cool');
        assert.equal(stamped[0].parentItemProp, 'cool');
        assert.equal(stamped[1].parentParentItemProp, 'cool');
        assert.equal(stamped[2].parentParentParentItemProp, 'cool');
        assert.equal(stamped[37].parentParentParentItemProp, 'cool');
      });

      test('anonymous scope binding', function() {
        var stamped = Polymer.dom(configured.root).querySelectorAll('*:not(template)');
        stamped[1].$.bar.prop = 'changed';
        assert.equal(stamped[1].prop, 'changed');
        assert.equal(stamped[2].parentProp, 'changed');
        assert.equal(stamped[3].parentProp, 'changed');
        assert.equal(stamped[4].parentProp, 'changed');
      });

    });

    suite('nested un-configured x-repeat in document', function() {

      test('basic rendering, downward item binding', function(done) {
        inDocumentRepeater.items = window.data;
        setTimeout(function() {
          var stamped = Polymer.dom(inDocumentContainer).querySelectorAll('*:not(template)');
          assert.equal(stamped.length, 3 + 3*3 + 3*3*3, 'total stamped count incorrect');
          assert.equal(stamped[0].itemProp, 'prop-1');
          assert.equal(stamped[0].$.bar.itemProp, 'prop-1');
          assert.equal(stamped[1].itemProp, 'prop-1-1');
          assert.equal(stamped[1].$.bar.itemProp, 'prop-1-1');
          assert.equal(stamped[2].itemProp, 'prop-1-1-1');
          assert.equal(stamped[2].$.bar.itemProp, 'prop-1-1-1');
          assert.equal(stamped[3].itemProp, 'prop-1-1-2');
          assert.equal(stamped[3].$.bar.itemProp, 'prop-1-1-2');
          assert.equal(stamped[4].itemProp, 'prop-1-1-3');
          assert.equal(stamped[4].$.bar.itemProp, 'prop-1-1-3');
          assert.equal(stamped[13].itemProp, 'prop-2');
          assert.equal(stamped[13].$.bar.itemProp, 'prop-2');
          assert.equal(stamped[36].itemProp, 'prop-3-3-1');
          assert.equal(stamped[36].$.bar.itemProp, 'prop-3-3-1');
          assert.equal(stamped[37].itemProp, 'prop-3-3-2');
          assert.equal(stamped[37].$.bar.itemProp, 'prop-3-3-2');
          assert.equal(stamped[38].itemProp, 'prop-3-3-3');
          assert.equal(stamped[38].$.bar.itemProp, 'prop-3-3-3');
          done();
        });
      });

      test('parent scope binding', function() {
        var stamped = Polymer.dom(inDocumentContainer).querySelectorAll('*:not(template)');
        assert.equal(stamped[1].parentItemProp, 'prop-1');
        assert.equal(stamped[2].parentItemProp, 'prop-1-1');
        assert.equal(stamped[2].parentParentItemProp, 'prop-1');
        assert.equal(stamped[38].parentItemProp, 'prop-3-3');
        assert.equal(stamped[38].parentParentItemProp, 'prop-3');
      });

      test('anonymous scope binding', function() {
        var stamped = Polymer.dom(inDocumentContainer).querySelectorAll('*:not(template)');
        stamped[1].$.bar.prop = 'changed';
        assert.equal(stamped[1].prop, 'changed');
        assert.equal(stamped[2].parentProp, 'changed');
        assert.equal(stamped[3].parentProp, 'changed');
        assert.equal(stamped[4].parentProp, 'changed');
      });

    });

    suite('nested un-configured x-repeat', function() {

      test('basic rendering, downward item binding', function(done) {
        unconfigured.items = window.data;
        setTimeout(function() {
          var stamped = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
          assert.equal(stamped.length, 3 + 3*3 + 3*3*3, 'total stamped count incorrect');
          assert.equal(stamped[0].itemProp, 'prop-1');
          assert.equal(stamped[0].$.bar.itemProp, 'prop-1');
          assert.equal(stamped[1].itemProp, 'prop-1-1');
          assert.equal(stamped[1].$.bar.itemProp, 'prop-1-1');
          assert.equal(stamped[2].itemProp, 'prop-1-1-1');
          assert.equal(stamped[2].$.bar.itemProp, 'prop-1-1-1');
          assert.equal(stamped[3].itemProp, 'prop-1-1-2');
          assert.equal(stamped[3].$.bar.itemProp, 'prop-1-1-2');
          assert.equal(stamped[4].itemProp, 'prop-1-1-3');
          assert.equal(stamped[4].$.bar.itemProp, 'prop-1-1-3');
          assert.equal(stamped[13].itemProp, 'prop-2');
          assert.equal(stamped[13].$.bar.itemProp, 'prop-2');
          assert.equal(stamped[36].itemProp, 'prop-3-3-1');
          assert.equal(stamped[36].$.bar.itemProp, 'prop-3-3-1');
          assert.equal(stamped[37].itemProp, 'prop-3-3-2');
          assert.equal(stamped[37].$.bar.itemProp, 'prop-3-3-2');
          assert.equal(stamped[38].itemProp, 'prop-3-3-3');
          assert.equal(stamped[38].$.bar.itemProp, 'prop-3-3-3');
          done();
        });
      });

      test('parent scope binding', function() {
        var stamped = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        unconfigured1.prop = 'outer';
        unconfigured1.item = {prop: 'outerItem'}
        assert.equal(stamped[0].parentProp, 'outer');
        assert.equal(stamped[0].parentItemProp, 'outerItem');
        assert.equal(stamped[1].parentItemProp, 'prop-1');
        assert.equal(stamped[1].parentParentProp, 'outer');
        assert.equal(stamped[1].parentParentItemProp, 'outerItem');
        assert.equal(stamped[2].parentItemProp, 'prop-1-1');
        assert.equal(stamped[2].parentParentItemProp, 'prop-1');
        assert.equal(stamped[2].parentParentParentProp, 'outer');
        assert.equal(stamped[2].parentParentParentItemProp, 'outerItem');
        assert.equal(stamped[38].parentItemProp, 'prop-3-3');
        assert.equal(stamped[38].parentParentItemProp, 'prop-3');
        assert.equal(stamped[38].parentParentParentProp, 'outer');
        assert.equal(stamped[38].parentParentParentItemProp, 'outerItem');
      });

      test('parent scope downward notification', function() {
        var stamped = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        unconfigured1.prop = 'yes';
        assert.equal(stamped[0].parentProp, 'yes');
        assert.equal(stamped[1].parentParentProp, 'yes');
        assert.equal(stamped[2].parentParentParentProp, 'yes');
        assert.equal(stamped[38].parentParentParentProp, 'yes');
        unconfigured1.setPathValue('item.prop', 'yay');
        assert.equal(stamped[0].parentItemProp, 'yay');
        assert.equal(stamped[1].parentParentItemProp, 'yay');
        assert.equal(stamped[2].parentParentParentItemProp, 'yay');
        assert.equal(stamped[38].parentParentParentItemProp, 'yay');
      });

      test('parent upward upward notification', function() {
        var stamped = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        stamped[38].parentParentParentProp = 'nice';
        assert.equal(unconfigured1.prop, 'nice');
        assert.equal(stamped[0].parentProp, 'nice');
        assert.equal(stamped[1].parentParentProp, 'nice');
        assert.equal(stamped[2].parentParentParentProp, 'nice');
        assert.equal(stamped[37].parentParentParentProp, 'nice');
        stamped[38].parentParentParentItemProp = 'cool';
        assert.equal(unconfigured1.item.prop, 'cool');
        assert.equal(stamped[0].parentItemProp, 'cool');
        assert.equal(stamped[1].parentParentItemProp, 'cool');
        assert.equal(stamped[2].parentParentParentItemProp, 'cool');
        assert.equal(stamped[37].parentParentParentItemProp, 'cool');
      });

      test('anonymous scope binding', function() {
        var stamped = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        stamped[1].$.bar.prop = 'changed';
        assert.equal(stamped[1].prop, 'changed');
        assert.equal(stamped[2].parentProp, 'changed');
        assert.equal(stamped[3].parentProp, 'changed');
        assert.equal(stamped[4].parentProp, 'changed');
      });

      test('event handlers', function() {
        var stamped = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        stamped[0].fire('test1');
        assert.equal(unconfigured1.testHandler1Count, 1);
        stamped[1].fire('test2');
        assert.equal(unconfigured1.testHandler2Count, 1);
        stamped[2].fire('test3');
        assert.equal(unconfigured1.testHandler3Count, 1);
      });

    });

    suite('array notification between two x-repeats', function() {

      test('change to item from one x-repeat to other', function() {
        var stamped1 = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        var stamped2 = Polymer.dom(unconfigured2.root).querySelectorAll('*:not(template)');

        assert.equal(stamped1[0].itemProp, 'prop-1');
        assert.equal(stamped2[0].itemProp, 'prop-1');
        stamped1[0].$.bar.itemProp = 'changed';
        assert.equal(stamped2[0].itemProp, 'changed');
        stamped2[0].$.bar.itemProp = 'back';
        assert.equal(stamped1[0].itemProp, 'back');

        assert.equal(stamped1[1].itemProp, 'prop-1-1');
        assert.equal(stamped2[1].itemProp, 'prop-1-1');
        stamped1[1].$.bar.itemProp = 'changed';
        assert.equal(stamped2[1].itemProp, 'changed');
        stamped2[1].$.bar.itemProp = 'back';
        assert.equal(stamped1[1].itemProp, 'back');

        assert.equal(stamped1[2].itemProp, 'prop-1-1-1');
        assert.equal(stamped2[2].itemProp, 'prop-1-1-1');
        stamped1[2].$.bar.itemProp = 'changed';
        assert.equal(stamped2[2].itemProp, 'changed');
        stamped2[2].$.bar.itemProp = 'back';
        assert.equal(stamped1[2].itemProp, 'back');

        assert.equal(stamped1[38].itemProp, 'prop-3-3-3');
        assert.equal(stamped2[38].itemProp, 'prop-3-3-3');
        stamped1[38].$.bar.itemProp = 'changed';
        assert.equal(stamped2[38].itemProp, 'changed');
        stamped2[38].$.bar.itemProp = 'back';
        assert.equal(stamped1[38].itemProp, 'back');
      });

      test('change to non-item scope doesn\'t affect other x-repeat', function() {
        var stamped1 = Polymer.dom(unconfigured1.root).querySelectorAll('*:not(template)');
        var stamped2 = Polymer.dom(unconfigured2.root).querySelectorAll('*:not(template)');

        unconfigured1.prop = 'foo';
        unconfigured2.prop = 'bar';
        assert.equal(stamped1[0].parentProp, 'foo');
        assert.equal(stamped1[1].parentParentProp, 'foo');
        assert.equal(stamped1[2].parentParentParentProp, 'foo');
        assert.equal(stamped2[0].parentProp, 'bar');
        assert.equal(stamped2[1].parentParentProp, 'bar');
        assert.equal(stamped2[2].parentParentParentProp, 'bar');

        stamped1[1].$.bar.prop = 'bar';
      });

    });

  