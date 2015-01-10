var CompositeDisposable = require('atom').CompositeDisposable;
//TODO: test
module.exports = {
    activate: function (state) {
        var path = require('path');
        var fs = require('fs');
        var profileHome = path.join(__dirname, '..', '..', '..');
        var configFile = path.join(profileHome, 'config.cson');

        var readStream = fs.createReadStream(configFile);
        readStream.on("error", function(err) { /* Ignore the error ? */ });

        var writeStream = fs.createWriteStream(configFile + ".bak");
        writeStream.on("error", function(err) { /* Ignore the error ? */ });

        readStream.pipe(writeStream);

        return this.openHook = atom.workspace.onDidOpen((function(_this) {
            return function() {
                return _this.applyFix();
            };
        })(this));
    },

    applyFix: function () {
        return setTimeout(function(){
            atom.workspace.decreaseFontSize();
            atom.workspace.increaseFontSize();
        }, 25);
    }
};
