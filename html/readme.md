Run with this command :

```
phantomjs --ssl-protocol=any uni.js

```

var iframe = $(".dxpcContent iframe");
var iframeDoc = iframe.contentDocument || iframe.contentWindow;
// Get HTML element
var iframeHtml = iframeDoc.getElementsByTagName("html")[0];
var iframeBody = iframeHtml.getElementsByTagName("body")[0];
var element = iframeHtml.getElementById('grid_ctl07_grid\\:RMWSelectTemplate');
console.log(element);

var iframe = $(".dxpcContent iframe");
var element = iframe.find($('#grid_ctl07_grid\\:RMWSelectTemplate'));
console.log(element);
