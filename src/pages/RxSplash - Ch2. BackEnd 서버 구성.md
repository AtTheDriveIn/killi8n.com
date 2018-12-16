---
title: "RxSplash - Ch2. BackEnd 서버 구성."
date: "2018-09-29"
---

이번 강좌에서는 Unsplash API를 사용하여 Backend를 구성해보겠습니다.
이번에는 TypeScript를 사용해볼까 합니다.

```bash
mkdir RxSplash-Backend
cd RxSplash-Backend
yarn init -y
```

`package.json`

```js
{
  "name": "RxSplash-Backend",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "tslint": "^5.10.0",
    "tslint-config-airbnb": "^5.9.2",
    "tslint-config-prettier": "^1.13.0",
    "typescript": "^2.9.2"
  }
}

```

일단 보일러 플레이트를 만들기위해 다음과 같은 package.json을 만들어주시고, yarn 을 해주세요.

`tsconfig.json`

```js
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "lib": [
      "es2015"
    ] /* Specify library files to be included in the compilation. */,
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./dist" /* Redirect output structure to the directory. */,
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}


```

위와같이 tsconfig.json도 작성해줍니다.

`tslint.json`

```js
{
  "defaultSeverity": "error",
  "extends": ["tslint-config-airbnb", "tslint-config-prettier"],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}

```

lint도 작성합니다.

그리고 다시 package.json으로 돌아와서 script명령어를 추가해줍니다.

`package.json`

```js
{
  "name": "RxSplash-Backend",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "start": "cross-env NODE_PATH=src node src",
    "start:dev": "cross-env NODE_PATH=dist nodemon --watch dist/ dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "tslint": "^5.10.0",
    "tslint-config-airbnb": "^5.9.2",
    "tslint-config-prettier": "^1.13.0",
    "typescript": "^2.9.2"
  }
}

```

이에 앞서, nodemon과 cross-env가 설치되어 있지 않다면,

```bash
yarn global add nodemon cross-env
```

로 설치하여 주세요.

그런다음, koa 서버 모듈들을 다운받아주세요.

```bash
yarn add koa koa-router koa-bodyparser
```

typescript 같은 경우는, typescript를 지원하는 모듈이 있다면 같이 받아야 합니다. 따라서,

```bash
yarn add --dev @types/koa @types/koa-router @types/koa-bodyparser
```

를 같이 추가해줍니다.

일단 index.ts를 작성해보겠습니다.
src 디렉터리를 생성후, index.ts를 생성해주세요.

`src/index.ts`

```javascript
import Koa from "koa";
import Router from "koa-router";

const port = 4000;

const app = new Koa();
const router = new Router();

router.get("/", ctx => {
  ctx.body = "hi!";
  ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.info("app is running on port", port);
});
```

실행을 하려면 먼저 build를 watch한후에(src내의 ts파일들이 변경되어 저장될때마다 자동 build하여 js로 변환), 서버를 스타트 해야합니다.

따라서 터미널이 두개 필요합니다.

```bash
yarn build:watch

yarn start:dev
```

로 실행하여주세요.

이렇게 되면 일단, localhost:4000/ 에 접속시 hi! 가 뜨게 됩니다.

그리고 저희는 npm에서 unsplash-js 라는 모듈을 다운받아 이용할 예정이므로,

```bash
yarn add unsplash-js
```

를 실행하여 주세요.

## 참고용 unsplash-js npm 사이트

https://www.npmjs.com/package/unsplash-js

그다음 이제 https://unsplash.com/developers 이쪽으로 들어가서, 회원가입을 한후, 앱을 하나 생성해주세요.

저희가 필요한것은 Access Key, Secret key, Redirect URI 입니다.

자 이제 앱을 만들었다면, src/api 폴더를 하나 생성한후, 그 안에 index.ts를 생성해줍니다. 그리고 src/api/unsplash 폴더를 생성후, 그 안에 index.ts와 unsplash.ctrl.ts 를 생성해줍니다.

일단 unsplash.ctrl.ts에서 기본적인 코딩을 해보겠습니다.

`src/api/unsplash/unsplash.ctrl.ts`

```javascript
import Unsplash, { toJson } from "unsplash-js";
import { Context } from "koa";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const unsplash = new Unsplash({
  applicationId: "{Access Key}",
  secret: "{Secret Key}",
  callbackUrl: "{Redirect URI}"
});

export const getPhotoList = async (ctx: Context) => {
  const { page = 1, perPage = 15, orderBy = "latest" } = ctx.request.query;

  await unsplash.photos
    .listPhotos(page, perPage, orderBy)
    .then(toJson)
    .then((json: any) => {
      ctx.body = json;
      ctx.status = 200;
    });
};
```

이때 unsplash-js 라는 모듈은 typescript를 지원하지 않으므로,
`src/declaration.d.ts`

```js
declare module "unsplash-js";
```

위와같이 선언 해줍니다.

`src/api/unsplash/index.ts`

```js
import Router from "koa-router";
import { getPhotoList } from "./unsplash.ctrl";

const router = new Router();

router.get("/list", getPhotoList);

export default router;
```

`src/api/index.ts`

```js
import Router from "koa-router";
import unsplash from "./unsplash";

const router = new Router();

router.use("/unsplash", unsplash.routes());

export default router;
```

`src/index.ts`

```js
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import api from "./api";

const port = 4000;

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.use("/api", api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.info("app is running on port", port);
});
```

이렇게 한후 localhost:4000/api/unsplash/list 로 통신을해보면, json으로 된 정보들이 날라오는것을 볼수있습니다.

또한 다음 페이지와 페이지당 받을 건수를 수정할수도 있죠.

http://localhost:4000/api/unsplash/list?page=2&perPage=10&orderBy=latest

이런식으로 url을 날릴수도 있습니다.

자 이제 서버에서 받아오는 작업은 모두 완성한듯 합니다.

다음 강좌에서는 서버통신을 하고 collectionView로 보여주는 작업들과, 바닥에 스크롤이 닿았을시 더 불러오는 작업을 해보겠습니다.
