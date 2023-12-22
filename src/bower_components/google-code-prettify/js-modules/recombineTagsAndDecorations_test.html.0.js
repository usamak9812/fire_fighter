
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
  var testInputs = Array.prototype.slice.call(
     document.body.getElementsByClassName('testinput'), 0);
  for (var i = 0, n = testInputs.length; i < n; ++i) {
    var testInput = testInputs[i];
    var decorationsNode = testInput.parentNode.nextSibling;
    while (decorationsNode.nodeType !== 1) { decorationsNode = decorationsNode.nextSibling; }
    var testResult = decorationsNode.nextSibling;
    while (testResult.nodeType !== 1) { testResult = testResult.nextSibling; }
    var actual = document.createElement('TD');
    testResult.parentNode.appendChild(actual);
    var clone = testInput.cloneNode(true);
    clone.className = '';  // IE
    clone.removeAttribute('class');  // Not IE.
    actual.appendChild(clone);
    var job = extractSourceSpans(clone);
    job.decorations = eval(decorationsNode.innerText || decorationsNode.textContent);
    try {
      recombineTagsAndDecorations(job);
      var passed = testResult.innerHTML === actual.innerHTML;
      if (!passed) {
        console.log(JSON.stringify(testResult.innerHTML) + ' !==\n' + JSON.stringify(actual.innerHTML));
      }
      actual.className = passed ? 'ok' : 'failure';
    } catch (ex) {
      actual.className = 'error';
      actual.appendChild(document.createTextNode(
          'Error: ' + (ex.message || ex)  + '\n' + ex.stack));
    }
    actual.className += ' actual';
  }
}, 0)