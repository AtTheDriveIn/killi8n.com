---
title: "R 기초 - List"
date: "2018-08-24"
---

# List?

1. 리스트는 이질적이다. 즉, 서로 다른 모드가 가능하다.
2. 리스트나 데이터 프레임과 같이 구조화된 다른 객체들도 포함시킬수 있다.
3. 리스트는 위치로 인덱스 된다. 단일 원소를 참조할때는 대괄호 두개, 복수 원소를 참조할때는 대괄호 하나
4. 리스트는 이름을 가질수 있다

```r
> listA <- list(1, 2, "a")
> print(listA)
[[1]]
[1] 1

[[2]]
[1] 2

[[3]]
[1] "a"

> listA[[1]]
[1] 1
> listA[c(1, 2)]
[[1]]
[1] 1

[[2]]
[1] 2

> names(listA)
NULL
> names(listA) <- c("First", "Second", "Third")
> listA
$First
[1] 1

$Second
[1] 2

$Third
[1] "a"

> listA[["Third"]]
[1] "a"
> listA$Third
[1] "a"
```

위와 같이 Tag, 즉 \$ 싸인을 써서 호출할수도 있다.

```r
> A <- list(name="Killi8n", salary=10000, union = TRUE)
> A
$name
[1] "Killi8n"

$salary
[1] 10000

$union
[1] TRUE

> A$name
[1] "Killi8n"
> A$salary
[1] 10000
> A$union
[1] TRUE
```

리스트를 만든후 Tag로 호출해보았다.

> 리스트에 원소 추가 / 삭제

추가는 새로운 이름을 사용
제거는 NULL 이용

```r
> C <- vector(mode="list")
> C
list()
> C[["name"]] <- "Killi8n"
> C[["salary"]] <- 10000
> C[["union"]] <- TRUE
> C
$name
[1] "Killi8n"

$salary
[1] 10000

$union
[1] TRUE

C$office <- "frontier"

C$union <- NULL
```

새로운 이름을 사용하여 리스트에 값을 추가했다.
NULL을 사용하여 값을 제거하였다.

> unlist()함수를 사용하여 리스트를 해제할수 있다. 즉 단일 원소로 값을 볼수 있다.

```r
> tmplist <- list(a = list(1:5, c("a", "b", "c")), b="Z", c=NA)
> tmplist
$a
$a[[1]]
[1] 1 2 3 4 5

$a[[2]]
[1] "a" "b" "c"


$b
[1] "Z"

$c
[1] NA

> unlist(tmplist)
 a1  a2  a3  a4  a5  a6  a7  a8   b   c
"1" "2" "3" "4" "5" "a" "b" "c" "Z"  NA
> unlist(tmplist, use.names = FALSE)
 [1] "1" "2" "3" "4" "5" "a" "b" "c" "Z" NA
```

> lapply()와 sapply()

laaply는 리스트로 반환,
sapply는 벡터로 반환.

```r
> A <- list(1:3, 25:29)
> A
[[1]]
[1] 1 2 3

[[2]]
[1] 25 26 27 28 29

> lapply(A, median)
[[1]]
[1] 2

[[2]]
[1] 27

> sapply(A, median)
[1]  2 27
```
