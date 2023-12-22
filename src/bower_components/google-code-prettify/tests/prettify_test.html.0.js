(function () {
  var sourceBaseUrl = /[&?]distrib/.test(location.search)
      ? "../distrib/google-code-prettify/" : "../src/";
  var sources = [
      "prettify.js",
      "lang-css.js",
      "lang-erlang.js",
      "lang-go.js",
      "lang-hs.js",
      "lang-lisp.js",
      "lang-lua.js",
      "lang-ml.js",
      "lang-proto.js",
      "lang-scala.js",
      "lang-sql.js",
      "lang-wiki.js",
      "lang-vhdl.js",
      "lang-vb.js",
      "lang-yaml.js",
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
