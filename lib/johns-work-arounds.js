// jscs:disable requireMultipleVarDecl
/*global atom require module setTimeout*/

module.exports = {
    activate: function () { // state parameter not needed
        "use strict";
        var path = require("path");
        var fs = require("fs");
        var profileHome = path.join(atom.packages.getPackageDirPaths()[0], "..");
        var configFile = path.join(profileHome, "config.cson");

        var readStream = fs.createReadStream(configFile);
        readStream.on("error", function (err) {
            throw (err);
        });

        var writeStream = fs.createWriteStream(configFile + ".bak");
        readStream.on("error", function (err) {
            throw (err);
        });

        readStream.pipe(writeStream);

        atom.workspace.onDidChangeActivePaneItem(function () {
            return module.exports.applyFix();
        });

        // Call hack on start also
        module.exports.applyFix();
    },

    applyFix: function () {
        "use strict";
        var widthHack = function () {
            atom.workspace.decreaseFontSize();
            atom.workspace.increaseFontSize();
        };
        setTimeout(widthHack, 40);
    }
};
