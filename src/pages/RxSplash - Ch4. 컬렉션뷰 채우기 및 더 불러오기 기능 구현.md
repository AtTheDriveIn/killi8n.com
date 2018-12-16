---
title: "RxSplash - Ch4. 컬렉션뷰 채우기 및 더 불러오기 기능 구현"
date: "2018-10-06"
---

이제는 마지막으로 메인뷰의 컬렉션뷰를 눌렀을시, 디테일한 정보들 (UserInfo)과 이미지를 보여주는 기능을 구현하겠습니다.

일단 DetailViewController와 DetailViewReactor를 만들겠습니다.

`Controllers/DetailViewReactor.swift`

```swift
import ReactorKit
import RxSwift
import RxCocoa
import RxDataSources

enum DetailSectionModel {
    case ImageSection(title: String, items: [DetailSectionItem])
    case UserInfoSection(title: String, items: [DetailSectionItem])
}

enum DetailSectionItem {
    case ImageSectionItem(unsplash: Unsplash)
    case UserInfoSectionItem(user: User)
}

extension DetailSectionModel: SectionModelType {
    typealias Item = DetailSectionItem

    var items: [DetailSectionItem] {
        switch self {
        case .ImageSection(title: _, items: let items):
            return items.map { $0 }
        case .UserInfoSection(title: _, items: let items):
            return items.map { $0 }
        }
    }

    init(original: DetailSectionModel, items: [DetailSectionItem]) {
        switch original {
        case let .ImageSection(title: title, items: _):
            self = .ImageSection(title: title, items: items)
        case let .UserInfoSection(title: title, items: _):
            self = .UserInfoSection(title: title, items: items)
        }
    }
}

extension DetailSectionModel {
    var title: String {
        switch self {
        case .ImageSection(title: let title, items: _):
            return title
        case .UserInfoSection(title: let title, items: _):
            return title
        }
    }
}

class DetailViewReactor: Reactor {

    init() {

    }

    enum Action {
        case setInitialItem(Unsplash)
    }

    enum Mutation {
        case setSections(Unsplash)
    }

    struct State {
        var sections: [DetailSectionModel] = []
    }

    var initialState = State()


    func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case let .setInitialItem(unsplash):
            return Observable.just(Mutation.setSections(unsplash))
        }
    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case let .setSections(unsplash):
            state.sections.append(DetailSectionModel.ImageSection(title: "ImageSection", items: [DetailSectionItem.ImageSectionItem(unsplash: unsplash)]))
            state.sections.append(DetailSectionModel.UserInfoSection(title: "UserInfoSection", items: [DetailSectionItem.UserInfoSectionItem(user: unsplash.user)]))
            return state
        }
    }


}


```

`Controllers/DetailViewController.swift`

```swift

import UIKit
import ReactorKit
import Then
import SnapKit
import ReusableKit
import RxSwift
import RxCocoa
import RxDataSources

class DetailViewController: BaseViewController, View {
    typealias Reactor = DetailViewReactor

    var unsplash: Unsplash?

    struct Reusable {
        static let imageCell = ReusableCell<ImageCell>()
        static let userInfoCell = ReusableCell<UserInfoCell>()
    }

    let layout = UICollectionViewFlowLayout().then {
        $0.scrollDirection = .vertical
    }

    lazy var collectionView = UICollectionView(frame: .zero, collectionViewLayout: self.layout).then {
        $0.backgroundColor = UIColor.black.withAlphaComponent(0.3)
        $0.isPagingEnabled = true
        $0.register(Reusable.imageCell)
        $0.register(Reusable.userInfoCell)
    }

    init(reactor: Reactor, unsplash: Unsplash) {
        super.init()
        self.reactor = reactor
        self.unsplash = unsplash
    }

    required convenience init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
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

    func bind(reactor: Reactor) {

        self.collectionView.rx.setDelegate(self).disposed(by: self.disposeBag)

        self.rx.viewDidLoad.flatMap { [weak self] _ -> Observable<Unsplash> in
            guard let unsplash = self?.unsplash else { return Observable.empty() }
            return Observable.just(unsplash)
            }.map { (unsplash) -> Reactor.Action in
                return Reactor.Action.setInitialItem(unsplash)
        }.bind(to: reactor.action).disposed(by: self.disposeBag)

        reactor.state.map { $0.sections }
            .bind(to: self.collectionView.rx.items(dataSource: self.createDataSource()))
            .disposed(by: self.disposeBag)
    }

    func createDataSource() -> RxCollectionViewSectionedReloadDataSource<DetailSectionModel> {
        return RxCollectionViewSectionedReloadDataSource<DetailSectionModel>(configureCell: { (dataSource, collectionView, indexPath, detailSectionItem) -> UICollectionViewCell in
            switch dataSource[indexPath] {
            case let .ImageSectionItem(unsplash):
                let cell = collectionView.dequeue(Reusable.imageCell, for: indexPath)
                let reactor = ImageCellReactor(unsplash: unsplash)
                cell.reactor = reactor
                return cell
            case let .UserInfoSectionItem(user):
                let cell = collectionView.dequeue(Reusable.userInfoCell, for: indexPath)
                let reactor = UserInfoCellReactor(user: user)
                cell.reactor = reactor
                return cell
            }
        }, configureSupplementaryView: { (dataSource, collectionView, kind, indexPath) -> UICollectionReusableView in
            return UICollectionReusableView()
        }, moveItem: { (dataSource, source, dest) in

        }, canMoveItemAtIndexPath: { (dataSource, indexPath) -> Bool in
            return false
        })
    }

}

extension DetailViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {

        switch indexPath.section {
        case 0:
            return CGSize(width: collectionView.frame.width, height: self.view.frame.height)
        case 1:
            return CGSize(width: collectionView.frame.width, height: UserInfoCell.Metric.profileImageViewSize + UserInfoCell.Metric.profileImageViewPadding * 2)
        default:
            return CGSize(width: 0, height: 0)
        }
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        guard let navBarHeight = self.navigationController?.navigationBar.frame.height else { return 0 }
        return navBarHeight
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        guard let navBarHeight = self.navigationController?.navigationBar.frame.height else { return 0 }
        return navBarHeight
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        return UIEdgeInsetsMake(0, 0, 0, 0)

    }
}

```

자 이제 Cell들을 만들어 주겠습니다.

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

`Cells/UserInfoCellReactor.swift`

```swift
import ReactorKit
import RxSwift
import RxCocoa

class UserInfoCellReactor: Reactor {
    typealias Action = NoAction

    let initialState: User

    init(user: User) {
        self.initialState = user
    }


}

```

`Cells/UserInfoCell.swift`

```swift
import UIKit
import ReactorKit
import SnapKit
import Then
import CGFloatLiteral

class UserInfoCell: BaseCollectionViewCell, View {
    typealias Reactor = UserInfoCellReactor

    struct Metric {
        static let profileImageViewSize = 100.f
        static let profileImageViewPadding = 10.f
        static let nameLabelHeight = 40.f
    }

    struct Font {
        static let usernameLabel = UIFont.systemFont(ofSize: 20, weight: UIFont.Weight.regular)
        static let nameLabel = UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.regular)
    }

    let profileImageView = UIImageView().then {
        $0.backgroundColor = .white
        $0.clipsToBounds = true
        $0.layer.cornerRadius = Metric.profileImageViewSize / 2
    }

    let usernameLabel = UILabel().then {
        $0.font = Font.usernameLabel
    }

    let nameLabel = UILabel().then {
        $0.font = Font.nameLabel
    }

    let unsplashInfoTextView = UITextView().then {
        $0.backgroundColor = .blue
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.contentView.backgroundColor = .white
        self.contentView.addSubview(profileImageView)

        self.contentView.addSubview(nameLabel)
        self.contentView.addSubview(usernameLabel)
        self.contentView.addSubview(unsplashInfoTextView)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func layoutSubviews() {
        self.profileImageView.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(Metric.profileImageViewPadding)
            make.left.equalToSuperview().offset(Metric.profileImageViewPadding)
            make.width.equalTo(Metric.profileImageViewSize)
            make.height.equalTo(Metric.profileImageViewSize)
        }

        self.nameLabel.snp.makeConstraints { (make) in
            make.top.equalTo(self.profileImageView.centerX).offset(8)
            make.left.equalTo(self.profileImageView.right).offset(8 + Metric.profileImageViewPadding + Metric.profileImageViewSize)
            make.height.equalTo(Metric.nameLabelHeight)
        }

        self.usernameLabel.snp.makeConstraints { (make) in
            make.top.equalTo(self.nameLabel.top).offset(Metric.nameLabelHeight + 8)
            make.left.equalTo(self.profileImageView.right).offset(8 + Metric.profileImageViewPadding + Metric.profileImageViewSize)
        }

        self.unsplashInfoTextView.snp.makeConstraints { (make) in
            make.top.equalTo(self.profileImageView.top).offset(Metric.profileImageViewPadding + Metric.profileImageViewSize + 16)
            make.left.equalToSuperview()
            make.bottom.equalToSuperview()
            make.right.equalToSuperview()
        }

    }

    func bind(reactor: Reactor) {
        let name = reactor.currentState.name
        let profileImage = reactor.currentState.profileImage
        let username = reactor.currentState.username
        let profileImageUrl = profileImage.medium

        guard let url = URL(string: profileImageUrl) else { return }

        self.profileImageView.kf.setImage(with: url)

        self.nameLabel.text = name
        self.usernameLabel.text = username

    }


}

```

모두 끝났습니다!
