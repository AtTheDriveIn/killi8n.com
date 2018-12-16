---
title: "create-react-app 2 에서 proxy 설정하기"
date: "2018-10-01"
---

안녕하세요~ 이번에 create-react-app 이 새로 배포가 되었는데 무려 메이저 버전이 업데이트되었네요!

첫화면도 업데이트 되어서 뭔가 업데이트한 티가 팍팍나는 이번업데이트네요!

![](https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/post-images/fc82fbfc-fdfc-45c2-8183-359f998404c3.png)

이번에 CHANGELOG에서 발견된 변화는 https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md 에서 볼수있습니다!

이번에 소개할 글은 업데이트 중 proxy 설정하는 법이 바뀌었던데 뭔가 저도 full-stack으로 개발할시 원래는 package.json에서 "proxy" 항목을 넣어줘서 처리를 했지만 이번에는 setupProxy.js 라는 이름의 파일을 만들어서 설정할수 있게되었습니다!

뭔가 nuxt같은 방식으로 바뀌었네요!

# 튜토리얼

일단 http-proxy-middleware 를 설치하고, 테스트 통신을 하기 위해서 axios도 설치해 줍니다.

```bash
$ yarn add http-proxy-middleware axios
```

src폴더 아래에 setupProxy.js 를 다음과 같이 만들어 줍니다.

`src/setupProxy.js`

```js
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api", { target: "http://localhost:4000/" }));
};
```

위와같이 backend 서버가 4000 포트를 쓴다면, http://localhost:4000/ 이 될것입니다.

저는 제 블로그 백엔드 서버를 사용하여서 위와같이 하였습니다.

그런다음, App.js를 다음과 같이 만들어줍니다.

`src/App.js`

```jsx
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    this.testing();
  }

  testing = async () => {
    try {
      const response = await axios.get("/api/post");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

크롬 콘솔창을 보면 다음과 같이 proxy 통신이 됨을 알수있습니다!

![](https://s3.ap-northeast-2.amazonaws.com/s3.images.killi8n.com/post-images/7a5a4b17-5c7b-4a88-8da7-d476490a2041.png)

React에서 setupProxy.js 를 사용하여 proxy를 설정하는 법을 알아보았습니다.
