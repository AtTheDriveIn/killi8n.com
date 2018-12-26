---
title: "ELK - Elastic Search , Logstash , Kibana 기초"
date: "2018-12-26"
---

> 출처: 1) https://okdevtv.com/mib/elk/elk5 2) https://logz.io/blog/elk-mac/

> 위 출처에 나온 글들을 바탕으로 정리하여 쓴 글임을 밝힙니다.

# ELK

- Elastic Search + Logstash + Kibana
- Elastic Search는 Apache의 Lucene을 바탕으로 개발한 실시간 분산 검색 엔진.
- Logstash는 각종 로그를 가져와 JSON형태로 만들어 ElasticSearch로 전송.
- Kibana는 ElasticSearch에 저장된 Data를 사용자에게 Dashboard 형태로 보여주는 솔루션이다.

![ELK](https://okdevtv.com/md/elk/images/elk_arch.jpg)

# Good Things☝🏽

- GA(Google Analytics) 데이터로 사이트 접속 통계를 구할경우 원하는대로 데이터를 획득하기 어렵다.
- 자체 서버의 모든 로그를 100% 수집할수 있기 때문에 데이터에 대한 신뢰성이 높다.
- 파라미터 값별로 통계를 볼수있어, 빠르게 데이터 검색할수 있다.
- 모두 오픈소스, 자유롭게 사용가능.

# 사전 준비 (LOCAL - MAC OSX)

> Install ELK Stacks with brew

```bash
brew install elasticsearch
brew install kibana
brew install logstash
```

> Start Services Of ELK

```bash
brew services start elasticsearch
brew services start kibana
brew services start logstash
brew services list
```

> open port for kibana and set elastic search's URL

```bash
sudo vim /usr/local/etc/kibana/kibana.yml
```

아래부분의 주석을 제거 후 다음과 같이 설정한다.

```bash
server.port: 5601
elasticsearch.url: "http://localhost:9200"
```

그리고 http://localhost:5601/status 로 접속해본다. 접속이 잘된다면 성공한것!

# logstash에 데이터 전달해보기.

```bash
cd /usr/local/etc/logstash
mkdir conf.d
cd conf.d
vi syslog.conf
```

다음을 붙여넣기 한다. (아마도 mac의 로컬에 있는 로그들을 수집하는 것 같다. 그 데이터에 맞다면, 메시지를 작성하여 보여주고, 날짜를 아래형식으로 보여주는 것 같다.)
그리고 output 쪽에서는 syslog-demo 라는 이름의 index로 찾을수 있게 설정하는것 같다.

```
input {
  file {
    path => [ "/var/log/*.log", "/var/log/messages", "/var/log/syslog" ]
    type => "syslog"
  }
}

filter {
  if [type] == "syslog" {
    grok {
      match => { "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }
      add_field => [ "received_at", "%{@timestamp}" ]
      add_field => [ "received_from", "%{host}" ]
    }
    syslog_pri { }
    date {
      match => [ "syslog_timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["127.0.0.1:9200"]
    index => "syslog-demo"
  }
  stdout { codec => rubydebug }
}
```

logstash를 다시 실행시키고, 위에서 만든 conf 파일을 logstash에서 끌고오게 하는 명령어를 실행한다.

```bash
brew services restart logstash
logstash -f /usr/local/etc/logstash/conf.d/syslog.conf
```

다시 http://localhost:5601 로 접속하여, 왼쪽 탭의 Management 눌러서 index pattern 쪽으로 들어간다.
그 후에 syslog-demo 라는 이름으로 검색하여 다음을 누르고, timestamp 를 선택한후 설정을 마친다.
왼쪽의 Discover 탭에서 로그를 수집한 것을 볼수 있을 것이다.

# 사전 준비 (Web Data Collection)

- 로그 수집 서버(AWS Recommended)
  - AWS 접속 key가 있는 경우
- Linux 서버 CentOS OR Ubuntu
- Java 1.8 이상

... AWS로 nginx로그를 찍는 것은 다음 글에 올려보도록 하겠습니다.
