{CompositeDisposable} = require 'atom'

module.exports =

  activate: (state) ->
    @openHook = atom.workspace.onDidOpen( => @applyFix())

  applyFix: ()->
# Todo: -> Only run after JS file is loaded instead of every open
##    if (@openHook)
#        @openHook.dispose()

    # Hack to make sure language-javascript works"
    atom.packages.disablePackage "language-javascript"
    atom.packages.enablePackage "language-javascript"

    # Hack required for font alignment silliness
    `setTimeout(function(){
        atom.workspace.decreaseFontSize()
        atom.workspace.increaseFontSize()
    }, 100);`
