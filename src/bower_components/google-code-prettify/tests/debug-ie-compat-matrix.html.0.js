
// Function under test
var matrix;

(function () {
  var table = {
    quirks: { "6": "\r", "7": "\r", "8": "\r", "9": "\r", "10": "\n" },
    standards: { "6": "\r", "7": "\r", "8": "\r", "9": "\n", "10": "\n" }
  };

  matrix = function (quirksMode, ieMajorVersionNumber) {
    if ("boolean" !== typeof quirksMode) {
      throw new Error(quirksMode);
    } else if ("number" !== typeof ieMajorVersionNumber
        || !table.quirks.hasOwnProperty(+ieMajorVersionNumber)) {
      throw new Error(ieMajorVersionNumber);
    }
    return table[quirksMode ? "quirks" : "standards"][ieMajorVersionNumber];
  };
})();
