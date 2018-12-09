---
title: "R - 연관 규칙 데이터를 시각화 해보기"
date: "2018-08-24"
---

```r
data("Groceries")  # Groceries를 데이터화 한다
summary(Groceries) # Groceries 데이터를 살펴보기

```

> 결과

```r
transactions as itemMatrix in sparse format with
 9835 rows (elements/itemsets/transactions) and
 169 columns (items) and a density of 0.02609146
```

9835 by 169 형태의 데이터가 나온다.
단 2.6% 만이 1의 값을 갖는다.

```r
groceries_df <- as(Groceries, "data.frame")
# Groceries를 Data Frame으로 변환하여 변수에 담기
itemName <- itemLabels(Groceries)
# Groceries의 아이템 이름들을 담는다.
itemCount <- itemFrequency(Groceries) * dim(Groceries)[1]
# dim(Groceries)[1]은 행의 수를 나타낸다.
# 따라서 각 아이템들의 빈도수를 나타낸다.
```

일단 wordcloud로 단어별 시각화를 실시하기 위해 나타낼 색깔을 변수에 담자.

brewer라는 패키지가 필요하다.

다음 패키지들을 모두 library 해주자.

```r
install.packages("arules")
install.packages("arulesSequences")
install.packages("arulesViz")
install.packages("wordcloud")

library(arules)
library(arulesSequences)
library(arulesViz)
library(wordcloud)
```

```r
col <- brewer.pal(8, "Dark2")
# 색상 값 배열에 담기

wordcloud(
			words = itemName,
			freq = itemCount,
            min.freq = 1,
            scale = c(3, 0.2),
            col = col,
            random.order = FALSE
         )
```

words: itemName, 즉 아이템 레이블이 들어간다.
freq: 아까 설정해준 빈도수
min.freq: 최소 빈도수 , 그 미만의 빈도수 포함하지 않음.
scale: 단어의 최고와 최소 크기
col: colors
random.order: false가 되면 빈도수가 높은것부터 나오는거 같다.

![Imgur](https://i.imgur.com/NJFyRIB.png)

이번엔 Bar형태로 나타내보자.

```r
itemFrequencyPlot(Groceries, support = 0.05, cex.names = 0.8)
```

지지도가 0.05이상인 것들만 나타내는 plot이다. cex.names는 밑 레이블의 크기를 나타낸다.

![Imgur](https://i.imgur.com/gshsl0c.png)

```r
rules <- apriori(Groceries,
				parameter = list(support=0.01, confidence = 0.35))
```

연관 규칙을 담는다. 지지도는 0.01 이상, 신뢰도는 0.35이상인것들만 담는다.

```r
plot(rules, method="scatterplot")
# apriori rule을 scatterplot형태로 시각화
```

![Imgur](https://i.imgur.com/O51heGu.png)

```r
plot(rules, method="matrix")
# apriori rule을 matrix 형태로 시각화
```

![Imgur](https://i.imgur.com/d9WrULk.png)

```r
rules <- apriori(Groceries,
				parameter=list(support=0.01, confidence=0.5))
```

지지도 0.01이상, 신뢰도 0.5 이상의 apriori rule 생성. 아까보다 생성된 아이템의 개수가 훨씬 줄것이다. 이유는 신뢰도가 증가했기때문.

15개로 줄었다.

```r
plot(rules, method="graph")
# graph형태 시각화
plot(rules, method="paracoord")
# paracoord 형태 시각화
```

![Imgur](https://i.imgur.com/2NcQKXR.png)
![Imgur](https://i.imgur.com/WsSCsVl.png)
