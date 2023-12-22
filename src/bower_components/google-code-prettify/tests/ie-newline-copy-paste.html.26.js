(function () {
  var threelines = document.getElementById('threelines');
  var codeElements = document.getElementsByTagName('PRE');
  var threelinesHeight = threelines.offsetHeight;

  var ok = [];
  var bad = [];
  for (var i = 0, n = codeElements.length; i < n; ++i) {
    var codeElement = codeElements[i];
    if (codeElement !== threelines) {
      var codeElementHeight = codeElement.offsetHeight;
      (Math.abs(threelinesHeight - codeElementHeight) < 3
       ? ok : bad).push(codeElement.id + ':' + codeElementHeight);
    }
  }

  function emit(text) {
    var p = document.createElement('P');
    p.appendChild(document.createTextNode(text));
    document.body.appendChild(p);
  }

  emit(navigator.userAgent);
  emit('Ok: ' + ok);
  emit('Bad: ' + bad);
})();