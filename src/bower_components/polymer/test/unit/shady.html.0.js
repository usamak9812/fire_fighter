

// TODO(sorvell): cannot register element in main document under polyfill.
var registered = false;
function registerTestElement() {
  if (registered) return;
  var template = document.querySelector('template');
  Polymer({
    is: 'x-content-test',
    _useContent: true,
    _template: template
  });
  registered = true;
}

/**
 * Test the `<content>` element distribution algorithm by verifying the
 * resulting composed tree structure.
 */
function testRender(descr, hostInnerHtml, shadowRootHtml, expectedHtml) {
  test(descr, function() {
    registerTestElement();
    // Create an instance of the test element.
    var host = document.createElement('x-content-test');
    // Populate the initial pool of light DOM children.
    host.innerHTML = hostInnerHtml;
    syncLightDOM(host);
    // Pretend we're stamping the template contents.
    setRootInnerHTML(host.shadyRoot, shadowRootHtml);
    // Invoke distribution and verify the resulting tree.
    host.distributeContent();
    assert.strictEqual(host.innerHTML, expectedHtml);
  });
}

testRender('Empty shadow', 'abc', '', '');
testRender('Simple shadow', 'abc', 'def', 'def');
testRender('Fallback shadow', 'abc',
           '<content select="xxx">fallback</content>', 'fallback');
testRender('Content', 'abc',
           '<content>fallback</content>', 'abc');
testRender('Content before', 'abc',
           'before<content>fallback</content>', 'beforeabc');
testRender('Content after', 'abc',
           '<content>fallback</content>after', 'abcafter');

suite('render content', function() {
  testRender('no select', '<a href="">Link</a> <b>bold</b>',
             '<content></content>',
             '<a href="">Link</a> <b>bold</b>');
  testRender('select ""', '<a href="">Link</a> <b>bold</b>',
             '<content select=""></content>',
             '<a href="">Link</a> <b>bold</b>');
  testRender('select *', '<a href="">Link</a> <b>bold</b>',
             '<content select="*"></content>',
             '<a href="">Link</a><b>bold</b>');

  testRender('select .a',
             '<a class="a">a</a> <a class="b">b</a>',
             '<content select=".a"></content>',
             '<a class="a">a</a>');

  testRender('select .b .a',
             '<a class="a">a</a> <a class="b">b</a>',
             '<content select=".b"></content><content select=".a"></content>',
             '<a class="b">b</a><a class="a">a</a>');

  testRender('select .b .a 2',
             '<a class="a">a</a> <a class="b">b</a> <a class="b">c</a>',
             '<content select=".b"></content><content select=".a"></content>',
             '<a class="b">b</a><a class="b">c</a><a class="a">a</a>');

  testRender('select [c] *',
             '<span>a</span><span>b</span><span c>c</span><span>d</span>',
             '<content select="[c]"></content><content></content>',
             '<span c="">c</span><span>a</span><span>b</span><span>d</span>');
});


test('Reproject', function() {
  registerTestElement();
  var host = document.createElement('x-content-test');
  host.innerHTML = '<a></a>';
  var a = host.firstChild;
  syncLightDOM(host);
  setRootInnerHTML(host.shadyRoot, '<x-content-test id="p"></x-content-test>');
  var p = host.shadyRoot.firstChild;
  p.innerHTML = '<b></b><content></content>';
  updateRootInsertionPoints(host.shadyRoot);
  var b = p.firstChild;
  var content = p.lastChild;

  // force upgrade on polyfilled browsers
  CustomElements.upgrade(p);

  syncLightDOM(p);
  setRootInnerHTML(p.shadyRoot,
      'a: <content select=a></content>b: <content select=b></content>');
  var textNodeA = p.shadyRoot.firstChild;
  var contentA = p.shadyRoot.childNodes[1];
  var textNodeB = p.shadyRoot.childNodes[2]
  var contentB = p.shadyRoot.childNodes[3];

  function testRender() {
    // Simulate the correct ordering as "ready" would fire.
    host.distributeContent();
    // NOTE: needed only for this imperative test that needs
    // to simulate distribution from `shadyRoot`
    p.distributeContent();
    assert.strictEqual(host.innerHTML,
        '<x-content-test id="p">a: <a></a>b: <b></b></x-content-test>');

    assertArrayEqual(host.lightChildren, [a]);
    assert.strictEqual(a.lightParent, host);
    assertArrayEqual(host.shadyRoot.lightChildren, [p]);
    assert.strictEqual(p.lightParent, host.shadyRoot);
    assertArrayEqual(p.lightChildren, [b, content]);
    assert.strictEqual(b.lightParent, p);
    assert.strictEqual(content.lightParent, p);
    assertArrayEqual(p.shadyRoot.lightChildren,
        [textNodeA, contentA, textNodeB, contentB]);
  }

  testRender();
  //testRender();
});


suite('Mutate light DOM', function() {
  test('removeAllChildNodes - mutate host', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content>fallback</content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    host.firstChild.textContent = '';
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a></a>');

    host.lightChildren = [];
    host.distributeContent();
    assert.strictEqual(host.innerHTML, 'fallback');
  });


  test('removeAllChildNodes - mutate shadow', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content><b>after</b>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b>after</b>');

    host.shadyRoot.lightChildren[1].textContent = '';
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b></b>');

    host.shadyRoot.lightChildren = [];
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '');
  });

  test('removeAllChildNodes - mutate shadow fallback', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content select="xxx"><b>fallback</b></content>');
    var b = host.shadyRoot.firstChild.firstChild;
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<b>fallback</b>');

    b.textContent = '';
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<b></b>');

    host.shadyRoot.firstChild.lightChildren = [];
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '');

    host.shadyRoot.lightChildren = [];
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '');
  });

  test('removeChild - mutate host', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content>fallback</content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    host.firstChild.removeChild(host.firstChild.firstChild);
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a></a>');

    host.lightChildren = [];
    host.distributeContent();
    assert.strictEqual(host.innerHTML, 'fallback');
  });

  test('removeChild - mutate host 2', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a></a><b></b>';
    var a = host.firstChild;
    var b = a.nextSibling;

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content>fallback</content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a></a><b></b>');

    Polymer.dom(host).removeChild(b);
    Polymer.dom.flush();
    assert.strictEqual(host.innerHTML, '<a></a>');

    Polymer.dom(host).removeChild(a);
    Polymer.dom.flush();
    assert.strictEqual(host.innerHTML, 'fallback');
  });

  test('removeChild - mutate shadow', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content><b>after</b>');
    var b = host.shadyRoot.lastChild;
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b>after</b>');

    b.removeChild(b.firstChild);
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b></b>');

    host.shadyRoot.lightChildren.splice(1, 1); // remove b
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    host.shadyRoot.lightChildren = []; // remove a
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '');
  });

  test('setAttribute select', function() {
    // TODO(arv): DOM bindings for select.
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a><b>World</b>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content select="b">fallback b</content>' +
                            '<content select="a">fallback a</content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<b>World</b><a>Hello</a>');

    host.shadyRoot.firstChild.setAttribute('select', 'xxx');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, 'fallback b<a>Hello</a>');

    host.shadyRoot.firstChild.setAttribute('select', '');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b>World</b>fallback a');
  });

  test('appendChild - mutate host', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    var b = document.createElement('b');
    Polymer.dom(host).appendChild(b);
    Polymer.dom.flush();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b></b>');
  });

  test('appendChild - mutate shadow', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    var b = document.createElement('b');
    Polymer.dom(host.shadyRoot).appendChild(b);
    Polymer.dom.flush();
    //host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a><b></b>');
  });

  test('insertBefore - mutate host', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';
    var a = host.firstChild;

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    var b = document.createElement('b');
    Polymer.dom(host).insertBefore(b, a);
    Polymer.dom.flush();
    assert.strictEqual(host.innerHTML, '<b></b><a>Hello</a>');
  });

  test('insertBefore - mutate shadow', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content>');
    var content = host.shadyRoot.firstChild;
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    var b = document.createElement('b');
    Polymer.dom(host.shadyRoot).insertBefore(b, content);
    Polymer.dom.flush();
    assert.strictEqual(host.innerHTML, '<b></b><a>Hello</a>');
  });

  test('replaceChild - mutate host', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';
    var a = host.firstChild;

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content>');
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    var b = document.createElement('b');
    host.lightChildren[0] = b;
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<b></b>');
  });

  test('replaceChild - mutate shadow', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<a>Hello</a>';

    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content>');
    var content = host.shadyRoot.firstChild;
    host.distributeContent();
    assert.strictEqual(host.innerHTML, '<a>Hello</a>');

    var b = document.createElement('b');
    Polymer.dom(host.shadyRoot).replaceChild(b, content);
    //host.distributeContent();
    Polymer.dom.flush();
    assert.strictEqual(host.innerHTML, '<b></b>');
  });

  test('querySelectorAll (shadyRoot)', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<div id="main"></div>';
    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content><span id="main"></span>' +
      '<x-content-test></x-content-test>');
    var hostLocalMain = host.shadyRoot.firstChild.nextSibling;
    var child = host.shadyRoot.lastChild;
    // force upgrade on polyfilled browsers
    CustomElements.upgrade(child);
    child.innerHTML = '<div id="sub"></div>';
    var childLightSub = child.firstChild;
    syncLightDOM(child);
    setRootInnerHTML(child.shadyRoot, '<content></content><span id="sub"></span>');
    var childLocalSub = child.shadyRoot.lastChild;
    host.distributeContent();
    // NOTE: needed only for this imperative test that needs
    // to simulate distribution from `shadyRoot`
    child._distributeContent();
    
    assert.deepEqual(Polymer.dom(host.root).querySelectorAll('span#main'), [hostLocalMain]);
    assert.deepEqual(Polymer.dom(host.root).querySelectorAll('div#sub'), [childLightSub]);
    assert.deepEqual(Polymer.dom(child.root).querySelectorAll('span#sub'), [childLocalSub]);
  });

  test('querySelectorAll (light dom)', function() {
    var host = document.createElement('x-content-test');
    host.innerHTML = '<div id="main"></div>';
    var hostLightMain = host.firstChild;
    syncLightDOM(host);
    setRootInnerHTML(host.shadyRoot, '<content></content><span id="main"></span>' +
      '<x-content-test></x-content-test>');
    var child = host.shadyRoot.lastChild;
    // force upgrade on polyfilled browsers
    CustomElements.upgrade(child);
    child.innerHTML = '<div id="sub"></div>';
    var childLightSub = child.lastChild;
    syncLightDOM(child);
    setRootInnerHTML(child.shadyRoot, '<content></content><span id="sub"></span>');
    host.distributeContent();
    assert.deepEqual(Polymer.dom(host).querySelectorAll('div#main'), [hostLightMain]);
    assert.deepEqual(Polymer.dom(host).querySelectorAll('#sub'), []);
    assert.deepEqual(Polymer.dom(child).querySelectorAll('div#sub'), [childLightSub]);
  });

});

function syncLightDOM(n) {
  if (n.lightChildren) {
    for (var e=n.firstChild; e; e=e.nextSibling) {
      if (n.lightChildren.indexOf(e) < 0) {
        e.lightParent = n;
        n.lightChildren.push(e);
      }
    }
  }
}

function setInnerHTML(node, value) {
  node.textContent = '';
  var temp = node.ownerDocument.createElement('div');
  temp.innerHTML = value;
  var firstChild;
  while (firstChild = temp.firstChild) {
    node.appendChild(firstChild);
  }
}

function setRootInnerHTML(root, value) {
  setInnerHTML(root, value);
  updateRootInsertionPoints(root);
  syncLightDOM(root);
}

function updateRootInsertionPoints(root) {
  root._insertionPoints = root.querySelectorAll('content');
}

function assertArrayEqual(a, b, msg) {
  assert.equal(a.length, b.length, msg);
  for (var i = 0; i < a.length; i++) {
    assert.equal(a[i], b[i], msg);
  }
}

