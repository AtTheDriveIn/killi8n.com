---
title: "RxSplash - Ch3. 컬렉션뷰 채우기 및 더 불러오기 기능 구현"
date: "2018-10-06"
---

이제 다시 Xcode로 돌아와주세요. 마지막 해야할 작업들이 남아있기때문이죠.

혹시, 서버가 켜져있지않다면,

```bash
yarn build:watch
yarn start:dev
```

로 서버를 켜주세요.

이제 전 시간에 만들어놓은 파란색 collectionView를 사용하여, 서버와 API통신 후, 사진들을 그려넣어 주겠습니다.

일단 API 통신을 할 기능들을 추가해주겠습니다.

먼저 모델부터 선언 하겠습니다.

그러기 위해서는 포스트맨으로 http://localhost:4000/api/unsplash/list?page=1&perPage=3&orderBy=latest

주소로 GET을 보내봅시다.

```js
[
  {
    id: "oSNFvudOUpQ",
    created_at: "2018-10-08T14:51:18-04:00",
    updated_at: "2018-10-09T03:45:52-04:00",
    width: 5472,
    height: 3648,
    color: "#DCC5C5",
    description: null,
    urls: {
      raw:
        "https://images.unsplash.com/photo-1539024595535-830d7a3b3160?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=4abd24f346efc912d01d1c113dbf067c",
      full:
        "https://images.unsplash.com/photo-1539024595535-830d7a3b3160?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=5eac7d3d3488ba621f7f1c9576c5108d",
      regular:
        "https://images.unsplash.com/photo-1539024595535-830d7a3b3160?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=1908729109a6b16f96bbddd61831a4de",
      small:
        "https://images.unsplash.com/photo-1539024595535-830d7a3b3160?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=35b60f55bffd44c798adb08fb2097ab3",
      thumb:
        "https://images.unsplash.com/photo-1539024595535-830d7a3b3160?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=cf034c819e06951922e64ff08bc86fff"
    },
    links: {
      self: "https://api.unsplash.com/photos/oSNFvudOUpQ",
      html: "https://unsplash.com/photos/oSNFvudOUpQ",
      download: "https://unsplash.com/photos/oSNFvudOUpQ/download",
      download_location: "https://api.unsplash.com/photos/oSNFvudOUpQ/download"
    },
    categories: [],
    sponsored: false,
    likes: 41,
    liked_by_user: false,
    current_user_collections: [],
    slug: null,
    user: {
      id: "Mr8sphPHxr0",
      updated_at: "2018-10-09T09:52:48-04:00",
      username: "loganlambert",
      name: "Logan Lambert",
      first_name: "Logan",
      last_name: "Lambert",
      twitter_username: "logan_lambert6",
      portfolio_url: "https://www.instagram.com/loganlambert/?hl=en",
      bio: "Filmmaker and Editor at Beautiful Destinations",
      location: "New York City",
      links: {
        self: "https://api.unsplash.com/users/loganlambert",
        html: "https://unsplash.com/@loganlambert",
        photos: "https://api.unsplash.com/users/loganlambert/photos",
        likes: "https://api.unsplash.com/users/loganlambert/likes",
        portfolio: "https://api.unsplash.com/users/loganlambert/portfolio",
        following: "https://api.unsplash.com/users/loganlambert/following",
        followers: "https://api.unsplash.com/users/loganlambert/followers"
      },
      profile_image: {
        small:
          "https://images.unsplash.com/profile-1538955616998-861b8a86cfea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=251c68f06a3497ab5e9b5ece2e657705",
        medium:
          "https://images.unsplash.com/profile-1538955616998-861b8a86cfea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=11401414dc19a56513b8289be3ace3ce",
        large:
          "https://images.unsplash.com/profile-1538955616998-861b8a86cfea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=e96b555bb127341b677665d0b54886cd"
      },
      instagram_username: "loganlambert",
      total_collections: 0,
      total_likes: 0,
      total_photos: 33,
      accepted_tos: false
    }
  },
  {
    id: "Jiu5uMx6mGU",
    created_at: "2018-10-08T14:49:34-04:00",
    updated_at: "2018-10-09T03:45:34-04:00",
    width: 7542,
    height: 5030,
    color: "#FEF7F5",
    description: null,
    urls: {
      raw:
        "https://images.unsplash.com/photo-1539024429446-ba891cd43e62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=3bd82eb88226c0aa424a09d171ed0ed9",
      full:
        "https://images.unsplash.com/photo-1539024429446-ba891cd43e62?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=f17e6bf74c7b24750c45b850fc006372",
      regular:
        "https://images.unsplash.com/photo-1539024429446-ba891cd43e62?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=9dfe3583f876d8dca30b905bd86f06d9",
      small:
        "https://images.unsplash.com/photo-1539024429446-ba891cd43e62?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=2ab193c354a86800a727d31a26fedda0",
      thumb:
        "https://images.unsplash.com/photo-1539024429446-ba891cd43e62?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=caebce0d17f336e11a377fbd83c2caa8"
    },
    links: {
      self: "https://api.unsplash.com/photos/Jiu5uMx6mGU",
      html: "https://unsplash.com/photos/Jiu5uMx6mGU",
      download: "https://unsplash.com/photos/Jiu5uMx6mGU/download",
      download_location: "https://api.unsplash.com/photos/Jiu5uMx6mGU/download"
    },
    categories: [],
    sponsored: false,
    likes: 51,
    liked_by_user: false,
    current_user_collections: [],
    slug: null,
    user: {
      id: "1vK5zeSuzvE",
      updated_at: "2018-10-09T05:43:08-04:00",
      username: "tautotes",
      name: "Andrea Badino",
      first_name: "Andrea",
      last_name: "Badino",
      twitter_username: "AndreaBadino",
      portfolio_url: null,
      bio: "San Francisco, CA",
      location: null,
      links: {
        self: "https://api.unsplash.com/users/tautotes",
        html: "https://unsplash.com/@tautotes",
        photos: "https://api.unsplash.com/users/tautotes/photos",
        likes: "https://api.unsplash.com/users/tautotes/likes",
        portfolio: "https://api.unsplash.com/users/tautotes/portfolio",
        following: "https://api.unsplash.com/users/tautotes/following",
        followers: "https://api.unsplash.com/users/tautotes/followers"
      },
      profile_image: {
        small:
          "https://images.unsplash.com/profile-fb-1525872132-ec79a301f6e3.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=5674e82ccae1594632e46bcad225ca0b",
        medium:
          "https://images.unsplash.com/profile-fb-1525872132-ec79a301f6e3.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=637d2cc1ce163d24046bb908ebba189e",
        large:
          "https://images.unsplash.com/profile-fb-1525872132-ec79a301f6e3.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=fae4007bd37c2e93f1f5777dad2bdd19"
      },
      instagram_username: "tautotes",
      total_collections: 0,
      total_likes: 2,
      total_photos: 3
    }
  },
  {
    id: "mQfXD85sCbc",
    created_at: "2018-10-08T14:29:34-04:00",
    updated_at: "2018-10-09T03:45:03-04:00",
    width: 3648,
    height: 5472,
    color: "#E7D4CD",
    description: null,
    urls: {
      raw:
        "https://images.unsplash.com/photo-1539023250460-582902f96933?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=b864e16d6815d0a6fc1d8572aa1cc410",
      full:
        "https://images.unsplash.com/photo-1539023250460-582902f96933?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=1e5bc663317c93d7d0da9a9b85b78e46",
      regular:
        "https://images.unsplash.com/photo-1539023250460-582902f96933?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=5f91ccddf9f5a9257230e8515a1059c9",
      small:
        "https://images.unsplash.com/photo-1539023250460-582902f96933?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=00593243c033c7bdfd9be12dee8c57f5",
      thumb:
        "https://images.unsplash.com/photo-1539023250460-582902f96933?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM3ODA1fQ&s=5e8f553507db48e2acc0d0c5fc20da8b"
    },
    links: {
      self: "https://api.unsplash.com/photos/mQfXD85sCbc",
      html: "https://unsplash.com/photos/mQfXD85sCbc",
      download: "https://unsplash.com/photos/mQfXD85sCbc/download",
      download_location: "https://api.unsplash.com/photos/mQfXD85sCbc/download"
    },
    categories: [],
    sponsored: false,
    likes: 66,
    liked_by_user: false,
    current_user_collections: [],
    slug: null,
    user: {
      id: "Mr8sphPHxr0",
      updated_at: "2018-10-09T09:52:48-04:00",
      username: "loganlambert",
      name: "Logan Lambert",
      first_name: "Logan",
      last_name: "Lambert",
      twitter_username: "logan_lambert6",
      portfolio_url: "https://www.instagram.com/loganlambert/?hl=en",
      bio: "Filmmaker and Editor at Beautiful Destinations",
      location: "New York City",
      links: {
        self: "https://api.unsplash.com/users/loganlambert",
        html: "https://unsplash.com/@loganlambert",
        photos: "https://api.unsplash.com/users/loganlambert/photos",
        likes: "https://api.unsplash.com/users/loganlambert/likes",
        portfolio: "https://api.unsplash.com/users/loganlambert/portfolio",
        following: "https://api.unsplash.com/users/loganlambert/following",
        followers: "https://api.unsplash.com/users/loganlambert/followers"
      },
      profile_image: {
        small:
          "https://images.unsplash.com/profile-1538955616998-861b8a86cfea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=251c68f06a3497ab5e9b5ece2e657705",
        medium:
          "https://images.unsplash.com/profile-1538955616998-861b8a86cfea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=11401414dc19a56513b8289be3ace3ce",
        large:
          "https://images.unsplash.com/profile-1538955616998-861b8a86cfea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=e96b555bb127341b677665d0b54886cd"
      },
      instagram_username: "loganlambert",
      total_collections: 0,
      total_likes: 0,
      total_photos: 33,
      accepted_tos: false
    }
  }
];
```

위와같이 뜰텐데요, 일단 저희가 쓸만할 요소들을 뽑아서 제가 임의로 모델을 생성 해보았습니다.

`Models/Unsplash.swift`

```swift
import UIKit

struct Unsplash: Codable {
    let id: String
    let width: Int
    let height: Int
    let color: String
    let description: String?
    let urls: Urls
    let links: Links
    let categories: [String]
    let likes: Int
    let user: User

    enum CodingKeys: String, CodingKey {
        case id
        case width
        case height
        case color
        case description
        case urls
        case links
        case categories
        case likes
        case user
    }


}

struct Urls: Codable {
    let raw: String
    let full: String
    let regular: String
    let small: String
    let thumb: String
}

struct Links: Codable {
    let selfLink: String
    let html: String
    let download: String
    let downloadLocation: String

    enum CodingKeys: String, CodingKey {
        case selfLink = "self"
        case html
        case download
        case downloadLocation = "download_location"
    }
}

struct User: Codable {
    let id: String
    let username: String
    let name: String
    let bio: String?
    let profileImage: ProfileImage

    enum CodingKeys: String, CodingKey {
        case id
        case username
        case name
        case bio
        case profileImage = "profile_image"
    }
}

struct ProfileImage: Codable {
    let small: String
    let medium: String
    let large: String
}



```

나중에 디코딩을 하여야 하기 때문에 모두 Codable을 상속 받았습니다.

이제 Services들을 만들어 보겠습니다. 모든 서비스의 기초가될 ServiceProvider와 BaseService부터 만들어보겠습니다. 참고로 이 패턴들은 모두 전수열(devxoul)님의 reactorkit 튜토리얼 코드에서 따온 코드임을 알립니다!
자세한 사항들은 http://reactorkit.io 에서 보실수 있습니다!

`Services/BaseService.swift`

```swift
import Foundation

protocol ServiceProviderType: class {
    var unsplashService: UnsplashServiceType { get }
}

final class ServiceProvider: ServiceProviderType {
    lazy var unsplashService: UnsplashServiceType = UnsplashService(provider: self)
}

```

`Services/BaseService.swift`

```swift
class BaseService {
    unowned let provider: ServiceProviderType

    init(provider: ServiceProviderType) {
        self.provider = provider
    }
}

```

자 이제 위에서 선언해준 UnsplashService를 만들어주어야 합니다.

이곳에서는 RxAlamofire가 필요하므로 pod 파일에 추가하여 다운받아 주세요.

`Services/UnsplashService.swift`

```swift
import RxSwift
import RxAlamofire
import RxCocoa

protocol UnsplashServiceType {
    var decoder: JSONDecoder { get }
    func getUnsplashList(page: Int, perPage: Int, orderBy: String) -> Observable<[Unsplash]>
}

final class UnsplashService: BaseService, UnsplashServiceType {

    var decoder: JSONDecoder {
        let decoder = JSONDecoder()
        return decoder
    }

    func getUnsplashList(page: Int, perPage: Int, orderBy: String) -> Observable<[Unsplash]> {
        let parameters: [String: Any] = [:]
        return UnsplashAPI.getUnsplashList(page: page, perPage: perPage, orderBy: orderBy).buildRequest(parameters: parameters).map({ (data) -> [Unsplash] in
            guard let unsplashList = try? self.decoder.decode([Unsplash].self, from: data) else { return [] }
            return unsplashList
        })
    }


}

```

위와같이 만들면 UnsplashAPI가 없다고 오류가 뜰것입니다.

`Services/API/UnsplashAPI.swift`

```swift
import RxAlamofire
import RxSwift
import Alamofire

enum UnsplashAPI {
    case getUnsplashList(page: Int, perPage: Int, orderBy: String)
}

extension UnsplashAPI {
    // local ip를 써주시면 됩니다.
    static let baseURLString: String = "http://192.168.0.23:4000"

    var path: String {
        switch self {
        case .getUnsplashList(_, _, _):
            return "/api/unsplash/list"
        }
    }

    var url: URLComponents {
        switch self {
        case let .getUnsplashList(page, perPage, orderBy):
            var url = URLComponents(string: "\(UnsplashAPI.baseURLString)\(path)")!
            let pageQueryItem = URLQueryItem(name: "page", value: "\(page)")
            let perPageQueryItem = URLQueryItem(name: "perPage", value: "\(perPage)")
            let orderByQueryItem = URLQueryItem(name: "orderBy", value: "\(orderBy)")
            url.queryItems = [pageQueryItem, perPageQueryItem, orderByQueryItem]
            return url
        }
    }

    var method: HTTPMethod {
        switch self {
        case .getUnsplashList:
            return .get
        }
    }

    var parameterEncoding: ParameterEncoding {
        switch self {
        case .getUnsplashList:
            return URLEncoding.default
        }
    }

    static let manager: Alamofire.SessionManager = {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 5
        configuration.timeoutIntervalForResource = 5
        configuration.httpCookieStorage = HTTPCookieStorage.shared
        configuration.urlCache = URLCache(memoryCapacity: 0, diskCapacity: 0, diskPath: nil)
        let manager = Alamofire.SessionManager(configuration: configuration)
        return manager
    }()


    func buildRequest(parameters: Parameters) -> Observable<Data> {
        return UnsplashAPI.manager.rx.request(method, url, parameters: parameters, encoding: parameterEncoding, headers: nil)
            .validate(statusCode: 200 ..< 300)
            .data()
            .observeOn(MainScheduler.instance)
    }



}

```

위와같이 만들게되면 오류는 사라지겠죠? 그런 다음 다시 MainViewReactor로 돌아와 주세요. 그리고 이제 컬렉션뷰의 모델타입들을 선언해줘야 하므로, RxDataSources 를 pod file로 선언후 다운받아주세요. 일단 리스트들을 가져오는 액션과 뮤테이션들을 설정해보겠습니다.

`Controllers/MainViewReactor.swift`

```swift
import ReactorKit
import RxSwift
import RxCocoa
import RxDataSources

typealias UnsplashSectionModel = SectionModel<Int, ImageCellReactor>
typealias UnsplashDataSourceType = RxCollectionViewSectionedReloadDataSource<UnsplashSectionModel>

class MainViewReactor: Reactor {

    init(provider: ServiceProviderType) {
        self.provider = provider
    }

    enum Action {
        case getUnsplashList

    }

    enum Mutation {
        case setUnsplashList(sections: [UnsplashSectionModel])
        case setLoading(loading: Bool)
        case setRefreshing(refreshing: Bool)
    }

    struct State {
        var sections: [UnsplashSectionModel] = []
        var page: Int = 1
        var loading: Bool = true
        var refreshing: Bool = false
    }


    var initialState: State = State()
    var provider: ServiceProviderType

    func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case .getUnsplashList:
            let getListObservable = provider.unsplashService.getUnsplashList(page: 1, perPage: MainViewController.Constant.perPageCount, orderBy: MainViewController.Constant.orderBy).flatMap({ (unsplashList: [Unsplash]) -> Observable<Mutation> in
                let sectionItems = unsplashList.map(ImageCellReactor.init)
                let section = UnsplashSectionModel(model: 0, items: sectionItems)
                return Observable.just(Mutation.setUnsplashList(sections: [section]))
            })
            return Observable.concat([
                    Observable.just(Mutation.setRefreshing(refreshing: true)),
                    getListObservable,
                    Observable.just(Mutation.setRefreshing(refreshing: false))
                ])
        }

    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case .setUnsplashList(let sections):
            state.sections = sections
            state.page += 1
            state.loading = false
            return state
        case let .setLoading(loading):
            state.loading = loading
            return state
        case let .setRefreshing(refreshing):
            state.refreshing = refreshing
            // 페이지를 2로 만들어줍니다. loadmore를 구현할때 쓰입니다.
            state.page = 2
            return state
        }
    }


}


```

일단 처음에 가져올때는, Refreshing이라는 개념으로 생각 하시면 될것같습니다.

따라서 Observable.concat()을 사용하여 리프레쉬 시작 -> API통신 후 가져오기 -> 리프레쉬 끝 순으로 차례로 동작되게 하였습니다.

이제 우리는 컬렉션 뷰의 셀을 만들어야 합니다.

`Cells/BaseCollectionViewCell.swift`

```swift
import UIKit

import RxSwift

class BaseCollectionViewCell: UICollectionViewCell {
    // MARK: Properties
    var disposeBag: DisposeBag = DisposeBag()


    // MARK: Initializing
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.initialize()
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func initialize() {
        // Override point
    }

}

```

위와같이 모든 셀들이 상속받을 BaseCell을 생성하고,

`Cells/ImageCell.swift`

```swift
import UIKit
import SnapKit
import Then
import ReactorKit


class ImageCell: BaseCollectionViewCell, View {
    typealias Reactor = ImageCellReactor

    let unsplashImageView = UIImageView().then {
        $0.backgroundColor = .white
        $0.clipsToBounds = true
        $0.contentMode = .scaleAspectFill
    }


    override init(frame: CGRect) {
        super.init(frame: frame)
        self.contentView.backgroundColor = .white
        self.contentView.addSubview(self.unsplashImageView)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        self.unsplashImageView.snp.makeConstraints { (make) in
            make.edges.equalTo(0)
        }
    }

    func bind(reactor: Reactor) {
        let unsplash = reactor.currentState
        let imageUrl = unsplash.urls.regular
        guard let url = URL(string: imageUrl) else { return }
        self.unsplashImageView.kf.setImage(with: url)
    }


}

```

`Cells/ImageCellReactor.swift`

```swift
import ReactorKit

class ImageCellReactor: Reactor {
    typealias Action = NoAction

    let initialState: Unsplash

    init(unsplash: Unsplash) {
        self.initialState = unsplash
    }


}
```

리액터도 선언해줍니다.

자 이제 이 만든 액션들을 사용해볼까요?

`Controllers/MainViewController.swift`

```swift
import UIKit
import ReactorKit
import Then
import SnapKit
import ReusableKit
import RxSwift
import RxCocoa
import RxViewController

class MainViewController: BaseViewController, View {
    typealias Reactor = MainViewReactor

    struct Constant {
    	// 한번에 14개를 받아옵니다.
        static let perPageCount = 14
        static let orderBy = "latest"
    }

    init(reactor: Reactor) {
        super.init()
        self.reactor = reactor
        self.title = "UNSPLASH"
    }

    required convenience init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    struct Reusable {
        static let imageCell = ReusableCell<ImageCell>()
    }

    let layout = UICollectionViewFlowLayout().then {
    	// 수직으로 스크롤 합니다.
        $0.scrollDirection = .vertical
    }

    lazy var collectionView = UICollectionView(frame: .zero, collectionViewLayout: self.layout).then {
        $0.backgroundColor = UIColor.black.withAlphaComponent(0.3)
        $0.register(Reusable.imageCell)
        $0.refreshControl = self.refreshControl
    }


    let refreshControl: UIRefreshControl = UIRefreshControl()

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

        self.collectionView.rx.setDelegate(self).disposed(by: self.disposeBag)

        // viewDidLoad가 실행될때에 리스트를 받아옵니다.
        self.rx.viewDidLoad
            .map { Reactor.Action.getUnsplashList }
            .bind(to: reactor.action)
            .disposed(by: self.disposeBag)


        // 리프레쉬 컨트롤이 당겨지면 다시 1페이지의 리스트를 받아옵니다.
        self.refreshControl.rx.controlEvent(.valueChanged).map { Reactor.Action.getUnsplashList }
            .bind(to: reactor.action)
            .disposed(by: self.disposeBag)


        // sections값이 변경될때 다시 컬렉션뷰를 그려줍니다.

        reactor.state.map { $0.sections }
            .bind(to: self.collectionView.rx.items(dataSource: self.createDataSource()))
            .disposed(by: self.disposeBag)

        // refreshing이 true이면 refreshControl을 동작시킵니다.
        reactor.state.map { $0.refreshing }
            .bind(to: self.refreshControl.rx.isRefreshing)
            .disposed(by: self.disposeBag)

    }

    // dataSource를 생성합니다.

    func createDataSource() -> UnsplashDataSourceType {
        return UnsplashDataSourceType(configureCell: { (dataSource, collectionView, indexPath, reactor) -> UICollectionViewCell in
            let cell = collectionView.dequeue(Reusable.imageCell, for: indexPath)
            cell.reactor = reactor
            return cell
        }, configureSupplementaryView: { (dataSource, collectionView, kind, indexPath) -> UICollectionReusableView in
            return UICollectionReusableView()
        }, moveItem: { (dataSource, source, dest) in

        }, canMoveItemAtIndexPath: { (dataSource, indexPath) -> Bool in
            return false
        })
    }

}

extension MainViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width / 2, height: 300)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 0
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 0
    }
}




```

이제 첫페이지가 보여지시나요? 자 그렇다면 바닥에 닿았을때, 다음페이지를 불러오는 작업을 해보겠습니다.

일단 전수열님의 코드를 인용 하겠습니다. 두 코드를 만들어주세요.
첫번째는 Scroll이 바닥에 닿을때를 인식하는 코드입니다.

`Utils/UIScrollView+ScrollToBottom.swift`

```swift

import UIKit
import ManualLayout

extension UIScrollView {

    var isOverflowVertical: Bool {
        return self.contentSize.height > self.height && self.height > 0
    }

    func isReachedBottom(withTolerance tolerance: CGFloat = 0) -> Bool {
        guard self.isOverflowVertical else { return false }
        let contentOffsetBottom = self.contentOffset.y + self.height
        return contentOffsetBottom >= self.contentSize.height - tolerance
    }

    func scrollToBottom(animated: Bool) {
        guard self.isOverflowVertical else { return }
        let targetY = self.contentSize.height + self.contentInset.bottom - self.height
        let targetOffset = CGPoint(x: 0, y: targetY)
        self.setContentOffset(targetOffset, animated: true)
    }

}
```

그리고 다음은 Rx로도 이용할수 있는 코드입니다.

`Rx/UIScrollView+Rx.swift`

```swift
import RxCocoa
import RxSwift

extension Reactive where Base: UIScrollView {

    var isReachedBottom: ControlEvent<Void> {
        let source = self.contentOffset
            .filter { [weak base = self.base] offset in
                guard let base = base else { return false }
                return base.isReachedBottom(withTolerance: base.height / 2)
            }
            .map { _ in Void() }
        return ControlEvent(events: source)
    }

}

```

`Controllers/MainViewReactor.swift`

```swift
...
	enum Action {
        case getUnsplashList
        case loadMore

    }

    enum Mutation {
        case setUnsplashList(sections: [UnsplashSectionModel])
        case addUnsplashList(sectionItems: [ImageCellReactor])
        case setLoading(loading: Bool)
        case setRefreshing(refreshing: Bool)
    }

	struct State {
        var sections: [UnsplashSectionModel] = []
        var page: Int = 1
        var loading: Bool = true
        var lastPage: Bool = false
        var refreshing: Bool = false
    }


...

	func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case .getUnsplashList:
            let getListObservable = provider.unsplashService.getUnsplashList(page: 1, perPage: MainViewController.Constant.perPageCount, orderBy: MainViewController.Constant.orderBy).flatMap({ (unsplashList: [Unsplash]) -> Observable<Mutation> in
                let sectionItems = unsplashList.map(ImageCellReactor.init)
                let section = UnsplashSectionModel(model: 0, items: sectionItems)
                return Observable.just(Mutation.setUnsplashList(sections: [section]))
            })
            return Observable.concat([
                    Observable.just(Mutation.setRefreshing(refreshing: true)),
                    getListObservable,
                    Observable.just(Mutation.setRefreshing(refreshing: false))
                ])
        case .loadMore:
            if self.currentState.loading || self.currentState.lastPage {
                return Observable.empty()
            }
            let getListObservable = provider.unsplashService.getUnsplashList(page: self.currentState.page, perPage: MainViewController.Constant.perPageCount, orderBy: MainViewController.Constant.orderBy).flatMap({ (unsplashList: [Unsplash]) -> Observable<Mutation> in
                let sectionItems = unsplashList.map(ImageCellReactor.init)
                return Observable.just(Mutation.addUnsplashList(sectionItems: sectionItems))
            })
            return Observable.concat([
                    Observable.just(Mutation.setLoading(loading: true)),
                    getListObservable,
                    Observable.just(Mutation.setLoading(loading: false))
                ])
        }

    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case .setUnsplashList(let sections):
            state.sections = sections
            state.page += 1
            state.loading = false
            return state
        case let .addUnsplashList(sectionItems):
            for i in 0 ..< sectionItems.count {
                state.sections[0].items.append(sectionItems[i])
            }
            if sectionItems.count < MainViewController.Constant.perPageCount {
                state.lastPage = true
                return state
            }
            state.page += 1
            return state
        case let .setLoading(loading):
            state.loading = loading
            return state
        case let .setRefreshing(refreshing):
            state.refreshing = refreshing
            state.page = 2
            state.lastPage = false
            return state
        }
    }

```

loadMore 액션과 뮤테이션을 선언하였습니다.

`Controllers/MainViewController.swift`

```swift
....
	let activityIndiactorView: UIActivityIndicatorView = UIActivityIndicatorView(activityIndicatorStyle: .gray)
...

	override func viewDidLoad() {
        super.viewDidLoad()

        self.view.backgroundColor = .white

        self.view.addSubview(self.collectionView)
        self.view.addSubview(self.activityIndiactorView)

    }

    override func setupConstraints() {
        self.collectionView.snp.makeConstraints { (make) in
            make.edges.equalTo(0)
        }
        self.activityIndiactorView.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.centerY.equalToSuperview()
        }


    }
    ...

    func bind(reactor: Reactor) {

    ...


    	self.collectionView.rx.isReachedBottom.map { Reactor.Action.loadMore }
            .bind(to: reactor.action)
            .disposed(by: self.disposeBag)

            ...


            reactor.state.map { $0.loading }
            .bind(to: self.activityIndiactorView.rx.isAnimating)
            .disposed(by: self.disposeBag)
    }
```

이제 바닥에 닿을때 activityIndicatorView가 작동하며, 더 불러와지죠??

자 이제 MainViewController에서 보여주는 작업은 모두 끝났습니다!

다음으로는 Model에서 선언해놓은 UserInfo를 가지고 컬렉션뷰 셀을 눌렀을때, 사진이미지와 사진가의 프로필과 이름을 보여주는 작업을 하겠습니다!
