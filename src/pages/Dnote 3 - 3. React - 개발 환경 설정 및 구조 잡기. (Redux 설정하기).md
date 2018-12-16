---
title: "Dnote 3 - 3. React - 개발 환경 설정 및 구조 잡기. (Redux 설정하기)"
date: "2018-09-16"
---

기본적인 스타일과 구조를 잡았으니, 이제 리덕스를 설정해야겠습니다.

리덕스는 글로벌하게 상태관리를 할수있게 도와주는 도구라고 생각하는데요, 딱히 복잡하지 않은 프로젝트에서는 굳이 리덕스를 사용하지 않아도 된다고 생각합니다. 허나 저는 API통신을 할 것이고, 평소에 리덕스를 사용해왔기 때문에, 리덕스 스토어에서 전체 상태를 관리할 예정입니다.

또한 이 튜토리얼의 리덕스는 redux-observable을 사용합니다. rxjs의 개념이 도입된 라이브러리 인데요, rxjs의 개념을 가지고 계신 분들이라면 충분히 따라오실수 있고, 만약 아니라도, API통신에만 rxjs가 사용되므로, 각자 궁금하신 부분들은 https://redux-observable.js.org/ 이 페이지에서 학습하셔도 금방 따라오실수 있을거라고 생각합니다.

자 그럼 이제부터 리덕스 설정을 해보겠습니다.

store폴더 밑에 modules 폴더를 생성해주세요.

그리고 일단 redux-devtools로 띄워봐야 하니, 간단하게 modules 밑에 ping.js라는 파일을 생성해서 스테이트를 생성해보겠습니다.

그전에 리덕스 설정에 필요한 라이브러리들을 다운로드 해줘야합니다.

```bash
$ yarn add redux react-redux redux-observable rxjs rxjs-compat
```

`store/modules/ping.js`

```js
const PING = "PING";

// 기본적인 상태 값들을 정의해줍니다. 각 모듈마다 필요한 상태들을 변수로 선언하여, 하나의 object를 만들어서 관리합니다.
// 이곳에서는 테스트이므로, 간단하게 ping 이라는 변수를 초기값을 "ping"을 주어 선언하였습니다.
const initialState = {
  ping: "ping"
};

// action type들에 따라서 switch 문으로 걸러줍니다. action type에 맞는 각 action들이 실행될때에, action이라는
// 값 안에 들어있는 여러가지 payload 들을 사용하여 state를 변경시켜줍니다.
export const ping = (state = initialState, action) => {
  switch (action.type) {
    case PING:
      return {
        ping: "pong"
      };
    // 이곳에서는 ping 이 원래 "ping"이었는데, "pong"으로 변경시켜주었습니다.
    // PING이라는 action type이 실행될때에, state가 변경됩니다.
    default:
      return state;
    // action type에 걸러지지 않은 액션이 일어났을때에는 그냥 현재의 state값을 반환합니다.
  }
};
```

그리고 modules밑에 index.js를 생성해주세요. 다음과 같이 작성해줍니다.

`modules/index.js`

```js
import { ping } from "./ping";
import { combineReducers } from "redux";

// 리듀서(모듈)들을 하나로 모아서 export 하여 configure.js에서 사용할수 있게 합니다.

export const rootReducers = combineReducers({ ping });
```

다음으로 store밑에 configure.js 를 생성해주세요.

`store/configure.js`

```js
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { rootReducers } from "./modules";

// 크롬 데브 툴스 설정입니다.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

// reducer들을 모두 모아서 하나의 리덕스 스토어를 만들어줍니다.
// redux-observable을 사용하기 때문에, epicMiddleware를 적용했습니다.
export default createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(epicMiddleware))
);
```

그리고 Root.js에서 다음과 같이 코딩해줍니다.

`Root.js`

```jsx
import React from "react";
import App from "components/App";
import { Provider } from "react-redux";
// store를 제공하는 역할을 합니다. 전체 앱을 Provider로 감싸줍니다.
import store from "store/configure";

const Root = () => {
  return (
    // store를 props로 주입해줍니다.
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default Root;
```

크롬 devtools에서 표식이 뜨면서 개발자 도구를 눌러서 보면 다음과 같이 뜨나요?? _ 혹시 크롬 데브툴스가 없다면, redux-devtools로 검색하셔서 웹스토어 추가 해주시면 됩니다. _

![Imgur](https://i.imgur.com/EbTU21N.png)

기본적인 리덕스 설정이 끝났습니다!
