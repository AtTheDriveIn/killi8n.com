---
title: "rem 과 em"
date: "2018-07-26"
---

웹개발을 할때 css에서 쓰이는 단위는 여러개가 있죠.

저는 큰 컴포넌트들이나 화면 비율을 맞출 때에는 px(픽셀)을 많이 씁니다.

그리고, 나머지 많이 쓰는 단위는 rem 인데요, em 이라는 단위도 있죠.

저는 em은 써보진 않은거 같은데요, rem과 em, 무슨 차이가 있는지
한번 알아 보겠습니다..

### rem

rem은 자신의 최상위 요소에서 값을 곱하는 형식입니다.

html은 tag 형식으로 상위요소에서 하위요소로 이루어져 있죠.

예를들면,

```html
<html>
  <body>
    <mine></mine>
  </body>
</html>
```

이런식으로 최상위 요소가 html태그 이며, 그다음은 body태그, 그다음은 mine태그라고 할수 있죠.

만약 여기서 css 파일이 이렇게 구성되어 있다고 가정해봅시다.

```css
html {
  font-size: 16px;
}

body {
  font-size: 32px;
}

mine {
  font-size: 2rem;
}
```

rem은 무조건 최상위 요소의 크기와 비교하므로, html의 font-size인 16px와 비교하게 됩니다.
2 rem 이므로, 2 \* 16px = 32px 가 되겠네요.

> ### rem은 무조건 자기의 최상위 요소의 크기와 비교하여 계산.

### em

그렇다면 em은 어떨까요?

위와 같이 다시 예를 들어보겠습니다.

### html 파일

```html
<html>
  <body>
    <mine></mine>
  </body>
</html>
```

### css파일

```css
html {
  font-size: 16px;
}

body {
  font-size: 32px;
}

mine {
  font-size: 2em;
}
```

em은 자신의 바로 상위 요소와 비교합니다.
따라서 html태그의 font-size요소와 비교할 필요없이,
바로 body태그의 font-size요소와만 비교 합니다.

따라서 32px \* 2 = 64px 가 되겠네요.

다른 예를 들어볼까요?

위와 같은 html파일에 css파일이 다음과 같다고 가정합시다.

### css 파일 2

```css
html {
  font-size: 16px;
}

body {
  font-size: 3em;
}

mine {
  font-size: 2em;
}
```

mine의 pixel로 따진 폰트 크기는 16px _ 3 _ 2 = 96px 가 되겠네요.

만약 이렇다면 어떨까요?

### css 파일 3

```css
html {
  font-size: 16px;
}

body {
  font-size: 4rem;
}

mine {
  font-size: 2em;
}
```

일단 body의 폰트 크기는 16px \* 4 = 64px 입니다.
따라서 mine의 폰트크기는 그의 2배인 128pixel이 되겠네요.

마지막 예제입니다.

### css 파일 4

```css
html {
  font-size: 16px;
}

body {
  font-size: 4em;
}

mine {
  font-size: 2rem;
}
```

mine: 2 _ 16px = 32px.
body: 4 _ 16px = 64px.

> ### em은 자신의 상위 요소와 값을 비교한다.
