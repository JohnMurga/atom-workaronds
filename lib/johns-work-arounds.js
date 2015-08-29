// jscs:disable requireMultipleVarDecl
// jscs:disable requireVarDeclFirst
/*global atom require module setTimeout*/

module.exports = {
    myProxy: null,
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

        var SimpleProxy = require("simple-proxy");
        var myProxy = new SimpleProxy(33133);

        atom.commands.add("atom-workspace", "johns-work-arounds:start-proxy", function () {
            myProxy.start();
        });

        atom.commands.add("atom-workspace", "johns-work-arounds:stop-proxy", function () {
            myProxy.stop();
        });

        this.myProxy = myProxy;
    },
    deactivate: function () {
        "use strict";
        if (this.myProxy !== null) {
            this.myProxy.stop();
        }
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
