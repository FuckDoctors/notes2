---
article: true
date: 2024-09-01
category:
  - edu
  - 小学
tag:
  - edu
  - 教育
  - 语文
  - 二年级

head:
  - - meta
    - name: description
      content: 二年级语文下上册 识字
---

# 二年级语文上册 卡片

:::info
为了发音迅速，优先使用浏览器自带的特性实现，推荐使用最新的 Edge 浏览器。

卡片设计参考自己购买的实体卡片。
:::

## 1.小蝌蚪找妈妈

<HanziCard zi="找" :zuci="['查找', '寻找', '找一找']" />
<HanziCard zi="两" :zuci="['两个', '两天', '两人']" />
<HanziCard zi="哪" pinyin="nǎ" :zuci="['哪里', '哪些', '哪个']" />
<HanziCard zi="宽" :zuci="['宽大', '宽广', '宽阔']" />
<HanziCard zi="顶" :zuci="['山顶', '顶点', '顶尖', '顶端']" />
<HanziCard zi="眼" :zuci="['眼光', '眼泪', '天眼']" />
<HanziCard zi="睛" :zuci="['眼睛', '目不转睛']" />
<HanziCard zi="肚" pinyin="dù" :zuci="['肚子', '肚皮']" />
<HanziCard zi="皮" :zuci="['皮毛', '皮肤', '皮包']" />
<HanziCard zi="跳" :zuci="['跳远', '跳高', '跳跃']" />

<HanziCard zi="塘" :zuci="['池塘', '水塘', '鱼塘', '荷塘']" />
<HanziCard zi="脑" :zuci="['大脑', '脑门']" />
<HanziCard zi="袋" :zuci="['口袋', '衣袋', '袋子', '袋鼠']" />
<HanziCard zi="灰" :zuci="['灰色', '灰尘']" />
<HanziCard zi="哇" :zuci="['好哇', '走哇']" />
<HanziCard zi="教" pinyin="jiāo" :zuci="['教书', '教课']" />
<HanziCard zi="教" pinyin="jiào" :zuci="['教导', '教育']" />
<HanziCard zi="捕" :zuci="['捕捉', '捕食']" />
<HanziCard zi="迎" :zuci="['欢迎', '迎接', '迎风', '迎面']" />
<HanziCard zi="阿" pinyin="ā" :zuci="['阿姐', '阿妹']" />
<HanziCard zi="姨" :zuci="['阿姨', '小姨']" />
<HanziCard zi="龟" pinyin="guī" :zuci="['乌龟', '龟甲']" />
<HanziCard zi="披" :zuci="['披风', '披着']" />
<HanziCard zi="鼓" :zuci="['鼓动', '打鼓', '鼓励']" />

## 待补充 <Badge text="待补充" type="tip" />

欢迎有需要的人补充（评论或邮件）~~~

格式如下：

为了更好的配合教材，请按 `方式 2` 补充，自动生成的拼音（多音字），组词，成语之类的不是特别好。

更多详细信息，请参考 [学习汉字](./learn-HanziCard.md)。

```vue
<!-- 方式 1 -->
<HanziCard zi="风" />
<!-- 方式 2 -->
<HanziCard
  zi="风"
  pinyin="fēng"
  jiegou="独体字"
  :zuci="['风雨', '风云', '大风', '东风']"
  :chengyu="['一帆风顺', '风口浪尖', '风云人物', '风吹云散']"
/>
```
