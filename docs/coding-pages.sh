#!/usr/bin/env sh

set -e

git config --global user.email "zhbchwin@163.com"
git config --global user.name "ZhaoBin"

cd docs/.vuepress/dist

git init
git add -A
git commit -m "Deploying docs [ci skip] at $(TZ='Asia/Shanghai' date "+%Y-%m-%d %H:%M:%S %z")"

# e.coding.net
# touch ~/.ssh/known_hosts
# ssh-keyscan -H e.coding.net >> ~/.ssh/known_hosts
# git push -f git@e.coding.net:fuckdoctors/notes.git master:master
git push -f https://$CODING_USERNAME:$CODING_TOKEN@e.coding.net/fuckdoctors/notes.git master:master

cd -
rm -rf docs/.vuepress/dist
