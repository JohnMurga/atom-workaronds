// jscs:disable requireMultipleVarDecl
// jscs:disable requireVarDeclFirst
/*global atom require module setTimeout*/

module.exports = {
    // state parameter not needed
    activate: function() {
        "use strict";
        var path = require("path");
        var fs = require("fs");
        var profileHome = path.join( atom.packages.getPackageDirPaths()[ 0 ], "..");
        var configFile = path.join( profileHome, "config.cson");

        var readStream = fs.createReadStream( configFile );
        readStream.on("error", function( err ) {
            throw (err);
        });

        var writeStream = fs.createWriteStream( configFile + ".bak");
        readStream.on("error", function( err ) {
            throw (err);
        });

        readStream.pipe( writeStream );

        atom.workspace.onDidStopChangingActivePaneItem(function( item ) {
            if ( item !== undefined && item !== null ) {
                module.exports.applyFix();
            }
        });

    },
    deactivate: function() {
        "use strict";
    },
    applyFix: function( textEditor ) {
        "use strict";
        atom.workspace.decreaseFontSize();
        atom.workspace.increaseFontSize();
    }
};
