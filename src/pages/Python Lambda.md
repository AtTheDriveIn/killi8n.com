---
title: "Python Lambda"
date: "2018-09-14"
---

1. 2의 배수이면 True, 아니면 False 를 리턴하는 람다

```python
print((lambda x: True if x % 2 == 0 else False)(33))
```

2. 들어온 모든 인자들을 더해서 리턴하는 람다.

```python
print((lambda *x: sum(x))(1, 2, 3, 4, 5))
```
