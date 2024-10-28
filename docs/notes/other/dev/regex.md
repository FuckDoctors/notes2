---
category:
  - dev
tag:
  - regex
  - 正则表达式
---

# 正则表达式

## 查找不含指定字符串的行

```txt
^(?!指定字符串).*$
```

需求：查找 MyBatis 的 sqlmap 中未指定 `jdbcType` 的参数。

```txt
// 查找以 # 或 $ 开头，且不含 jdbcType 或包含no 或 offset 或 limit 的行
^.*[#\$]\{(?!.*jdbcType)(?!*.no)(?!offset)(?!limit).*$
```
