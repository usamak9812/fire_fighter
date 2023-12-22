
(function () {
  // DOM elements.
  var oneLine = document.getElementById("one-line");
  var twoLines = document.getElementById("two-lines");
  var twoLinesMutated = document.getElementById("two-lines-mutated");

  var originalHeight = twoLinesMutated.offsetHeight;

  // If the matrix cell being tested is correct, the following should
  // end up true.
  var pass = false;
  var reason = "unknown";

  // The DOM subtree to modify.
  var textNode = twoLinesMutated.firstChild;

  if (textNode.nodeType !== 3 /* TEXT */ || textNode.nextSibling) {
    reason = "unexpected DOM structure";  // Maybe not normalized.
  } else {
    // Perform the action we are testing.
    try {
      textNode.nodeValue = twoLines.firstChild.nodeValue.replace
          /\r\n?|\n/g, matrix(quirksMode, ieMajorVersionNumber);
    } catch (ex) {
      reason = String(ex);
    }

    // Check it against known good DOM subtrees.
    if (Math.abs(twoLinesMutated.offsetHeight - twoLines.offsetHeight) <= 1) {
      pass = true;
    } else if (Math.abs(twoLinesMutated.offsetHeight - oneLine.offsetHeight) <= 1) {
      reason = "newlines not preserved";
    } else {
      // offsetHeight should trigger layout, but might not have???
    }
  }

  document.title += " : " + pass ? "PASS" : "FAIL";
  if (!pass) {
    document.getElementById("error").appendChild(document.createTextNode(
       "quirksMode is " + quirksMode +
       "\nieMajorVersionNumber is " + ieMajorVersionNumber +
       "\nheight was " + originalHeight +
       "\nheight is " + twoLinesMutated.offsetHeight +
       "\nexpected " + twoLines.offsetHeight +
       "\nreason=" + reason));
  }
})();
