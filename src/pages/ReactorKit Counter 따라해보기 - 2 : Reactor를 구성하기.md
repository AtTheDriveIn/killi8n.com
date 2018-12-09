---
title: "ReactorKit Counter 따라해보기 - 2 : Reactor를 구성하기"
date: "2018-08-24"
---

일단 redux에 대한 개념이 있으면 굉장히 이해하기 쉬운 것이 ReactorKit인데요,
쉽게 말해서 반응형 코딩이라고 생각하시면 쉬울거같네요.

어떤 이벤트가 있을때 그에 맞는 상황을 구성하여 시뮬레이션을 돌리는 것이라고 이해해도 좋을것 같습니다.

일단 거두절미하고, reactor를 구성해볼까요??

CounterViewReactor.swift 파일을 swift형태의 파일로 생성해주시고 다음 패키지들을 import 해줍시다.

```javascript
import ReactorKit
import RxSwift
```

그리고 다음과 같이 코딩을 실시해주세요.

```javascript
//
//  CounterViewReactor.swift
//  ReactorKit Sample
//
//  Created by killi8n on 2018. 8. 25..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import ReactorKit
import RxSwift

final class CounterViewReactor: Reactor {

    enum Action {
        case increase
        case decrease
    }

    enum Mutation {
        case increaseValue
        case decreaseValue
        case setLoading(Bool)
    }

    struct State {
        var value: Int
        var isLoading: Bool
    }

    let initialState: State

    init() {
        self.initialState = State(value: 0, isLoading: false)
    }

    func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case .increase:
            return Observable.concat([
                Observable.just(Mutation.setLoading(true)),
                Observable.just(Mutation.increaseValue).delay(0.5, scheduler: MainScheduler.instance),
                Observable.just(Mutation.setLoading(false))
                ])
        case .decrease:
            return Observable.concat([
                Observable.just(Mutation.setLoading(true)),
                Observable.just(Mutation.decreaseValue).delay(0.5, scheduler: MainScheduler.instance),
                Observable.just(Mutation.setLoading(false))
                ])
        }
    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case .increaseValue:
            state.value += 1
        case .decreaseValue:
            state.value -= 1
        case let .setLoading(isLoading):
            state.isLoading = isLoading
        }
        return state
    }
}

```

일단 설명을 드리면 저희가 가질 시뮬레이션은 결국 3개 입니다.
카운터 증가, 카운터 감소, 로딩에 관련된 것 이렇게 3개죠.

Action 같은 경우는 저희가 시뮬레이션을 할 액션, 즉 행동 이라고 생각하시면 되고, Mutation은 그 행동에 따라 변하는 경우 입니다.
즉, 값올림, 값내림, 로딩설정 세가지 가 되겠죠?

그리고 State같은 경우는 일단, initialState라고 초기 스테이트 를 지정해줍니다.
그 초기 스테이트에는 counter 값인 value가 0으로 지정되있고, loading하는지 아닌지를 알려주는 isLoading 값이 false로 지정되 있네요.

저희가 액션에 따라 변하는 mutation이 결국 이 state로 전달되게 되어 state가 변하게 되는것입니다.

그리고 마지막으로 mutation을 변하게 해줄 mutate함수와, 그 mutate함수에 따른 mutation 변화를 시켜주는 reduce 함수가 있네요.
