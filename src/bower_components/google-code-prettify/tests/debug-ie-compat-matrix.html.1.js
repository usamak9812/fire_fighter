
// Configuration we're testing.
var quirksMode;
var ieMajorVersionNumber;

quirksMode = document.compatMode == "BackCompat";
ieMajorVersionNumber = navigator.userAgent.match(/MSIE\s(\d+)/) || NaN;
if (ieMajorVersionNumber) {
  ieMajorVersionNumber = +ieMajorVersionNumber[1];
}
