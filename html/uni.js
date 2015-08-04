function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

var page = require('webpage').create(),
  fs = require('fs'),
  system = require('system');


page.viewportSize = {
  width: 1280,
  height: 800
};
console.log('The default user agent is ' + page.settings.userAgent);

page.open('https://portal.asav.org.br/corpore.net/Login.aspx%3FReturnUrl%3D%2Fcorpore.net%2FMain.aspx%3FSelectedMenuIDKey%3DmnQuadroHorario%26ActionID%3DEduQuadroHorarioAlunoActionWeb', function(status) {
  //page.open('http://minha.unisinos.br', function(status) {

  if (status !== 'success') {
    console.log('Unable to load the address!');
    console.log(status);

    phantom.exit(1);
  } else {

    window.setTimeout(function() {
      page.evaluate(function() {
        document.getElementById('txtUser').value = "gmprestes";
        document.getElementById('txtPass').value = "pinkcf7500000";
        document.getElementById('btnLogin').click();
        //document.getElementById("form-login").submit();
      });

      /*var i = 1;
      while (i < 10000000000) {
        i++;
      }*/

      window.setTimeout(function() {
        page.evaluate(function() {

          document.getElementById('grid_ctl07_grid:RMWSelectTemplate').click();
        });
        window.setTimeout(function() {

          //console.log(page.content);
          var content = page.content;
          page.render('export.png');
          fs.write('1.html', content, 'w');
          phantom.exit();
        }, 5000);
      }, 10000);


      //  phantom.exit();
    }, 1000);
  }
});
