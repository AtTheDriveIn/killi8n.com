---
title: "Javascript와 this"
date: "2018-07-19"
---

> ## this란 무엇일까?

## 1. 전역 컨텍스트

전역 컨텍스트 에서는 strict이던 아니던 간에 this는 전역 객체를 참조한다.
예를들어, browser의 this 는 window이다.

```javascript
console.log(this === window);
// true
```

## 2. 함수 스코프

"use strict" 를 사용하게 되면
this 를 지정해 주지 않는다면 undefined가 나오게 된다.

허나, unstricted mode 에서는 this가 전역 객체를 참조하게 된다.

```javascript
function f1() {
  "use strict";
  return this;
}

f1() === undefined;
// true

function f2() {
  return this;
}

f2() === window;
// true
```

## 3. 생성자(new) 로서의 this

```javascript
function person(name, age) {
  this.name = name;
  this.age = age;
}

var me = new person("killi8n", 90);
console.log(me);
// person {name: "killi8n", age: 90}
console.log(me.name);
// 'killi8n'
console.log(me.age);
// 90
```

위 코드에서는 new 가 사용되었으므로 me 객체를 찍어보면 출력이된다. 하지만,

```javascript
function person(name, age) {
  this.name = name;
  this.age = age;
}

var me = person("killi8n", 90);
console.log(me);
// undefined
console.log(me.name);
// undefined
console.log(me.age);
// undefined

console.log(name);
// 'killi8n'
console.log(age);
// 90
```

new를 쓰지 않았을시, this는 자연스레 전역 객체가 되버린다.

## 4. DOM 이벤트 핸들러 로서의 this

함수가 이벤트 핸들러로 사용될 때는, this는 이벤트가 발생한 엘리먼트로 설정된다. (몇몇 브라우저들은 리스너를 addEventListener 이외의 방법으로 동적으로 추가하기 위하여 이 관습을 따르지 않는다.)

##### (출처: MDN)

```javascript
// 리스너로서 호출될 때, 관련된 엘리먼트를 파랗게 만든다.
function bluify(e) {
  // 항상 true
  console.log(this === e.currentTarget);
  // currentTarget 과 target 이 같은 객체일 때 true
  console.log(this === e.target);
  this.style.backgroundColor = "#A5D9F3";
}

// document의 모든 엘리먼트의 목록을 얻는다.
var elements = document.getElementsByTagName("*");

// 클릭 리스너로 bluify를 추가하여서 엘리먼트를 클릭하면, 그 엘리먼트는 파랗게 된다.
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", bluify, false);
}
```
