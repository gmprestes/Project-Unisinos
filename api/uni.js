var page = require('webpage').create(),
  fs = require('fs'),
  system = require('system');

try {
  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

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


        // Sessão OK
        page.evaluate(function(user, pass) {
          document.getElementById('txtUser').value = user; //"gmprestes";
          document.getElementById('txtPass').value = pass; // "pinkcf7500000";
          document.getElementById('btnLogin').click();
        }, system.args[1], system.args[2]);

        window.setTimeout(function() {
          page.evaluate(function(erro) {
            //xpcContexto.Show();
              var iframe = document.getElementsByTagName("iframe")[0];
              var doc = iframe.contentWindow.document;
              var trContexto2015 = doc.getElementById('grid_ctl07_grid\:RMWSelectTemplate').parentNode.parentNode;
              var el = trContexto2015.getElementsByTagName("td")[1].firstChild;
              el.click();
          });

          window.setTimeout(function() {
            var content = page.content;
            //page.render('export.png');
            fs.write("html/" + system.args[3] + '.html', content, 'w');
            console.log("OK");
            phantom.exit(1);
          }, 5000);
        }, 7000); // segundo timeout
      }, 1000);
    }
  });
} catch (Erro) {
  console.log(Erro);
  page.render(system.args[3] + '.png');
  phantom.exit();
}
