---
title: "RxSplash - Ch1. 기본 환경 세팅 밑 PodFile 구축"
date: "2018-09-29"
---

일단 저는 사실 스토리보드 비사용자입니다.

스토리보드를 사용하지 않고 만들 예정입니다.

일단 Controllers폴더를 하나 생성해주세요.

그안에 MainViewController.swift 파일을 하나 만듭니다.

`Controllers/MainViewController.swift`

```swift
import UIKit

class MainViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .white

        print("MainViewController")
    }
}
```

기존에 있던 ViewController.swift는 제거하여 주세요.

`AppDelegate.swift`

```swift
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        window = UIWindow()
        window?.rootViewController = MainViewController()
        window?.makeKeyAndVisible()

        return true
    }
}

```

하얀 화면이 띄워지고 콘솔창에 MainViewController가 뜨면 성공입니다.

그럼 이제 터미널로 pod init을 해주신다음, podfile을 다음과 같이 작성해줍니다.

`Podfile`

```text
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'RxSplash' do
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!

  # Pods for RxSplash

  # Architecture
  pod 'ReactorKit'

  # Networking
  pod 'Alamofire'
  pod 'Kingfisher', '~> 4.0.0'

  # Rx
  pod 'RxSwift'
  pod 'RxCocoa'

  # Misc.
  pod 'Then'
  pod 'ReusableKit'


end

```

먼저 이정도만 받아놓겠습니다.

pod install후 xcworkspace로 들어가서 빌드를 해줘야합니다.

빌드가 완료되면 collectionView부터 생성해 보겠습니다.

ReactorKit을 사용하기 때문에, View하나에 Reactor파일 하나가 따라붙습니다.

일단 MainViewReactor.swift를 생성해주세요.

`Controllers/MainViewReactor.swift`

```swift
import ReactorKit
import RxSwift
import RxCocoa

class MainViewReactor: Reactor {

    init() {

    }

    enum Action {

    }

    enum Mutation {

    }

    struct State {

    }


    var initialState: State = State()

//    func mutate(action: Action) -> Observable<Mutation> {
//
//    }
//
//    func reduce(state: State, mutation: Mutation) -> MainViewReactor.State {
//
//    }
//

}

```

위와같이 틀만 잡아놓겠습니다. 그후 MainViewController로 돌아와서 ReactorKit 임포트 한후, 상속받아보겠습니다. 그전에 ViewController들의 기초가 될 BaseViewController를 생성해보겠습니다.

`Controllers/BaseViewController.swift`

```swift
import UIKit
import RxSwift
import RxCocoa

class BaseViewController: UIViewController {

    // MARK: Initializing
    init() {
        super.init(nibName: nil, bundle: nil)
    }

    required convenience init?(coder aDecoder: NSCoder) {
        self.init()
    }


    // MARK: Rx
    var disposeBag = DisposeBag()


    // MARK: Layout Constraints
    private(set) var didSetupConstraints = false

    override func viewDidLoad() {
        self.view.setNeedsUpdateConstraints()
    }

    override func updateViewConstraints() {
        if !self.didSetupConstraints {
            self.setupConstraints()
            self.didSetupConstraints = true
        }
        super.updateViewConstraints()
    }

    func setupConstraints() {
        // Override point
    }
}

```

그 이후에 다시 MainViewController로 돌아옵니다.

`MainViewController.swift`

```swift
import UIKit
import ReactorKit

class MainViewController: BaseViewController, View {
    typealias Reactor = MainViewReactor

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .white


    }

    func bind(reactor: MainViewController.Reactor) {

    }

}

```

이렇게 BaseViewController와 View를 상속받으면됩니다.
그리고 오토레이아웃 라이브러리인 SnapKit을 받아야 합니다.

`Podfile`

```text
  # Layout
  pod 'SnapKit'
```

다시한번 pod install을 해주신후, 빌드한번 해줍니다.

`MainViewController.swift`

```swift
import UIKit
import ReactorKit
import Then
import SnapKit
import ReusableKit
import RxSwift
import RxCocoa


class MainViewController: BaseViewController, View {
    typealias Reactor = MainViewReactor

    let layout = UICollectionViewFlowLayout().then {
        $0.scrollDirection = .vertical
    }

    lazy var collectionView = UICollectionView(frame: .zero, collectionViewLayout: self.layout).then {
        $0.backgroundColor = .blue
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        self.view.backgroundColor = .white

        self.view.addSubview(self.collectionView)


    }

    override func setupConstraints() {
        self.collectionView.snp.makeConstraints { (make) in
            make.edges.equalTo(0)
        }
    }

    func bind(reactor: MainViewController.Reactor) {

    }

}

```

일단 collectionView를 띄워봤습니다.
그렇다면 이제 API통신을 해야하는데요, 다음강좌에서는 Node.js서버작업을 진행해보겠습니다.
