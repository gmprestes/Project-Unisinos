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


xpcContexto.Show();

var iframe = document.getElementsByTagName("iframe")[0];

var doc = iframe.contentWindow.document;

var trContexto2015 = doc.getElementById('grid_ctl07_grid\:RMWSelectTemplate').parentNode.parentNode;

var el = trContexto2015.getElementsByTagName("td")[1].firstChild;
el.click();

var tableDisciplinas = document.getElementById("ctl23_gvDisciplinas");
