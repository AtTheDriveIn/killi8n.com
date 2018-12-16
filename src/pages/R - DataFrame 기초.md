---
title: "R - DataFrame 기초"
date: "2018-08-26"
---

> ## DataFrame
>
> 열과 행이 있는 테이블로 이루어져있다.
> 행렬이라기보다는 리스트에 가깝다.
> 일반적으로 벡터의 요인을 열로 갖는다.
> 모든 열의 길이는 동일해야 한다.
> 모든 열은 이름을 가질수 있다.

```R
> BigCompanies <- c("Google", "Apple", "Tesla", "Samsung")
> Boundary <- c("search engine", "device and software", "electronic car", "device and software")
> CompaniesDataFrame <- data.frame(BigCompanies, Boundary)
> CompaniesDataFrame
  BigCompanies            Boundary
1       Google       search engine
2        Apple device and software
3        Tesla      electronic car
4      Samsung device and software

```

data.frame()함수를 사용하여 데이터 프레임 생성.

> ## 접근 방식 1 : \$를 사용하여 이름으로 접근

```R
> CompaniesDataFrame$BigCompanies
[1] Google  Apple   Tesla   Samsung
Levels: Apple Google Samsung Tesla
> CompaniesDataFrame$Boundary
[1] search engine       device and software electronic car      device and software
Levels: device and software electronic car search engine
>
```

> ## 접근 방식 2 : []를 사용하여 접근

```R
> CompaniesDataFrame[1]
  BigCompanies
1       Google
2        Apple
3        Tesla
4      Samsung
> CompaniesDataFrame[[1]]
[1] Google  Apple   Tesla   Samsung
Levels: Apple Google Samsung Tesla
> CompaniesDataFrame[, 1]
[1] Google  Apple   Tesla   Samsung
Levels: Apple Google Samsung Tesla
```

[] 하나일때는 그에 맞는 열을 반환.
[[]] 혹은 [, index] 일 때에는 그 안에 들어있는 값들을 반환.

```R
> CompaniesDataFrame <- data.frame(BigCompanies, Boundary, stringsAsFactors = FALSE)
> CompaniesDataFrame
  BigCompanies            Boundary
1       Google       search engine
2        Apple device and software
3        Tesla      electronic car
4      Samsung device and software
> rbind(CompaniesDataFrame, list("LG", "electronic"))
  BigCompanies            Boundary
1       Google       search engine
2        Apple device and software
3        Tesla      electronic car
4      Samsung device and software
5           LG          electronic
```

rbind()와 cbind()도 사용가능. 허나, dataframe생성시 stringsAsFactors를 FALSE로 해야 없는 레벨의 값도 추가 가능.
