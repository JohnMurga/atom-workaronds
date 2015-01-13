/*jslint node:true, browser: true, todo: true, vars: true, indent: 4, maxlen: 120*/
/*global atom:false*/
var CompositeDisposable = require('atom').CompositeDisposable;

//TODO: test
module.exports = {
    openHook: null,
    activate: function () { // state parameter not needed
        'use strict';
        var path = require('path');
        var fs = require('fs');
        var profileHome = path.join(atom.packages.getPackageDirPaths()[0], '..');
        var configFile = path.join(profileHome, 'config.cson');

        var readStream = fs.createReadStream(configFile);
        readStream.on("error", function (err) { console.log(err); });

        var writeStream = fs.createWriteStream(configFile + ".bak");
        readStream.on("error", function (err) { console.log(err); });

        readStream.pipe(writeStream);

        module.exports.openHook = atom.workspace.onDidOpen(function () {
            return module.exports.applyFix();
        });
    },

    applyFix: function () {
        'use strict';
        return setTimeout(function () {
            atom.workspace.decreaseFontSize();
            atom.workspace.increaseFontSize();
        }, 25);
    },

    deactivate: function () {
        'use strict';
        return module.exports.openHook.dispose();
    }
};
