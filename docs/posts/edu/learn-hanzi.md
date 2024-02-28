---
article: true
date: 2024-02-28
category:
  - edu
tag:
  - edu
  - 教育

head:
  - - meta
    - name: description
      content: 汉字学习
---

# 学习汉字

## 背景

家有小学生，为了让这位小学生有事做，准备给他布置点作业，文库搜到了一个别人整理的小学一年级下的汉字生词，觉得挺好。

但是，下载要收费。。。遂自己尝试做了个简单的学习汉字的小程序，放这里给孩他妈看一下效果。

## 功能

原来想用 [`hanzi-writer`](https://hanziwriter.org/) 实现，但是偶然发现 [`cnchar`](https://theajack.github.io/cnchar/) 更符合要求，所以用 [`cnchar`](https://theajack.github.io/cnchar/) 实现了，在此感谢~

展示汉字的拼音，部首，结构，笔划，以及生成练字帖功能。
同时，可以展示汉字发音，书写笔划，以及汉字临摹功能。
另外，也可以打印出来，方便孩子学习。

## 简单效果

<Hanzi zi="春" :zuci="['春风', '春雨', '春天', '春日']" />
<Hanzi zi="冬" />
<Hanzi zi="风" jiegou="独体字" :zuci="['风雨', '风云', '大风', '东风']" />
