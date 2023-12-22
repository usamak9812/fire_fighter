
      (function () {
        var knownGlobals = {};
        for (var k in window) {
          if (Object.hasOwnProperty.call(window, k)) {
            knownGlobals[k] = knownGlobals;
          }
        }
        function dump(s) {
          var p = document.createElement('p');
          p.appendChild(document.createTextNode(s));
          document.body.appendChild(p);
        }
        function printDone() { dump('done'); }
        function dumpGlobals() {
          for (var k in window) {
            if (knownGlobals[k] !== knownGlobals
                && Object.hasOwnProperty.call(window, k)) {
              dump('global ' + k);
            } 
          }
        }
        window.exports = { print_done: printDone, dump_globals: dumpGlobals };
      })();
    