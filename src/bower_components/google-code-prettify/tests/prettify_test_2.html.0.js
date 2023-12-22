(function () {
  var sourceBaseUrl = /[&?]distrib/.test(location.search)
      ? "../distrib/google-code-prettify/" : "../src/";
  var sources = [
      "prettify.js",
      "lang-basic.js",
      "lang-css.js",
      // Language extensions tested.
      "lang-clj.js",
      "lang-lisp.js",
      "lang-llvm.js",
      "lang-matlab.js",
      "lang-mumps.js",
      "lang-n.js",
      "lang-pascal.js",
      "lang-r.js",
      "lang-tcl.js",
"lang-tex.js",
      "lang-xq.js"
  ];
  var styles = [
      "prettify.css"
  ];
  if (window.console) {
    console.log("sourceBaseUrl=" + sourceBaseUrl);
  }
  for (var i = 0; i < sources.length; ++i) {
    document.write(
        "<script src=\"" + sourceBaseUrl + sources[i] + "\"><\/script>");
  }
  for (var i = 0; i < styles.length; ++i) {
    document.write(
        "<link rel=\"stylesheet\" href=\"" + sourceBaseUrl + styles[i] + "\">");
  }
})();
