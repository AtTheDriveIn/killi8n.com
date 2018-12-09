---
title: "Reactor Kit Counter 따라해보기 - 1 : Snapkit으로 화면구성하기"
date: "2018-08-24"
---

이곳에 활용된 코드및 예제는 https://github.com/devxoul 님의 reactorkit example에 나온 모든코드와 동일함을 알립니다!

이번 예제는 리액터 킷을 첨 사용해본 사용자로서 쓰는 따라해보기 가이드 입니다.

일단 podfile에 세가지를 받아줍니다. 저같은 경우는 네가지가 되었네요, 스토리보드를 이용하여 하시는 분들은 굳이 SnapKit은 필요없습니다!

```javascript
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'ReactorKit Sample' do
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!

  # Pods for ReactorKit Sample
        pod 'ReactorKit'
        pod 'RxCocoa'
        pod 'RxSwift'
        pod 'SnapKit'

end
```

글고 기존에 있던 ViewController.swift파일은 지워주시고,

새로운 CounterViewController.swift를 생성해줍니다.

그다음에

```javascript
import ReactorKit
import RxCocoa
import RxSwift
```

세가지를 임포트 해줍니다.

![](https://user-images.githubusercontent.com/931655/30179038-0ba51cdc-93d9-11e7-95e4-9fb3000c6c3f.png)

기본적인 디자인 틀은 다음과 같습니다.

따라서 일단 디자인부터 해볼까요??

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

class CounterViewController: UIViewController {

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

```

일단 디자인만 한 코드는 위와 같습니다.

하지만 이렇게 실행해도 코드로만 작성한 디자인은 아무런 영향을 나타내지 못합니다. 왜냐면 AppDelegate.swift 파일에서 window의 rootViewController를 설정해주지 않았기 때문이죠~

일단 불필요한 함수들은 다 지워주시고 AppDelegate.swift를 다음과 같이 만들어주세요

```javascript
//
//  AppDelegate.swift
//  ReactorKit Sample
//
//  Created by killi8n on 2018. 8. 25..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow()
        window?.makeKeyAndVisible()
        window?.rootViewController = CounterViewController()
        return true
    }

}


```

자이제 시뮬레이터를 실행시키면 화면이 나타날것입니다!
