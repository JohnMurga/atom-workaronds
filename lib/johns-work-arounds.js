// jscs:disable requireMultipleVarDecl
/*global atom require module setTimeout */

module.exports = {
    openHook: null,
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

        module.exports.openHook = atom.workspace.onDidOpen(function () {
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
        setTimeout(widthHack, 50); // Best case
        setTimeout(widthHack, 750); // A worse case
    },

    deactivate: function () {
        "use strict";
        return module.exports.openHook.dispose();
    }
};
