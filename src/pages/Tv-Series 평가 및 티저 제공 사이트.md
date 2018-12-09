---
title: "Tv-Series 평가 및 티저 제공 사이트"
date: "2018-08-24"
---

이번에 올릴 제가 만든 프로젝트는 tv-series 평가 및 티저 제공 사이트 입니다.

일단 이것을 만들게 된 동기는 , https://github.com/vlpt-playground/react-styled-tvseries 에 벨로퍼트님이 아주 좋은 디자인을한 견본을 만들어 올려주셨는데, 그냥 삘받아서 만들어 보았다.

뭔가 백엔드 구성하고 할때가 재밌을거 같았다.

일단 소개부터 하자면, 이렇다.
메인화면에서는 전체 목록중 좋아요가 많은순 4개, 최신순 4개 로 나열된다.
여기서 최신순은 에디터로 관리자가 올린 날짜를 기준으로 한다.

디테일 화면에서는 좋아요 및 싫어요를 누를수있고, 그것을 바탕으로 바형태의 지표가 나타난다.

> 메인화면

![](https://i.imgur.com/s8Hk8pR.png)

> 디테일 화면

![Imgur](https://i.imgur.com/2Do2Jot.png)

![Imgur](https://i.imgur.com/bhPX5op.png)
![Imgur](https://i.imgur.com/5Ghg978.png)

> 에디터 화면

![Imgur](https://i.imgur.com/VXeBH01.png)
![Imgur](https://i.imgur.com/2m8vBiC.png)

에디터에서 사진과 여러 컨텐츠들을 올리면, 메인화면에서 볼수 있는 형식이다.
나름 관리자 형태를 구현하기위해 회원제도를 도입했다.

처음 가입한 사람이 관리자가 되는 형태이고, 관리자 외에는 글을 올릴수 없다.

뭐 나름 태그 제도도 도입하여 태그별로 나열하여 볼수있기도 하다.

아래와 같다.

> 태그별 / 리스트

![Imgur](https://i.imgur.com/fxujXv2.png)
![Imgur](https://i.imgur.com/7COYn9c.png)

뭐 그외 사항은 https://github.com/killi8n/tv-series
에서 모두 열람할수 있습니다.
감사합니다.
