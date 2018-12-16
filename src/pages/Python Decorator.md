---
title: "Python Decorator"
date: "2018-09-16"
---

```python
from time import time

def make_duration(func):
    def new_func(*args, **kwargs):
        start_time = time()
        result = func(*args, **kwargs)
        end_time = time()
        print('함수가 걸린 시간은: ', end_time - start_time)
        return result
    return new_func


@make_duration
def sum_1_to_n(n):
    result = 0
    for i in range(1, n + 1):
        result += i
    return result


print(sum_1_to_n(12345))


@make_duration
def gauss_sum(n):
    return (n * (n + 1)) / 2


print(gauss_sum(10))

```
