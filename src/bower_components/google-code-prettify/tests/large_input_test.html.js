if (!Date.now) {
  Date.now = function () { return (new Date).getTime(); };
}

if (typeof console === 'undefined') {
  console = {
    log: (function () {
      var messages = [];
      var pending = false;
      function showMessages() {
        pending = false;
        if (messages.length) {
         var text = messages.join('\n');
          var pre = document.createElement('PRE');
          pre.appendChild(document.createTextNode(text));
          document.body.appendChild(pre);
          messages = [];
        }
      }

      return function (msg) {
        if (!pending) {
          setTimeout(showMessages, 0);
          pending = true;
        }
        messages.push(msg);
      };
    })()
  };
}

(function () {
  var tasks = [];
  var jsonTimes = [];
  var xmlTimes = [];

  var listItem = (
      '&lt;li class="friendly" style="blink: like-its-going-out-of-style"&gt;'
      + '&lt;b&gt;Howdy&lt;/b&gt; Neighbor&lt;/li&gt;');
  var jsonItem = (
      '{ "friendly": true, "blinking": "hell-yes", "greeting": "Howdy!" }');
  function makeTargets(lang, item, sep, preText, postText, timesList) {
   var buffer = [];
    for (var i = 512; --i >= 0;) { buffer.push(item); }
    var count = 512;
    for (var i = 6; --i >= 0;) {
     var src = buffer.join(sep);

      tasks.push((function (n, toPrettify) {
        return function () {
          console.log('starting ' + lang + ' ' + n);
          var t0 = Date.now();
          var result = prettyPrintOne(toPrettify, lang);
          var t1 = Date.now();
          console.log('finishing ' + lang + ' ' + n);
          if (result === toPrettify) {
            console.error('Failed to prettify ' + lang + ' ' + n);
          } else {
            timesList.push([n, t1 - t0, toPrettify.length]);
          }
        };
      })(count, preText + src + postText));

      buffer = [src, src];
      count *= 2;
    }
  }

  makeTargets('xml', listItem, '\n', '<ul>', '<\/ul>', xmlTimes);
  makeTargets('json', jsonItem, ', ', '[', ']', jsonTimes);

  function emitBenchmarkTable(title, times) {
    var html = [
        '<h2>', title, '<h2>',
        '<table class=="benchmark"><tr><th>Count<th>Length<th>Time<th>Items Per Second'];
    for (var i = 0; i < times.length; ++i) {
      var time = times[i];
      var count = time[0], deltaMs = time[1], length = time[2];
      html.push('<tr><td>', count, '<td>', length, '<td>', deltaMs,
                '<td>', (count * 1000 / deltaMs).toFixed(1));
    }
    html.push('</table>');

    var div = document.createElement('DIV');
    div.innerHTML = html.join('');
    document.body.appendChild(div);
  }

  tasks.push(
      function () { emitBenchmarkTable('XML', xmlTimes); },
      function () { emitBenchmarkTable('JSON', jsonTimes); });

  function doOne() {
    var task = tasks.shift();
    task();
    if (tasks.length) { setTimeout(doOne, 250); }
  }
  setTimeout(doOne, 250);
})();