function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length < 4) {
    console.log('pdf.js necessita de 4 parametros : URL filePath pageFormat orientation [margin] [zoom] [paperWidth] [paperHeight]');
    phantom.exit(1);
} else {
    address = replaceAll('\\u0026', '&', system.args[1]);
    output = system.args[2];
    page.viewportSize = { width: 600, height: 600 };

    var pageMargin = 0.5;
    if (system.args.length > 4) {
        pageMargin = system.args[5].replace(",", ".");
    }

    var format = system.args[3];

    if (format != "Outro")
        page.paperSize = { format: format, orientation: system.args[4], margin: pageMargin + 'cm' };
    else {
        var width = system.args[7].replace(",", ".");
        var height = system.args[8].replace(",", ".");
        page.paperSize = { width: width + 'cm', height: height + 'cm', orientation: system.args[4], margin: pageMargin + 'cm' };
    }

    if (system.args.length > 5) {
        var zoom = system.args[6].replace(",", ".");
        page.zoomFactor = zoom;
    }


    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
            window.setTimeout(function () {
                page.render(output);
                console.log('OK');
                phantom.exit();
            }, 200);
        }
    });
}