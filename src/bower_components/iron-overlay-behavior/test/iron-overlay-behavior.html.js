function runAfterOpen(overlay, cb) {
        overlay.addEventListener('iron-overlay-opened', function() {
          Polymer.Base.async(cb, 1);
        });
        overlay.open();
      }

      suite('basic overlay tests', function() {
        var overlay;

        setup(function() {
          overlay = fixture('basic');
        });

        test('overlay starts hidden', function() {
          assert.isFalse(overlay.opened, 'overlay starts closed');
          assert.equal(getComputedStyle(overlay).display, 'none', 'overlay starts hidden');
        });

        test('overlay open by default', function(done) {
          overlay = fixture('opened');
          overlay.addEventListener('iron-overlay-opened', function() {
            assert.isTrue(overlay.opened, 'overlay starts opened');
            assert.notEqual(getComputedStyle(overlay).display, 'none', 'overlay starts showing');
            done();
          });
        });

        test('overlay positioned & sized properly', function(done) {
          overlay = fixture('opened');
          overlay.addEventListener('iron-overlay-opened', function() {
            var s = getComputedStyle(overlay);
            assert.isTrue(parseFloat(s.left) === (window.innerWidth - overlay.offsetWidth)/2, 'centered horizontally');
            assert.isTrue(parseFloat(s.top) === (window.innerHeight - overlay.offsetHeight)/2, 'centered vertically');
            done();
          });
        });

        test('overlay open/close events', function(done) {
          var nevents = 0;

          overlay.addEventListener('iron-overlay-opened', function() {
            nevents += 1;
            overlay.opened = false;
          });

          overlay.addEventListener('iron-overlay-closed', function() {
            nevents += 1;
            assert.equal(nevents, 2, 'opened and closed events fired');
            done();
          });

          overlay.opened = true;
        });

        test('close an overlay quickly after open', function(done) {
          // first, open the overlay
          overlay.open();
          overlay.async(function() {
            // during the opening transition, close the overlay
            this.close();
            // wait for any exceptions to be thrown until the transition is done
            this.async(function() {
              done();
            }, 300);
          });
        });

        test('close an overlay in proximity to another overlay', function(done) {
          var secondOverlay = fixture('basic');
          // Open and close a separate overlay.
          secondOverlay.open();
          secondOverlay.close();

          // Open the overlay we care about.
          overlay.open();

          // Wait for infinite recursion, otherwise we win:
          overlay.addEventListener('iron-overlay-closed', function() {
            done();
          });

          // Immediately close the first overlay:
          overlay.close();
        });

        test('clicking an overlay does not close it', function(done) {
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-closed', function() {
              assert('iron-overlay-closed should not fire');
            });
            overlay.fire('click');
            setTimeout(function() {
              done();
            }, 10);
          });
        });

        test('node with autofocus is focused', function(done) {
          overlay = fixture('autofocus');
          runAfterOpen(overlay, function() {
            assert.equal(Polymer.dom(overlay).querySelector('[autofocus]'), document.activeElement, '<button autofocus> is focused');
            done();
          });
        });

        test('cancel an overlay by clicking outside', function(done) {
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-canceled', function(event) {
              done();
            });
            MockInteractions.tap(document.body);
          });
        });

        test('close an overlay by clicking outside', function(done) {
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-closed', function(event) {
              assert.isTrue(event.detail.canceled, 'overlay is canceled');
              done();
            });
            MockInteractions.tap(document.body);
          });
        });

        test('cancel event can be prevented', function(done) {
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-canceled', function(event) {
              event.preventDefault();
            });
            var closedListener = function(event) {
              throw new Error('iron-overlay-closed should not fire');
            };
            overlay.addEventListener('iron-overlay-closed', closedListener);
            MockInteractions.tap(document.body);
            setTimeout(function() {
              overlay.removeEventListener('iron-overlay-closed', closedListener);
              done();
            }, 10);
          });
        });

        test('cancel an overlay with esc key', function(done) {
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-canceled', function(event) {
              done();
            });
            fireEvent('keydown', {
              keyCode: 27
            }, document);
          });
        });

        test('close an overlay with esc key', function(done) {
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-closed', function(event) {
              assert.isTrue(event.detail.canceled, 'overlay is canceled');
              done();
            });
            fireEvent('keydown', {
              keyCode: 27
            }, document);
          });
        });

        test('no-cancel-on-outside-click property', function(done) {
          overlay.noCancelOnOutsideClick = true;
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-closed', function() {
              assert('iron-overlay-closed should not fire');
            });
            MockInteractions.tap(document.body);
            setTimeout(function() {
              done();
            }, 10);
          });
        });

        test('no-cancel-on-esc-key property', function(done) {
          overlay.noCancelOnEscKey = true;
          runAfterOpen(overlay, function() {
            overlay.addEventListener('iron-overlay-closed', function() {
              assert('iron-overlay-cancel should not fire');
            });
            fireEvent('keydown', {
              keyCode: 27
            }, document);
            setTimeout(function() {
              done();
            }, 10);
          });
        });

      });

      suite('multiple overlays', function() {
        var overlays;

        setup(function() {
          overlays = fixture('multiple');
        });

        test('new overlays appear on top', function(done) {
          runAfterOpen(overlays[0], function() {
            runAfterOpen(overlays[1], function() {
              var styleZ = parseInt(window.getComputedStyle(overlays[0]).zIndex, 10);
              var styleZ1 = parseInt(window.getComputedStyle(overlays[1]).zIndex, 10);
              assert.isTrue(styleZ1 > styleZ, 'overlays[1] has higher z-index than overlays[0]');
              done();
            });
          });
        });

        test('ESC closes only one opened overlay', function(done) {
          runAfterOpen(overlays[0], function() {
            runAfterOpen(overlays[1], function() {
              // keydown is sync, keyup async (but no need to wait for it).
              MockInteractions.pressAndReleaseKeyOn(document.body, 27);
              // Ideally overlays[1] should be closed and overlays[0] still open,
              // but in this test env overlays[0]._onCaptureKeydown gets called before
              // overlays[1]._onCaptureKeydown.
              // TODO investigate if this is because of CustomEvents in MockInteractions.
              var opened0 = overlays[0].opened && !overlays[1].opened;
              var opened1 = !overlays[0].opened && overlays[1].opened;
              assert.isTrue(opened0 || opened1, 'only one overlay is still opened');
              done();
            });
          });
        });
      });

      suite('z-ordering', function() {

        var overlays;
        var originalMinimumZ;

        setup(function() {
          overlays = fixture('multiple');
          originalMinimumZ = Polymer.IronOverlayManager._minimumZ;
        });

        teardown(function() {
          Polymer.IronOverlayManager._minimumZ = originalMinimumZ;
        });

        // for iframes
        test('default z-index is greater than 100', function(done) {
          runAfterOpen(overlays[0], function() {
            var styleZ = parseInt(window.getComputedStyle(overlays[0]).zIndex, 10);
            assert.isTrue(styleZ > 100, 'overlays[0] z-index is <= 100');
            done();
          });
        });

        test('ensureMinimumZ() effects z-index', function(done) {
          Polymer.IronOverlayManager.ensureMinimumZ(1000);

          runAfterOpen(overlays[0], function() {
            var styleZ = parseInt(window.getComputedStyle(overlays[0]).zIndex, 10);
            assert.isTrue(styleZ > 1000, 'overlays[0] z-index is <= 1000');
            done();
          });
        });

        test('ensureMinimumZ() never decreases the minimum z-index', function(done) {
          Polymer.IronOverlayManager.ensureMinimumZ(1000);
          Polymer.IronOverlayManager.ensureMinimumZ(500);

          runAfterOpen(overlays[0], function() {
            var styleZ = parseInt(window.getComputedStyle(overlays[0]).zIndex, 10);
            assert.isTrue(styleZ > 1000, 'overlays[0] z-index is <= 1000');
            done();
          });
        });

      });

      suite('overlays with backdrop', function() {
        var overlays;

        setup(function() {
          overlays = fixture('backdrop-multiple');
        });

        test('backdrop appears behind the overlay', function(done) {
          runAfterOpen(overlays[0], function() {
            assert.isDefined(overlays[0].backdropElement, 'backdrop is defined');
            assert.isDefined(overlays[0].backdropElement.parentNode, 'backdrop is inserted in the DOM');

            styleZ = parseInt(window.getComputedStyle(overlays[0]).zIndex, 10);
            backdropStyleZ = parseInt(window.getComputedStyle(overlays[0].backdropElement).zIndex, 10);
            assert.isTrue(styleZ > backdropStyleZ, 'overlay has higher z-index than backdrop');
            done();
          });
        });

        test('backdrop is removed when the element is removed from DOM', function(done) {
          runAfterOpen(overlays[0], function() {
            var backdrop = overlays[0].backdropElement;
            Polymer.dom(backdrop.parentNode).removeChild(backdrop);
            Polymer.dom.flush();
            assert.isNull(backdrop.parentNode, 'backdrop is removed from DOM');
            done();
          });
        });

        test('backdrop is opened when iron-overlay-open-completed fires', function(done) {
          runAfterOpen(overlays[0], function() {
            assert.isTrue(overlays[0].backdropElement.opened, 'backdrop is opened');
            done();
          });
        });
      });

      suite('multiple overlays with backdrop', function() {
        var overlays;

        setup(function() {
          overlays = fixture('backdrop-multiple');
        });

        test('multiple overlays share the same backdrop', function() {
          assert.isTrue(overlays[0].backdropElement === overlays[1].backdropElement, 'overlays[0] has the same backdrop element as overlays[1]');
        });

        test('newest overlay appear on top', function(done) {
          runAfterOpen(overlays[0], function() {
            runAfterOpen(overlays[1], function() {
              var styleZ = parseInt(window.getComputedStyle(overlays[0]).zIndex, 10);
              var style1Z = parseInt(window.getComputedStyle(overlays[1]).zIndex, 10);
              var bgStyleZ = parseInt(window.getComputedStyle(overlays[0].backdropElement).zIndex, 10);
              assert.isTrue(style1Z > styleZ, 'overlays[1] has higher z-index than overlays[0]');
              assert.isTrue(styleZ > bgStyleZ, 'overlays[0] has higher z-index than backdrop');
              done();
            });
          });
        });

      });

      suite('a11y', function() {

        test('overlay has aria-hidden=true when opened', function() {
          var overlay = fixture('basic');
          assert.equal(overlay.getAttribute('aria-hidden'), 'true', 'overlay has aria-hidden="true"');
          overlay.open();
          assert.isFalse(overlay.hasAttribute('aria-hidden'), 'overlay does not have aria-hidden attribute');
          overlay.close();
          assert.equal(overlay.getAttribute('aria-hidden'), 'true', 'overlay has aria-hidden="true"');
        });

      });