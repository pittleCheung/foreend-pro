# git

git add a.txt 后 git diff a.txt 可以查看当前文件 a.txt 的区别

如果您想要撤销 git add . 命令添加的所有更改
git checkout .
如果您只想撤销某个文件的更改
git checkout <file>

# 回退上一个版本

撤销 git commit

`git reset HEAD^`
or
`git reset --hard HEAD~1`
这将使 HEAD 指向上一个提交，同时更新您的工作目录和索引以反映该更改。注意，这将永久删除最新的提交，因此请确保您不需要保留该更改。
如果您只想撤消最新的提交并将更改保留在工作目录中，请使用以下命令：
`git reset HEAD~1`
这会将 HEAD 指向上一个提交，但是保留您的工作目录中的更改。然后，您可以使用 git checkout 命令撤消特定文件的更改，或者使用 git add 和 git commit 命令将更改重新提交为新的提交。
如果您只想撤消特定提交并将更改保留在工作目录中，请使用以下命令：
git revert <commit-SHA>
这会创建一个新的提交，其中包含回滚指定提交所做的更改。这将使您能够保留历史记录，`并且可以撤消对特定提交的更改而不影响其他提交。`

执行 git reset HEAD~1 命令是将当前分支的 HEAD 指针向后移动一次，也就是回到上一个提交。如果您希望再次将 HEAD 移回到之前的提交，可以使用以下命令：
`git reflog`
这会显示您最近执行的 Git 命令历史记录。找到您想要恢复的提交的哈希值（SHA）并记下它，然后使用以下命令：
git reset <commit-SHA>

简单来说就是 git reset 某个版本 就是回退到这个版本
git revert 某个版本 会创建一个新的 commit
保存当前的 commit 记录的同时会将这个版本的 commit 记录销毁掉

假设我有两条记录都 commit 了分别是 a 改了 a 文件和 b 改了文件
当前 main -> a
此时我从 git revert b 后
此时的状况是 a 文件改动不变 b 文件回到了改动之前的样子
相当于销毁了 b 的 commit

# 代码提交规范

常用的 type 值包括如下:

feat: 添加新功能。
fix: 修复 Bug。
chore: 一些不影响功能的更改。
docs: 专指文档的修改。
perf: 性能方面的优化。
refactor: 代码重构。
test: 添加一些测试代码等等。
