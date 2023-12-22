
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
  function stringify(s) {
    return JSON.stringify(s).replace(/\r/g, '\\r').replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t');
  }

  var testInputs = Array.prototype.slice.call(
     document.body.getElementsByClassName('testinput'), 0);
  for (var i = 0, n = testInputs.length; i < n; ++i) {
    var testInput = testInputs[i];
    var testResult = testInput.parentNode.nextSibling;
    while (testResult.nodeType !== 1) { testResult = testResult.nextSibling; }
    var actual = document.createElement('TD');
    actual.className = 'actual';
    testResult.parentNode.appendChild(actual);
    try {
      var sourceAndSpans = extractSourceSpans(testInput);
      var source = sourceAndSpans.source;
      var actualText = '^';
      var actualHtml = '';
      var spans = sourceAndSpans.spans;
      for (var j = 0, m = spans.length; j < m; j += 2) {
        var start = spans[j], end = spans[j + 2] || source.length;
        var span = source.substring(start, end);
        actualText += span + '^';
        var spanClass = ((j & 2) ? 'odd' : 'even');
        if (spans[j + 1].nodeName === 'BR') {
          spanClass += ' break';
        }
        actualHtml += '<span class="' + spanClass+ '">'
            + span.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '<\/span>';
      }
      actual.innerHTML = '<pre>' + actualHtml + '<\/pre>';
      var goldenText = testResult.innerText || testResult.textContent;
      var goldenNormalized = '"' + goldenText.replace(/(?:\r\n?|\n)$/, '') + '"';
      var actualNormalized = stringify(actualText);
      var passed = actualNormalized === goldenNormalized;
      if (!passed) {
        console.log(goldenNormalized + ' !==\n' + actualNormalized);
      }
      actual.className += passed ? ' ok' : ' failure';
    } catch (ex) {
      actual.className += ' error';
      actual.appendChild(document.createTextNode('Error: ' + (ex.message || ex)));
    }
  }
}, 0)