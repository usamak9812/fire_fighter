
  suite('core-ajax', function() {
    var xhr, requests, ajax;
    suiteSetup(function() {
      xhr = sinon.useFakeXMLHttpRequest();
      ajax = document.querySelector("core-ajax");
      xhr.onCreate = function (xhr) {
        requests.push(xhr);
      };
      // Reset the core-ajax element before each test.
      ajax.auto = false;
      ajax.url = '';
      ajax.params = '';
      ajax.handleAs = 'text';
      ajax.body = '';
    });
    setup(function() {
      requests = [];
    });
    suite('handleAs', function() {
      suite('text', function(){
        var headers = {
          "Content-Type": "text/plain"
        };
        setup(function(done){
          async.series([
            function(cb){
              ajax.handleAs = 'text';
              ajax.url = "http://example.com/text"
              ajax.auto = true;
              cb();
            },
            animationFrameFlush,
            function(cb){
              requests[0].respond(200, headers, "test text");
              cb();
            }
            ], done);
        });
        test('Raw text should pass through', function(){
          assert.equal(ajax.response, "test text")
        });
      });
      suite('xml', function(){
        var headers = {
          "Content-Type": "text/xml"
        };
        setup(function(done){
          async.series([
            function(cb){
              ajax.handleAs = 'xml';
              ajax.url = "http://example.com/xml"
              ajax.auto = true;
              cb();
            },
            animationFrameFlush,
            function(cb){
              requests[0].respond(200, headers,
                          "<note>" +
                          "<to>AJ</to>" +
                          "<from>Dog</from>" +
                          "<subject>Reminder</subject>" +
                          "<body><q>Feed me!</q></body>" +
                          "</note>");
              cb();
            }
            ], done);
        });
        test('XML should be returned with queryable structure', function(){
          var q = ajax.response.querySelector("note body q");
          assert.equal(q.childNodes[0].textContent, "Feed me!");
          var to = ajax.response.querySelector("to");
          assert.equal(to.childNodes[0].textContent, "AJ");
        })});
      suite('json', function(){
        var headers = {
          "Content-Type": "text/json"
        };
        setup(function(done){
          async.series([
            function(cb){
              ajax.handleAs = 'json';
              ajax.url = "http://example.com/json"
              ajax.auto = true;
              cb();
            },
            animationFrameFlush,
            function(cb){
              requests[0].respond(200, headers,
                          '{"object" : {"list" : [2, 3, {"key": "value"}]}}');
              cb();
            }
            ], done);
        });
        test('JSON should be returned as an Object', function(){
          var r = ajax.response;
          assert.equal(r.object.list[1], 3);
          assert.equal(r.object.list[2].key, "value");
        });
      });
      suite('arraybuffer', function(){
        var headers = {
          "Content-Type": "text/plain"
        };
        setup(function(done){
          async.series([
            function(cb){
              ajax.handleAs = 'arraybuffer';
              ajax.url = "http://example.com/data"
              ajax.auto = true;
              cb();
            },
            animationFrameFlush,
            function(cb){
              var buf = new ArrayBuffer(8*4);
              var resp = new Int32Array(buf);
              resp[3] = 12;
              resp[6] = 21;
              requests[0].response = buf;
              requests[0].respond(200, headers, 'blahblahblah');
              cb();
            }
            ], done);
        });
        test('arraybuffer response should be passed through', function(){
          var r = ajax.response;
          var ints = new Int32Array(r);
          assert.equal(ints[3], 12);
          assert.equal(ints[6], 21);
        });
      });
      suite('blob', function(){});
      suite('document', function(){});
    });
    suite('auto', function() {
      suiteSetup(function(){
        ajax.url = "http://example.com/"
        ajax.auto = true;
      });
      test('url change should trigger request', function(done){
        async.series([
          function(cb){
            ajax.url = "http://example.com/auto";
            cb();
          },
          animationFrameFlush,
          function(cb){
            assert.equal(requests.length, 1);
            cb();
          }
          ], done);
      });
      test('params change should trigger request', function(done){
        async.series([
          function(cb){
            ajax.params = {param: "value"};
            cb();
          },
          animationFrameFlush,
          function(cb){
            assert.equal(requests.length, 1);
            cb();
          }
          ], done);
      });
      test('body change should trigger request', function(done){
        async.series([
          function(cb){
            ajax.method = "POST";
            ajax.body = "bodystuff";
            cb();
          },
          animationFrameFlush,
          function(cb){
            assert.equal(requests.length, 1);
            cb();
          }
          ], done);
      });
    });
    suite('events', function(){
      var headers = {
        "Content-Type": "text/plain"
      };
      var body = "somebodytext";
      var responded;
      setup(function(done){
        async.series([
          function(cb){
            ajax.auto = false;
            cb();
          },
          animationFrameFlush,
          function(cb){;
            ajax.handleAs = 'text';
            ajax.url = "http://example.com/text"
            ajax.auto = true;
            cb();
          },
          animationFrameFlush,
          ], done);
        responded = false;
      });
      suite('core-response', function(){
        test('core-response should be fired on success', function(done){
          window.addEventListener('core-response', function(response, xhr){
            responded = true;
          });
          requests[0].respond(200, headers, body);
          assert.isTrue(responded);
          done();
        });
        test('core-response should not be fired on failure', function(done){
          window.addEventListener('core-response', function(response, xhr){
            responded = true;
          });
          requests[0].respond(404, headers, body);
          assert.isFalse(responded);
          done();
        });
      });
      suite('core-error', function(){
        test('core-error should be fired on failure', function(done){
          window.addEventListener('core-error', function(response, xhr){
            responded = true;
          });
          requests[0].respond(404, headers, body);
          assert.isTrue(responded);
          done();
        });
        test('core-error should not be fired on success', function(done){
          var responded = false;
          window.addEventListener('core-error', function(response, xhr){
            responded = true;
          });
          requests[0].respond(200, headers, body);
          assert.isFalse(responded);
          done();
        });
      });
      suite('core-complete', function(){
        test('core-complete should be fired on success', function(done){
          window.addEventListener('core-complete', function(response, xhr){
            responded = true;
          });
          requests[0].respond(200, headers, body);
          assert.isTrue(responded);
          done();
        });
        test('core-complete should be fired on failure', function(done){
          var responded = false;
          window.addEventListener('core-complete', function(response, xhr){
            responded = true;
          });
          requests[0].respond(404, headers, body);
          assert.isTrue(responded);
          done();
        });
      });
    });
  });
  