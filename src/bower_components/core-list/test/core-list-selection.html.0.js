
  test('core-list-selection', function(done) {
    // Initial setup
    var list = document.querySelector('core-list');
    var height = 80;
    var physicalCount = Math.ceil(list.offsetHeight  / height);
    var index = 0;
    var item;
    // Helper to create random items
    var generateItem = function() {
      return {
        id: Math.floor(Math.random()*10000),
        checked: !!Math.floor(Math.random()*2),
        value: Math.floor(Math.random()*10000),
        type: Math.floor(Math.random()*3)
      };
    };
    async.series([
      // Add many more than viewport
      function(next) {
        var more = physicalCount * 20;
        list.data = [];
        while (more--) {
          list.data.push(generateItem());
        }
        waitFor(function() {
          chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
            'children.length should be > ' + physicalCount + ' (1 template + max number of elements');
        }, next);
      },
      // Select first item via tap
      function(next) {
        waitFor(function() {
          item = document.elementFromPoint(list.clientWidth-50, 0 * height);
          chai.assert(!!item, 'item should exist at top of list');
          item.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        }, next);
      },
      function(next) {
        waitFor(function() {
          chai.assert(list.selection && list.selection == list.data[0], 
            'first item should be selected; selected id was ' + list.selection && list.selection.id);
          chai.assert(item.classList.contains('selected'), 
            'first item should have selected class');
        }, next);
      },
      // Select third item via tap
      function(next) {
        var firstItem = document.elementFromPoint(list.clientWidth-50, 0 * height);
        var thirdItem = document.elementFromPoint(list.clientWidth-50, 2 * height);
        thirdItem.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection && list.selection == list.data[2], 
            'third item should be selected; selected id was ' + list.selection && list.selection.id);
          chai.assert(!firstItem.classList.contains('selected'), 
            'first item should not have selected class');
          chai.assert(thirdItem.classList.contains('selected'), 
            'third item should have selected class');
        }, next);
      },
      // Select first item via tap
      function(next) {
        var firstItem = document.elementFromPoint(list.clientWidth-50, 0 * height);
        var thirdItem = document.elementFromPoint(list.clientWidth-50, 2 * height);
        firstItem.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection && list.selection == list.data[0], 
            'first item should be selected; selected id was ' + list.selection && list.selection.id);
          chai.assert(firstItem.classList.contains('selected'), 
            'first item should have selected class');
          chai.assert(!thirdItem.classList.contains('selected'), 
            'third item should not have selected class');
        }, next);
      },
      // Add item above selection
      function(next) {
        list.data.splice(0, 0, generateItem());
        waitFor(function() {
          chai.assert(list.selection && list.selection == list.data[1], 
            'second item should be selected; selected id was ' + list.selection && list.selection.id);
        }, next);
      },
      // Add item below selection
      function(next) {
        list.data.splice(2, 0, generateItem());
        waitFor(function() {
          chai.assert(list.selection && list.selection == list.data[1], 
            'second item should be selected; selected id was ' + list.selection && list.selection.id);
        }, next);
      },
      // Enable multiple-selection, ensure existing selection maintained
      function(next) {
        list.multi = true;
        waitFor(function() {
          chai.assert(list.selection.length == 1, 
            'selection length should be 1');
          chai.assert(list.selection && list.selection[0] == list.data[1], 
            'second item should be selected; selected id was ' + list.selection && list.selection.id);
        }, next);
      },
      // Select first and third items (in addition to 2nd item)
      function(next) {
        var firstItem = document.elementFromPoint(list.clientWidth-50, 0 * height);
        var secondItem = document.elementFromPoint(list.clientWidth-50, 1 * height);
        var thirdItem = document.elementFromPoint(list.clientWidth-50, 2 * height);
        firstItem.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        thirdItem.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection.length == 3, 
            'selection length should be 3');
          chai.assert(list.selection && list.selection[0] == list.data[1], 
            'second item should be selected; selected id was ' + list.selection[0] && list.selection[0].id);
          chai.assert(list.selection && list.selection[1] == list.data[0], 
            'first item should be selected; selected id was ' + list.selection[1] && list.selection[1].id);
          chai.assert(list.selection && list.selection[2] == list.data[2], 
            'third item should be selected; selected id was ' + list.selection[2] && list.selection[2].id);
          chai.assert(firstItem.classList.contains('selected'), 
            'first item should have selected class');
          chai.assert(secondItem.classList.contains('selected'), 
            'second item should have selected class');
          chai.assert(thirdItem.classList.contains('selected'), 
            'third item should have selected class');
        }, next);
      },
      // Disable multi-selection, ensure selection is reset
      function(next) {
        list.multi = false;
        var firstItem = document.elementFromPoint(list.clientWidth-50, 0 * height);
        var secondItem = document.elementFromPoint(list.clientWidth-50, 1 * height);
        var thirdItem = document.elementFromPoint(list.clientWidth-50, 2 * height);
        waitFor(function() {
          chai.assert(!list.selection, 
            'selection length should be 3');
          chai.assert(!firstItem.classList.contains('selected'), 
            'first item should not have selected class');
          chai.assert(!secondItem.classList.contains('selected'), 
            'second item should not have selected class');
          chai.assert(!thirdItem.classList.contains('selected'), 
            'third item should not have selected class');
        }, next);
      },
      // Select item 1 programmatically
      function(next) {
        list.selectItem(1);
        item = document.elementFromPoint(list.clientWidth-50, 1 * height);
        waitFor(function() {
          chai.assert(list.selection && list.selection == list.data[1],
            'second item should be selected; selected id was ' + (list.selection && list.selection.id));
          chai.assert(item.classList.contains('selected'), 
            'second item should have selected class');
        }, next);
      },
      // Re-enable multi-selection, select first and third programmatically
      function(next) {
        list.multi = true;
        list.selectItem(0);
        list.selectItem(2);
        var firstItem = document.elementFromPoint(list.clientWidth-50, 0 * height);
        var secondItem = document.elementFromPoint(list.clientWidth-50, 1 * height);
        var thirdItem = document.elementFromPoint(list.clientWidth-50, 2 * height);
        waitFor(function() {
          chai.assert(list.selection.length == 3, 
            'selection length should be 3');
          chai.assert(list.selection && list.selection[0] == list.data[1], 
            'second item should be selected; selected id was ' + list.selection[0] && list.selection[0].id);
          chai.assert(list.selection && list.selection[1] == list.data[0], 
            'first item should be selected; selected id was ' + list.selection[1] && list.selection[1].id);
          chai.assert(list.selection && list.selection[2] == list.data[2], 
            'third item should be selected; selected id was ' + list.selection[2] && list.selection[2].id);
          chai.assert(firstItem.classList.contains('selected'), 
            'first item should have selected class');
          chai.assert(secondItem.classList.contains('selected'), 
            'second item should have selected class');
          chai.assert(thirdItem.classList.contains('selected'), 
            'third item should have selected class');
        }, next);
      },
      function(next) {
        list.clearSelection();
        chai.assert(list.selection.length === 0, 
          'selection length should be 0 after calling clearSelection when multi:true');
        list.multi = false;
        list.selectItem(0);
        list.clearSelection();
        chai.assert(!list.selection, 
          'selection should be null after calling clearSelection when multi:false');
        next();
      }
    ], done);
  });

