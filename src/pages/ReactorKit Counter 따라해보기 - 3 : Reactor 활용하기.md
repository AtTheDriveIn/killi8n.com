---
title: "ReactorKit Counter 따라해보기 - 3: Reactor 활용하기"
date: "2018-08-24"
---

자 이제 마지막으로 저희가 구성해놓은 Reactor를 바탕으로 실제 View에서 활용해 봅시다!

다시 CounterViewController.swift로 돌아와주세요.

일단 제일 처음으로 저희는 이제 RxSwift를 활용할것이기 때문에, 윗단에 disposeBag을 하나 선언해줍시다..

```javascript

import UIKit
import ReactorKit
import RxCocoa
import RxSwift
import SnapKit

class CounterViewController: UIViewController {

    var disposeBag: DisposeBag = DisposeBag()

    let increaseButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("+", for: UIControlState.normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.semibold)
        return button
    }()

....
```

그리고 전체 RxSwift를 활용하는 bind()함수를 만들어서 그안에 저희가 활용할 reactor를 이용하는 코딩을 짜볼까요?

```javascript
....
}

extension CounterViewController {
    func bind() {

    }
}
```

저같은 경우는 extension으로 밑단에 bind()함수를 선언했습니다.

그리고 StoryboardView를 상속 받고, reactor를 상단에 선언해 줍니다.

```javascript
import UIKit
import ReactorKit
import RxCocoa
import RxSwift
import SnapKit

class CounterViewController: UIViewController, StoryboardView {

    let reactor: CounterViewReactor = CounterViewReactor()

    var disposeBag: DisposeBag = DisposeBag()

  ...

```

자 이제 bind()함수를 작성해볼까요?

일단, 변화된 값을 반영하기 위해 valueLabel에 bind를 해봅시다.

```javascript
extension CounterViewController {
    func bind(reactor: CounterViewReactor) {

        reactor.state.asObservable().map { "\($0.value)" }
            .distinctUntilChanged()
            .bind(to: self.valueLabel.rx.text)
            .disposed(by: disposeBag)

    }
}
```

그리고 increaseButton과 decreaseButton도 액션을 반영해줍시다.

```javascript
       increaseButton.rx.tap               // Tap event
            .map { Reactor.Action.increase }  // Convert to Action.increase
            .bind(to: reactor.action)         // Bind to reactor.action
            .disposed(by: disposeBag)

        decreaseButton.rx.tap
            .map { Reactor.Action.decrease }
            .bind(to: reactor.action)
            .disposed(by: disposeBag)

```

이렇게 되면 증가와 감소는 작동하지만 계속 loadingView가 돌아가죠?
loadingView에도 바인드 해줍시다.

```javascript
reactor.state.asObservable().map { $0.isLoading }
            .distinctUntilChanged()
            .bind(to: self.activityIndicatorView.rx.isAnimating)
            .disposed(by: disposeBag)
```

자 이제 모든기능이 다 동작합니다!

전체 코드는 다음과 같습니다.

```javascript
//
//  CounterViewController.swift
//  ReactorKit Sample
//
//  Created by killi8n on 2018. 8. 25..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import ReactorKit
import RxCocoa
import RxSwift
import SnapKit

class CounterViewController: UIViewController, StoryboardView {

    let reactor: CounterViewReactor = CounterViewReactor()

    var disposeBag: DisposeBag = DisposeBag()

    let increaseButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("+", for: UIControlState.normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.semibold)
        return button
    }()

    let decreaseButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("-", for: UIControlState.normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.semibold)
        return button
    }()

    let valueLabel: UILabel = {
        let label = UILabel()
        label.text = "0"
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.semibold)
        return label
    }()

    let activityIndicatorView: UIActivityIndicatorView = {
        let view = UIActivityIndicatorView(activityIndicatorStyle: UIActivityIndicatorViewStyle.gray)
        view.startAnimating()
        return view
    }()

    lazy var counterStackView: UIStackView = {
        let sv = UIStackView(arrangedSubviews: [decreaseButton, valueLabel, increaseButton])
        sv.axis = .horizontal
        sv.distribution = .fillEqually
        sv.alignment = .center
        return sv
    }()

    override func viewDidLoad() {
        super.viewDidLoad()

        setup()
        bind(reactor: reactor)

    }

    func setup() {
        addComponentsToView()
        setupComponents()
    }

    func addComponentsToView() {
        view.addSubview(counterStackView)
        view.addSubview(activityIndicatorView)
    }

    func setupComponents() {
        view.backgroundColor = .white
        counterStackView.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.centerY.equalToSuperview()
            make.width.equalToSuperview().offset(16)
            make.height.equalTo(50)
        }
        activityIndicatorView.snp.makeConstraints { (make) in
            make.top.equalTo(counterStackView.snp.bottom).offset(16)
            make.centerX.equalToSuperview()


        }


    }


}

extension CounterViewController {
    func bind(reactor: CounterViewReactor) {


        reactor.state.asObservable().map { "\($0.value)" }
            .distinctUntilChanged()
            .bind(to: self.valueLabel.rx.text)
            .disposed(by: disposeBag)

        reactor.state.asObservable().map { $0.isLoading }
            .distinctUntilChanged()
            .bind(to: self.activityIndicatorView.rx.isAnimating)
            .disposed(by: disposeBag)

        increaseButton.rx.tap               // Tap event
            .map { Reactor.Action.increase }  // Convert to Action.increase
            .bind(to: reactor.action)         // Bind to reactor.action
            .disposed(by: disposeBag)

        decreaseButton.rx.tap
            .map { Reactor.Action.decrease }
            .bind(to: reactor.action)
            .disposed(by: disposeBag)

    }
}

```

이로써 Counter를 만들었는데요, frontend기술인 react를 주로 했던 저에게는 swift에서도 이러한 redux같은 기술을 사용할수 있는게 굉장히 편리하네요!

전체 코드는 https://github.com/killi8n/reactorkit-counter 에서 열람하실수 있습니다.
