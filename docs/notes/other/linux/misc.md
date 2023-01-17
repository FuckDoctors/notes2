---
category:
  - linux
---

# 杂项

## 更改语言

```shell
# centos
# change locale
sed "s/LANG=\"en_US.UTF-8\"/LANG=\"ja_JP.UTF-8\"/" -i /etc/locale.conf
localedef -i ja_JP -f UTF-8 ja_JP.UTF-8

# setup env
cat << EOF >> /etc/profile
export LANG=ja_JP.UTF-8
export LC_ALL=ja_JP.UTF-8
export LANGUAGE=ja_JP.UTF-8
EOF
```
