---
category:
  - tools
---

# git 小提示

设置用户：

```shell
git config user.email "413853119@qq.com"
git config user.name "ZhaoBin"
```

修改最后一次 commit 的用户信息:

```shell
git commit --amend --author="ZhaoBin <413853119@qq.com>" --no-edit
```

最近几次提交变基：

```shell
# 最近3次提交变基
git rebase -i HEAD~3
```
