
function makeCodeJoiningOn(text, htmlNewline, start, end) {
  start = start || '';
  end = end || '';
  var code = document.createElement('PRE');
  code.innerHTML = start + ['before', '[' + text + ']', 'after'].join(htmlNewline) + end;
  code.id = text.replace('+', 'plus').replace(/[^\w\-_]/g, '_');
  document.body.appendChild(code);
}
