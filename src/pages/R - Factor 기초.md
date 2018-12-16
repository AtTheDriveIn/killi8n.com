---
title: "R - Factor 기초"
date: "2018-08-26"
---

> ## Factor
>
> R에서의 Factor는 벡터에 추가정보가 더해진 것이다.

추가정보는 레벨 이라고도 한다.
팩터의 길이는 레벨의 길이가 아닌 데이터의 길이로 정의된다.
새로운 레벨을 추가 가능하다.
기존에 존재하지 않는 레벨을 추가할 경우 NA(물리적으로 존재하지만 값은 없다.) 처리

```R
> x <- c(1, 2, 3, 3)
> xf <- factor(x)
> xf
[1] 1 2 3 3
Levels: 1 2 3
> str(xf)
 Factor w/ 3 levels "1","2","3": 1 2 3 3
> unclass(xf)
[1] 1 2 3 3
attr(,"levels")
[1] "1" "2" "3"
> length(xf)
[1] 4
```

```R
> xff <- factor(x, levels = c(1, 2, 3, 4))
> xff
[1] 1 2 3 3
Levels: 1 2 3 4
> xff[2]
[1] 2
Levels: 1 2 3 4
> xff[2] <- 90
Warning message:
In `[<-.factor`(`*tmp*`, 2, value = 90) :
  invalid factor level, NA generated
> xff
[1] 1    <NA> 3    3
Levels: 1 2 3 4
> xff[2] <- 4
> xff
[1] 1 4 3 3
Levels: 1 2 3 4

```

> ## Factor에 함수 적용하기

### tapply() 함수

빈도표 사용시 유용
두개 이상의 팩터에도 적용 가능

```R
> ages <- c(12, 33, 24, 34, 44, 55, 43, 22, 32)
> divideDecade <- c("10", "30", "20", "30", "40", "50", "40", "20", "30")
> tapply(ages, divideDecade, mean)
  10   20   30   40   50
12.0 23.0 33.0 43.5 55.0
>
```

10대, 20대, ... 별로 나누어서 중간 값을 구해준다. (mean)

```R
> gender <- c("M", "M", "F", "F", "M", "F")
> ages <- c(23, 42, 33, 41, 30, 55)
> income <- c(55500, 33300, 22200, 43200, 40000, 10000)
> tmp <- data.frame(gender, ages, income)
> tmp
  gender ages income
1      M   23  55500
2      M   42  33300
3      F   33  22200
4      F   41  43200
5      M   30  40000
6      F   55  10000
> tmp$over40 <- ifelse(tmp$age > 40, 1, 0)
> tmp$over40
[1] 0 1 0 1 0 1
> tapply(tmp$income, list(tmp$gender, tmp$over40), mean)
      0     1
F 22200 26600
M 47750 33300
```

임의로 성별과 나이를 입력한 벡터를 만들어놓고 그에 대응되는 income 벡터를 성한다. 그리고 그 값들을 모두 dataframe으로 만든다.

40살이 넘는 사람들을 구분하기 위해 ifelse를 사용하였다. tmp의 over40이라는 열에 추가.

그 후 성별과 40살이 넘는 사람을 기준으로 income의 중간값을 구한다.

> ## split() 함수

그룹을 만드는데 사용. 두개이상의 팩터에도 적용가능

```R
> split(tmp$income, list(tmp$gender, tmp$over40))
$F.0
[1] 22200

$M.0
[1] 55500 40000

$F.1
[1] 43200 10000

$M.1
[1] 33300
```

그룹별로 벡터를 만들어 보여준다.
