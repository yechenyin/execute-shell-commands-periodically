const { getConfig, setWorkspace, getWorkspace } = require('./global')
const cp = require('child_process')
const vscode = require("vscode")
let execution = null
let showed = false

function execCommand(command, error_keywords, handle_commands) {
  if (!command)
    return
  command = command.replace(/^\s+/, '')
  let projectPath = vscode.workspace.rootPath
  try {
    let option = { cwd: projectPath }
    if (process.platform == 'win32')
      option.shell = getConfig('windowsShell')
    let output = cp.execSync(command, option)
    console.log(command + ' : ' + output)
  } catch (err) {
    console.error(command + '\n' + err)
    if (error_keywords?.length)
      for (const i in error_keywords) {
        if (err.message.includes(error_keywords[i])) {
          execCommands(handle_commands[i])
        }
      }
    else
      throw new Error(err)
  }
}

function execCommands(commands, error_keywords, handle_commands) {
  commands.replace('\n', ';').split(';').map(command => {
    execCommand(command, error_keywords, handle_commands)
  })
}

function startExecCommands() {
  if (getConfig('executeInterval') < 0)
    return
  let cmds = getConfig('shellCommands')
  if (execution)
    clearInterval(execution)
  let execute = ()=> {
    console.log('shell commands execution is stoped:' + getWorkspace('stop'))
    if (getWorkspace('stop') || getConfig('executeInterval') < 0)
      return
    try {
      let error_keywords = [], handle_commands = []
      let solutions = getConfig('errorHandle').split('[[')
      for (const solution of solutions) {
        let [keyword, commands] = solution.split(']]')
        if (keyword && commands) {
          error_keywords.push(keyword)
          handle_commands.push(commands)
        }
      }
      execCommands(cmds, error_keywords, handle_commands)
    } catch (err) {
      if (!showed) {
        showed = true
        let msg = 'Stop shell commands execution? '
        vscode.window.showInformationMessage(msg, { modal: true, detail: 'You can execute "start shell commands execution in current workspace" in the Command Palette to restart execution.' }, 'Yes').then(result => {
          if (result == 'Yes')
            stopCurrentWorkspaceExec()
        })
      }
    }
  }
  execute()
  execution = setInterval(execute, getConfig('executeInterval') * 1000)
}
function stopCurrentWorkspaceExec() {
  setWorkspace('stop', true)
}
function startCurrentWorkspaceExec() {
  setWorkspace('stop', false)
  clearInterval(execution)
  showed = false
  startExecCommands()
}
module.exports = { startExecCommands, stopCurrentWorkspaceExec, startCurrentWorkspaceExec }