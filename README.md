使用此插件可以不断定期执行终端命令。


Shell Commands设置循环执行的终端命令，命令之间可以使用;或者换行分隔。\
默认的命令配置是git pull，可以自动解决因为未及时拉取而产生合并提交Merge branch 'master' of的问题。\
可以将Execute Interval设置为负数，停止全部项目的终端命令执行。

可以在vscode中按F1后执行"stop shell commands execution in current workspace"命令后停止在当前运行目录执行终端命令。\
执行"start shell commands execution in current workspace"命令可以重新开始当前运行目录的终端命令执行。

Error Handle的默认设置为"[[error: Your local changes to the following files would be overwritten by merge]] \ngit stash push --include-untracked -m git_pull_conflit;git pull;git stash pop;"。\
意思是当命令执行后的出错信息包含[[]]中的消息“error: Your local changes to the following files would be overwritten by merge”时,自动执行后续的终端命令"git stash push --include-untracked -m git_pull_conflit;git pull;git stash pop;"。\
即当前的文件修改和git pull的远程仓库文件有冲突报错时，先执行git stash贮藏你的修改，接着执行git pull拉取最新代码，最后执行git stash pop恢复你的修改。\
可以按照此格式设置多个出错信息和对应的处理命令。

vscode market: https://marketplace.visualstudio.com/items?itemName=yechenyin.execute-shell-commands-periodically  
source code: https://github.com/yechenyin/execute-shell-commands-periodically


