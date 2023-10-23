// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { startExecCommands, stopCurrentWorkspaceExec, startCurrentWorkspaceExec } = require("./src/main");
const global = require("./src/global");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "execute-shell-commands-periodically" is now active!');
  global.setExtension(context)  
  startExecCommands();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "execute-shell-commands-periodically.stop-execute",
    function () {
      stopCurrentWorkspaceExec()
    }
  );
  context.subscriptions.push(disposable);

  let disposable2 = vscode.commands.registerCommand(
    "execute-shell-commands-periodically.start-execute",
    function () {
      startCurrentWorkspaceExec()
    }
  );
  context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
