---
title: "RStudio로 csv를 transaction으로 읽기"
date: "2018-08-21"
---

일단 연관 규칙 분석을 하기 위해 패키지를 설치해야 한다.

```r
install.packages("arules")
install.packages("arulesSequences")
install.packages("arulesViz")
install.packages("wordcloud")
```

설치 후 library함수로 워크스페이스로 불러오자.

```r
library(arules)
library(arulesSequences)
library(arulesViz)
library(wordcloud)
```

아래와 같은 두 데이터가 csv파일로 있다.

> "Transaction_Sample_Basket.csv"

```text
A,B,C,,
A,C,D,E,
A,E,B,,
B,C,D,,
F,A,B,,
A,D,F,G,
G,F,B,C,E
A,B,,,
C,D,,,
C,F,G,,
```

> "Transaction_Sample_Single.csv"

```text
Tr1 A
Tr1 B
Tr1 C
Tr2 A
Tr2 C
Tr2 D
Tr2 E
Tr3 A
Tr3 E
Tr3 B
Tr4 B
Tr4 C
Tr4 D
Tr5 F
Tr5 A
Tr5 B
Tr6 A
Tr6 D
Tr6 F
Tr6 G
Tr7 G
Tr7 F
Tr7 B
Tr7 C
Tr7 E
Tr8 A
Tr8 B
Tr9 C
Tr9 C
Tr10 C
Tr10 C
Tr10 G

```

이 데이터 파일을 transaction으로 변경해보자.

```r
read.transactions("Transaction_Sample_Basket.csv",
				format="basket",
                sep=",",
                rm.duplicates=TRUE)

inspect(tmp_basket)

read.transactions("Transaction_Sample_Single.csv",
				format="single",
                sep=",",
                rm.duplicates=TRUE)

inspect(tmp_basket)
```

## 설명을 덧붙이자면, Basket은 영수증과 같은 형태로 나오는형태이다.

## 영수증 과 같이 행 하나가 구매 목록이 된다

## 또한, single 형태는 그 영수증에 있는 행하나의 아이템을 각각 1개씩 매칭시켜 만든 형태이다.

> 따라서 결과값은 아래와 같다
> Basket형태>

```text
     items
[1]  {A,B,C}
[2]  {A,C,D,E}
[3]  {A,B,E}
[4]  {B,C,D}
[5]  {A,B,F}
[6]  {A,D,F,G}
[7]  {B,C,E,F,G}
[8]  {A,B}
[9]  {C,D}
[10] {C,F,G}

```

> 따라서 결과값은 아래와 같다
> Single형태>

```text
     items       transactionID
[1]  {A,B,C}     Tr1
[2]  {C,G}       Tr10
[3]  {A,C,D,E}   Tr2
[4]  {A,B,E}     Tr3
[5]  {B,C,D}     Tr4
[6]  {A,B,F}     Tr5
[7]  {A,D,F,G}   Tr6
[8]  {B,C,E,F,G} Tr7
[9]  {A,B}       Tr8
[10] {C}         Tr9
```
