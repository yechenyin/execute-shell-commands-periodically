const vscode = require('vscode')
const path = require('path')
const fs = require('fs')

class Extension {
  static context
}
function setExtension(context) {
  Extension.context = context
}
function getExtension() {
  return Extension.context
}
function setGlobal(key, val) {
  Extension.context.globalState.update(key, val)
}
function getGlobal(key) {
  return Extension.context.globalState.get(key)
}
function setWorkspace(key, val) {
  Extension.context.workspaceState.update(key, val)
}
function getWorkspace(key) {
  return Extension.context.workspaceState.get(key)
}

function getConfig(property) {
  let package = getExtension().extension.packageJSON
  return vscode.workspace.getConfiguration().get(package.name + '.' + property)
}

module.exports = { setExtension, getExtension, getConfig, setWorkspace, getWorkspace }
