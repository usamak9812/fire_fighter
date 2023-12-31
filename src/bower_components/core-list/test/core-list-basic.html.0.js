
  test('core-list-basic', function(done) {
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
    // Helper to assert top item is rendered as expected
    var checkTopItem = function(positionDescription) {
      // Measure from top-right (to avoid template children)
      var item = document.elementFromPoint(list.clientWidth-50, 0);
      chai.assert(item && 
        item.templateInstance && 
        item.templateInstance.model && 
        item.templateInstance.model.index == index,
          'top item index should be ' + index + ' ' + positionDescription);
      chai.assert(item.templateInstance.model.model == list.data[index],
          'top item model should be data[' + index + ']  ' + positionDescription);
      chai.assert(item.querySelector('#index').textContent == index,
          'top item index content should be ' + index + ' ' + positionDescription);
      chai.assert(item.querySelector('#id').textContent == list.data[index].id,
          'top item id content should be ' + list.data[index].id + ' ' + positionDescription);
      chai.assert(item.querySelector('#checkbox').checked == list.data[index].checked,
          'top item checkbox should be ' + list.data[index].checked + ' ' + positionDescription);
      chai.assert(item.querySelector('#input').value == list.data[index].value,
          'top item input should be ' + list.data[index].value + ' ' + positionDescription);
      chai.assert(item.querySelector('#select').selectedIndex == list.data[index].type,
          'top item select should be ' + list.data[index].type + ' ' + positionDescription);
    };
    var scrollItemsAndCheck = function(count, next) {
      index += count;
      list.scrollTop += count * height;
      waitFor(function() {
        checkTopItem('when scrolled to item ' + index);
      }, next);
    };
    async.series([
      // Initialize list with two items
      function(next) {
        list.data = [
          generateItem(),
          generateItem()
        ];
        waitFor(function() {
          chai.assert(list.children.length == 3, // (+1 for template)
            'children.length should be 3 (1 template + count of data elements');
          checkTopItem('after initialization');
        }, next);
      },
      // Select first item
      function(next) {
        waitFor(function() {
          var item = document.elementFromPoint(list.clientWidth-50, 0);
          chai.assert(item, 'item should exist at top of list');
          item.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        }, next);
      },
      function(next) {
        waitFor(function() {
          chai.assert(list.selection && list.selection.id == list.data[0].id, 
            'first item should be selected; selected id was ' + list.selection && list.selection.id);
        }, next);
      },
      // Select second item
      function(next) {
        var item = document.elementFromPoint(list.clientWidth-50, height);
        item.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection && list.selection.id == list.data[1].id, 
            'second item should be selected; selection ' + list.selection && list.selection.id);
        }, next);
      },
      // Enable multiple-selection, and select the first item (for total of 2 selected)
      function(next) {
        list.multi = true;
        var item = document.elementFromPoint(list.clientWidth-50, 0);
        item.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection && list.selection.length == 2, 
            'selection length should be 2');
          // Note, selection is maintained in order, so last item selected is last in selection
          chai.assert(list.selection[0].id == list.data[1].id && list.selection[1].id == list.data[0].id, 
            'first and second items should be selected; selected ids: ' +  
            list.selection[0].id + ', ' + list.selection[1].id);
        }, next);
      },
      // Delete one item
      function(next) {
        list.data.length = 1;
        waitFor(function() {
          chai.assert(list.children.length == 3,
            'children.length should stay 3 (1 template, plus 2 originally created items)');
          chai.assert(list.children[2].getAttribute('hidden') !== null, 
            'last element should be hidden');
          chai.assert(list.selection.length == 1, 
            'selection length should be 1');
          chai.assert(list.selection[0].id == list.data[0].id, 
            'first element should be selected');
        }, next);
      },
      // Deselect first item
      function(next) {
        var item = document.elementFromPoint(list.clientWidth-50, 0);
        item.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection.length === 0, 
            'selection length should be 0');
        }, next);
      },
      // Add many more than viewport
      function(next) {
        var more = physicalCount * 20;
        while (more--) {
          list.data.push(generateItem());
        }
        waitFor(function() {
          chai.assert(list.children.length > physicalCount + 1, // (+1 for template)
            'children.length should be ' + physicalCount + ' (1 template + max number of elements');
        }, next);
      },
      function(next) {
        // Scroll down
        scrollItemsAndCheck(physicalCount, function() {
          scrollItemsAndCheck(physicalCount, function() {
            scrollItemsAndCheck(physicalCount, function() {
              scrollItemsAndCheck(physicalCount, function() {
                scrollItemsAndCheck(physicalCount, function() {
                  scrollItemsAndCheck(physicalCount, function() {
                    scrollItemsAndCheck(physicalCount, function() {
                      scrollItemsAndCheck(physicalCount, function() {
                        scrollItemsAndCheck(physicalCount, function() {
                          scrollItemsAndCheck(physicalCount, function() {
                            scrollItemsAndCheck(physicalCount, function() {
                              scrollItemsAndCheck(physicalCount, function() {
                                next();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      },
      function(next) {
        // Scroll back up
        scrollItemsAndCheck(-physicalCount, function() {
          scrollItemsAndCheck(-physicalCount, function() {
            scrollItemsAndCheck(-physicalCount, function() {
              scrollItemsAndCheck(-physicalCount, function() {
                scrollItemsAndCheck(-physicalCount, function() {
                  scrollItemsAndCheck(-physicalCount, function() {
                    scrollItemsAndCheck(-physicalCount, function() {
                      scrollItemsAndCheck(-physicalCount, function() {
                        scrollItemsAndCheck(-physicalCount, function() {
                          scrollItemsAndCheck(-physicalCount, function() {
                            scrollItemsAndCheck(-physicalCount, function() {
                              scrollItemsAndCheck(-physicalCount, function() {
                                next();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      },
      // Scroll all the way to bottom
      function(next) {
        list.scrollTop = 99999999;
        index = list.data.length - Math.ceil(list.offsetHeight / height);
        waitFor(function() {
          checkTopItem('at bottom of list');
        }, next);
      },
      // Select item
      function(next) {
        var item = document.elementFromPoint(list.clientWidth-50, 0);
        item.dispatchEvent(new MouseEvent('tap', {'view': window, 'bubbles': true}));
        waitFor(function() {
          chai.assert(list.selection.length === 1, 
            'selection length should be 1');
          chai.assert(list.selection[0].id == list.data[index].id, 
            'top item at bottom of list (index ' + index + ') should be selected');
        }, next);
      },
      // Delete one item from bottom
      function(next) {
        list.data.length = list.data.length - 1;
        var lastIndex = index;
        index = list.data.length - Math.ceil(list.offsetHeight / height);
        waitFor(function() {
          checkTopItem('at bottom of list after deleting one item from end of list');
          chai.assert(list.selection.length === 1, 
            'selection length should be 1');
          chai.assert(list.selection[0].id == list.data[lastIndex].id, 
            'previously selected item (index ' + lastIndex + ') should stay selected');
        }, next);
      },
      // Delete from bottom
      function(next) {
        list.data.length = list.data.length - Math.floor(list.data.length/2);
        var lastIndex = index;
        index = list.data.length - Math.ceil(list.offsetHeight / height);
        waitFor(function() {
          checkTopItem('at bottom of list after deleting half of items items from end of list');
          chai.assert(list.selection.length === 0, 
            'selection length should be 0');
        }, next);
      },
      // Delete from top
      function(next) {
        list.data.splice(0, Math.floor(list.data.length/2));
        index = list.data.length - Math.ceil(list.offsetHeight / height);
        waitFor(function() {
          checkTopItem('at bottom of list after deleting half of items items from top of list');
        }, next, 32);
      },
      // Delete from top
      function(next) {
        list.data.splice(0, Math.floor(list.data.length/2));
        index = list.data.length - Math.ceil(list.offsetHeight / height);
        waitFor(function() {
          checkTopItem('at bottom of list after deleting half of items items from top of list (again)');
        }, next);
      },
      // Webdriver-based: Tap on first item
      // function(next) {
      //   requiresWebdriver(function() {
      //
      //     // Method 1: click element directly by reference
      //     var item = document.elementFromPoint(list.clientWidth-50, 0);
      //     webdriverCommand(['clickElement', item], function(err) {
      //       waitFor(function() {
      //         chai.assert(list.selection && list.selection.id == list.data[0].id, 
      //           'first item should be selected; selection was ' + (list.selection && list.selection.id));
      //       }, next);
      //     }, next);
      //
      //     // Method 2: move mouse, then click mouse
      //     webdriverCommand(['moveTo', null, list.offsetWidth-50, 0], function(err) {
      //       webdriverCommand(['click', 0], function(err) {
      //         waitFor(function() {
      //           chai.assert(list.selection && list.selection.id == list.data[0].id, 
      //             'first item should be selected; selection was ' + (list.selection && list.selection.id));
      //         }, next);
      //       }, next);
      //     }, next);
      //   }, function(){});
      //
      // },
    ], done);
  });

