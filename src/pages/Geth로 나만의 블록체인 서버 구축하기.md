---
title: "Geth로 나만의 블록체인 서버 구축하기."
date: "2018-09-22"
---

First! Install Geth.

먼저 게쓰 (Geth)를 인스톨 해야한다... 뭐 구글에 찾아보면 다 나온다!

그다음에 폴더를 하나 만들고, genesis.json 을 작성하자!

# Genesis

나는 이때까지, naive chain이나, js로 만들어진 chain들을 따라 쳐보면서, 제네시스 제네시스 하던데, 그냥 처음 블록과 관련된거니 했는데, 맞다!

뭐 블록체인이란게 꼬리에 꼬리를 물어서 서로간의 모든것을 알고있다. 그래서 변조가 불가능하다 사실상. 왜냐면 한개를 변조하면 그것과 연관된 모든~~~것을 변조해야 하기 때문이다. << -- 라는 것이 개념인데, 이 블록들로 이루어진 체인들도 사실 시작점이 있을것 아닌가?? 그 시작 블록의 토대가 되는것이 바로 **genesis** 이다.

`genesis.json`

```json
{
  "config": {
    "chainId": 33,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "nonce": "0x0000000000000033",
  "timestamp": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x8000000",
  "difficulty": "0x100",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x3333333333333333333333333333333333333333",
  "alloc": {}
}
```

사실 ethereum 의 genesis.json은 구글에 sample 검색하면 다나온다.

나도 그것을 갖다 쓰겠다..

근데 구글에서 검색한것은 coinbase값이 임의로 설정된 것이므로, 우리는 일단 이 genesis.json을 냅두고, account 부터 생성하자..

```bash
$ geth --datadir ./data account new
# 위 명령어를 실행 시키면 아래와 같이 나온다.
# 비밀번호 두번 입력해주면 끝.
INFO [09-22|22:34:33.666] Maximum peer count                       ETH=25 LES=0 total=25
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {25f00025ad482e642eeec89d9a8de4fd6513d729}
# 이 위의 해시값들이 방금 만들어진 계정의 주소가 된다.
```

그럼 이 주소를 복사하고, 아까 genesis.json파일의 coinbase에 추가해주자. 또한 alloc 부분에도 추가하여 이 계정에 초기 할당값을 주어보자.

```json
{
  "config": {
    "chainId": 33,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "nonce": "0x0000000000000033",
  "timestamp": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x8000000",
  "difficulty": "0x100",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x25f00025ad482e642eeec89d9a8de4fd6513d729",
  "alloc": {
    "25f00025ad482e642eeec89d9a8de4fd6513d729": {
      "balance": "800000000000000000000"
    }
  }
}
```

뭐 한 이정도 초기값 주면 될것같다.

coinbase라는 것은 나중에 마이닝을 할때 알게되겠지만, 마이닝 할때 어떤 계정을 기준으로 하느냐 이다. 저 값은 결국 계정의 주소값이다.
또한 alloc은 계정별로 balance(값)이 얼마나 들어갈지 설정해놓는것이다.

음 이제 계정도 만들었고, genesis.json도 구현했으니, 이 genesis를 바탕으로 데이터를 생성해보자!

```bash
$ geth --datadir ./data init genesis.json
```

명령어 실행하면 자동으로 data폴더가 생성되고 그안에 정보들이 담긴다.

keystore 폴더에는 아까 만든 계정의 json파일이 생성되있다.

그럼 이제 이 블록체인 서버를 돌리고, 콘솔로 접속해보자.

```bash
$ geth --networkid 8888 --datadir ./data console
```

음 저렇게 쳤더니, 이미 30303을 쓰고있다네?? 뭐지.. 아 따로 빼놓은 서버를 종료를 안시켰네, 뭐 이런경우! geth 명령어에서 --port 옵션을 사용하면 된다.
30303은 기본 geth 서버 포트이다. 동일한 포트를 같이 쓸수 없으므로 나는 오류였다.

무튼 종료시키고, 다시 실행시키니.

```bash
Welcome to the Geth JavaScript console!

instance: Geth/v1.8.14-stable/darwin-amd64/go1.10.3
INFO [09-22|22:42:39.451] Etherbase automatically configured       address=0x25f00025aD482E642eEEc89d9a8DE4fd6513D729
coinbase: 0x25f00025ad482e642eeec89d9a8de4fd6513d729
at block: 0 (Thu, 01 Jan 1970 09:00:00 KST)
 datadir: /Users/killi8n/geth-demo/data
 modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> INFO [09-22|22:42:39.543] Mapped network port                      proto=tcp extport=30303 intport=30303 interface="UPNP IGDv2-IP1"
```

뭐 이러한 웰컴 로그가 뜬다.
자 이제 아까 기본값으로 할당했던 8000000000이 잘들어갔는지 볼까??

```javascript
> eth.getBalance(eth.accounts[0])
800000000000000000000
```

흐허허 잘 들어가 있군..

geth에는 크게 다음과 같은 명령어들이 있다.

admin
eth
personal
miner
net

eth.getBalance()로 계정의 balance 값을 구할수있다.

```javascript
> eth.getBalance(eth.accounts[0])
800000000000000000000
```

eth.accounts 쳐보면 이 서버의 모든 계정을 볼수 있다. 접근은 인덱스로 가능하다.

```js
> eth.accounts
["0x25f00025ad482e642eeec89d9a8de4fd6513d729"]
> eth.accounts[0]
"0x25f00025ad482e642eeec89d9a8de4fd6513d729"
```

이제 계정 하나를 더 만들어서 tx(트랜잭션)을 발생시켜보자.

```js
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x20559c32c91d9e2f27f2a381fc391a8db46e7a98"
// 위 명령어를 치고 똑같은 패스워드 두번 치면 아래와같이 계정주소가 뜨면서 계정이 생성된다.

> eth.accounts
["0x25f00025ad482e642eeec89d9a8de4fd6513d729", "0x20559c32c91d9e2f27f2a381fc391a8db46e7a98"]
// 두개가 있는것을 확인가능.
```

트랜잭션을 발생하기 위해 아래와 같은 명령어를 치면 오류가뜬다.(처음에는)

```js
> eth.sendTransaction({
  			// 받는 계정
......     to: "0x20559c32c91d9e2f27f2a381fc391a8db46e7a98",
  			// 보내는 계정
......     from: "0x25f00025ad482e642eeec89d9a8de4fd6513d729",
  			// 보낼 양, 그냥 10 쳐도 상관없다.
......     value: web3.toWei(10, "ether")
...... })
Error: authentication needed: password or unlock
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1
```

이유는 첨에는 계정 생성해도 잠겨있기 때문이다. 잠금을 풀어야한다.

```js
> personal.unlockAccount(eth.accounts[0])
Unlock account 0x25f00025ad482e642eeec89d9a8de4fd6513d729
Passphrase:
true

> personal.unlockAccount(eth.accounts[1])
Unlock account 0x20559c32c91d9e2f27f2a381fc391a8db46e7a98
Passphrase:
true
```

둘다 풀어준다.

다시 명령어를 실행해서 트랜잭션을 발생시킨다.

```js
> eth.sendTransaction({
    to: "0x20559c32c91d9e2f27f2a381fc391a8db46e7a98",
    from: "0x25f00025ad482e642eeec89d9a8de4fd6513d729",
    value: web3.toWei(10, "ether")
})
INFO [09-22|22:54:39.321] Setting new local account                address=0x25f00025aD482E642eEEc89d9a8DE4fd6513D729
INFO [09-22|22:54:39.321] Submitted transaction                    fullhash=0x79a618140650654f10f106a4167ecb719c62cc9129365d56a1bbad7cb391cde5 recipient=0x20559C32C91D9e2f27f2A381fc391A8Db46E7a98
"0x79a618140650654f10f106a4167ecb719c62cc9129365d56a1bbad7cb391cde5"
// 이 위에 해시값이 이 트랜잭션의 주소이다.
```

트랜잭션 발생시키고, 채굴을 하지 않으면 pending상태로 그대로 있는다.

따라서 어느 값도 아직 변경되지 않은채로, balance는 똑같이 유지된다.

확인해볼까?

```js
> eth.pendingTransactions
[{
    blockHash: null,
    blockNumber: null,
    from: "0x25f00025ad482e642eeec89d9a8de4fd6513d729",
    gas: 90000,
    gasPrice: 18000000000,
    hash: "0x79a618140650654f10f106a4167ecb719c62cc9129365d56a1bbad7cb391cde5",
    input: "0x",
    nonce: 0,
    r: "0xb84a2e2787fbe983ae94f83dc0f3003016f468c03448d2d7ca1f01914536c36d",
    s: "0x3221b966d2390ca98007f00ac7aec660f513ccaf278690a3c03d22ca3e7ec227",
    to: "0x20559c32c91d9e2f27f2a381fc391a8db46e7a98",
    transactionIndex: 0,
    v: "0x66",
    value: 10000000000000000000
}]
```

pending된 트랜잭션들의 리스트가 나타난다.
아까 발생된 트랜잭션의 주소가 hash에 나와있다.
따라서 아직 실제로는 지급이 되지않고 pending상태로 되있다는 뜻이다.

```js
> eth.getTransaction("0x79a618140650654f10f106a4167ecb719c62cc9129365d56a1bbad7cb391cde5")
{
  blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  blockNumber: null,
  from: "0x25f00025ad482e642eeec89d9a8de4fd6513d729",
  gas: 90000,
  gasPrice: 18000000000,
  hash: "0x79a618140650654f10f106a4167ecb719c62cc9129365d56a1bbad7cb391cde5",
  input: "0x",
  nonce: 0,
  r: "0xb84a2e2787fbe983ae94f83dc0f3003016f468c03448d2d7ca1f01914536c36d",
  s: "0x3221b966d2390ca98007f00ac7aec660f513ccaf278690a3c03d22ca3e7ec227",
  to: "0x20559c32c91d9e2f27f2a381fc391a8db46e7a98",
  transactionIndex: 0,
  v: "0x66",
  value: 10000000000000000000
}
```

이렇게 getTransaction을 하면 해당 트랜잭션의 정보를 볼수있다.

그렇다면 이제 채굴을 진행해서 한번 트랜잭션을 실제로 실행해보자.

그전에 coinbase에 대해 araboza.

아까도 언급했듯이 코인을 채굴하고 보상받을 계정이다.

이 coinbase는 바꿀수 있다.

```js
> eth.coinbase
"0x25f00025ad482e642eeec89d9a8de4fd6513d729"
> eth.accounts
["0x25f00025ad482e642eeec89d9a8de4fd6513d729", "0x20559c32c91d9e2f27f2a381fc391a8db46e7a98"]
> miner.setEtherbase(eth.accounts[1])
true
> eth.coinbase
"0x20559c32c91d9e2f27f2a381fc391a8db46e7a98"
```

위와같이 miner의 setEtherbase를 사용하면 바꿀수있다.

```js
miner.start();
miner.stop();
```

위 명령어들로 채굴을 시작하고, 중지한다.

miner.start(2) 로 하면 쓰레드 개수를 두개쓴다는것이다.

```js
> miner.start()
INFO [09-22|23:01:05.136] Updated mining threads                   threads=0
INFO [09-22|23:01:05.136] Transaction pool price threshold updated price=18000000000
null
> INFO [09-22|23:01:05.137] Commit new mining work                   number=1 uncles=0 txs=0 gas=0 fees=0 elapsed=1.215ms
INFO [09-22|23:01:05.138] Commit new mining work                   number=1 uncles=0 txs=1 gas=21000 fees=0.000378 elapsed=1.900ms
INFO [09-22|23:01:08.130] Successfully sealed new block            number=1 hash=89152c…114f6b elapsed=2.992s
INFO [09-22|23:01:08.134] 🔨 mined potential block                  number=1 hash=89152c…114f6b
INFO [09-22|23:01:08.134] Commit new mining work                   number=2 uncles=0 txs=0 gas=0     fees=0        elapsed=317.357µs
INFO [09-22|23:01:10.689] Successfully sealed new block            number=2 hash=4e10b9…f9a9f3 elapsed=2.555s
INFO [09-22|23:01:10.691] 🔨 mined potential block                  number=2 hash=4e10b9…f9a9f3
INFO [09-22|23:01:10.691] Commit new mining work                   number=3 uncles=0 txs=0 gas=0     fees=0        elapsed=127.201µs
INFO [09-22|23:01:11.124] Successfully sealed new block            number=3 hash=2157d0…cf506d elapsed=432.634ms
INFO [09-22|23:01:11.124] 🔨 mined potential block                  number=3 hash=2157d0…cf506d
INFO [09-22|23:01:11.124] Commit new mining work
```

대충 이러한 로그들이 뜬다. 처음 채굴하는 것이라면 사전 DAG를 쌓는 작업들을 진행 한후 mining을 진행한다.

대충 어느정도 채굴 했으면 miner.stop() 으로 끝내자.

```js
> eth.pendingTransactions
[]
> eth.getBalance(eth.accounts[1])
260000378000000000000
> eth.getBalance(eth.accounts[0])
789999622000000000000
>
```

다시 확인해보면 위와같이 pending된것은 없어지고, 계정에 정확히 잘 전달된것을 알수 있다.
