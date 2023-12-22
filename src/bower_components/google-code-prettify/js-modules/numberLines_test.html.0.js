
if (!document.body.getElementsByClassName) {
  document.body.getElementsByClassName = function (className) {
    className = className.replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, ' ');
    var results = [];
    function walk(node) {
      if (node.nodeType !== 1) { return; }
      // This test should be order-insensitive.
      if ((' ' + node.className + ' ').indexOf(className) >= 0) {
        results[results.length] = node;
      }
      for (var child = node.firstChild; child; child = child.nextSibling) {
        walk(child);
      }
    }
    walk(document.body);
    return results;
  };
}

setTimeout(function () {
  function normListItems(html) {
    // IE likes to leave out </li>s before <li>s.
    return html.replace(/<\/li>(<li\b)/gi, '$1');
  }

  var testInputs = Array.prototype.slice.call(
     document.body.getElementsByClassName('testinput'), 0);
  for (var i = 0, n = testInputs.length; i < n; ++i) {
    var testInput = testInputs[i];
    var testResult = testInput.parentNode.nextSibling;
    while (testResult.nodeType !== 1) { testResult = testResult.nextSibling; }
    var actual = document.createElement('TD');
    testResult.parentNode.appendChild(actual);
    try {
      var testInputClone = testInput.cloneNode(true);
      testInputClone.className = '';  // IE
      testInputClone.removeAttribute('class');  // Not IE.
      actual.appendChild(testInputClone);
      numberLines(testInputClone);
      var goldenNorm = normListItems(testResult.innerHTML);
      var actualNorm = normListItems(actual.innerHTML);
      var passed = goldenNorm === actualNorm;
      if (!passed) {
        console.log(JSON.stringify(goldenNorm)
                    + ' !==\n' + JSON.stringify(actualNorm));
      }
      actual.className = passed ? 'ok' : 'failure';
    } catch (ex) {
      actual.className = 'error';
      actual.appendChild(document.createTextNode('Error: ' + (ex.message || ex)));
    }
    actual.className += ' actual';
  }
}, 0)