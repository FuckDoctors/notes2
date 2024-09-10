---
article: true
sidebar: false
toc: false
containerClass: 'wide-content'
date: 2024-05-13
category:
  - edu
  - 小学
tag:
  - edu
  - 教育
  - 语文
  - 一年级

head:
  - - meta
    - name: description
      content: 一年级语文下册 识字卡片

cover: /assets/edu/yuwen-1-xia-card.png
---

# 一年级语文下册识字卡片 <Badge text="待补充" type="tip" />

:::info
为了发音迅速，优先使用浏览器自带的特性实现，推荐使用最新的 Edge 浏览器。

卡片设计参考自己购买的实体卡片。
:::

<HanziCard zi="春" :zuci="['春风', '春雨', '春天', '春日', '春节']" />
<HanziCard zi="冬" :bihua="['撇', '横撇', '捺', '点', '点']" :zuci="['冬天', '立冬', '冬雪', '冬日']" />
<HanziCard zi="风" pinyin="fēng" jiegou="独体字" :zuci="['风雨', '风云', '大风', '东风', '风衣', '风霜', '风吹雨打']" />
<HanziCard zi="雪" :bihua="['横', '点', '横钩', '竖', '点', '点', '点', '点', '横折', '横', '横']" :zuci="['雪花', '雨雪', '风雪', '雪人']" />
<HanziCard zi="花" :zuci="['雪花', '花生', '开花', '水花', '烟花']" />
<HanziCard zi="飞" :zuci="['飞虫', '飞走', '飞机', '飞人', '飞鱼']" />
<HanziCard zi="入" :zuci="['出入', '入口', '入门', '进入']" />

<HanziCard zi="姓" :zuci="['姓氏', '姓名', '百姓']" />
<HanziCard zi="什" pinyin="shén" :zuci="['什么', '为什么']" />
<HanziCard zi="么" :zuci="['什么', '为什么', '多么', '那么', '怎么', '要么']" />
<HanziCard zi="双" :bihua="['横撇', '点', '横撇', '捺']" :zuci="['双人', '双手', '双方', '双向', '成双成对']" />
<HanziCard zi="国" :zuci="['中国', '国家', '国王', '国土']" />
<HanziCard zi="王" pinyin="wáng" :zuci="['王子', '国王', '女王', '大王']" />
<HanziCard zi="方" :zuci="['大方', '方向', '对方', '方圆', '方方面面']" />

<HanziCard zi="青" :zuci="['青草', '青天', '青色', '青蛙']" />
<HanziCard zi="清" :zuci="['清明', '一清二白', '清水', '清澈', '清楚', '清洗']" />
<HanziCard zi="气" :zuci="['天气', '力气', '生气', '空气']" />
<HanziCard zi="晴" :zuci="['晴天', '晴日', '晴空']" />
<HanziCard zi="情" :bihua="['点', '点', '竖', '横', '横', '竖', '横', '竖', '横折钩', '横', '横']" :zuci="['友情', '心情', '事情']" />
<HanziCard zi="请" :zuci="['请问', '请客', '回请', '请教']" />
<HanziCard zi="生" :zuci="['学生', '生气', '出生', '生日', '生病']" />

<HanziCard zi="字" :zuci="['生字', '文字', '字谜', '汉字', '识字']"  />
<HanziCard zi="左" :zuci="['左右', '左手', '左边']"  />
<HanziCard zi="右" :zuci="['左右', '右手', '右边']"  />
<HanziCard zi="红" pinyin="hóng" :zuci="['红花', '红火', '红色', '红旗']"  />
<HanziCard zi="时" :zuci="['时间', '有时', '时光', '时候']"  />
<HanziCard zi="动" :zuci="['生动', '活动', '开动', '动画', '动作', '主动']"  />
<HanziCard zi="万" pinyin="wàn" :zuci="['万里', '千万', '万一']"  />

<HanziCard zi="见" pinyin="jiàn" :zuci="['看见', '听见']"  />
<HanziCard zi="长" pinyin="zhǎng" :zuci="['成长', '长大']"  />

## 待补充 <Badge text="待补充" type="tip" />

欢迎有需要的人补充（评论或邮件）~~~

格式如下：

为了更好的配合教材，请按 `方式 2` 补充，自动生成的拼音（多音字），组词，成语之类的不是特别好。

更多详细信息，请参考 [学习汉字](./learn-hanzi.md)。

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
