# FIB (Fox In Books)
Spring Boot + React 図書紹介 / 購買サイト。


## 🖥️ プロジェクト紹介
キョボムンゴ、yes24ページを参考にして作った図書サイト。


## 🕰️ 開発期間
* 一次 (HTML / CSS) : 23.06.19 ~ 23.07.21
* 二次 (JavaScript / React) : 23.08.7 ~ 23.09.01
* 三次 (Spring Boot / DB) : 23.11.1 ~ 23.12.15


### 🧑‍🤝‍🧑 チームメンバー
 - チーム長 : キム·ヘリム - 決済/主文、商品登録、レビュー。
 - チーム員 1 : アン·ジンヒョク - ログイン、会員加入、会員情報修正、ID検索、PASSWORD検索、マイページ。
 - チーム員 2 : ヤン·セヒョン - メインページ、イベント/クーポン、公知事項/お問い合わせ。
 - チーム員 3 : イ·ソンリョン - 商品リスト、カテゴリー別商品、配送情報。


### ⚙️ 開発環境
 - `Java 11`
 - **IDE** : STS 3.9.9
 - **Framework** : SpringBoot 2.7.17, React (JSX)
 - **Database** : mySQL 8.0.25


## 📌 主要機能
#### メインページ - <a >詳細(WIKI)</a>
 - イメージスライド
 - ナビゲーション·メニュー
 - 検索

#### ログイン - <a href="https://github.com/redswer/finalProject/wiki/Login_japanese">詳細(WIKI)</a>
 - DBの情報と比較
 - ID検索、PW検索 (新しいPWをメールで配信)
 - ログイン時にクッキー(cookie)とセッション(session)を作成
 - ajax / axiosを利用して有効性検査
#### 会員加入 - <a href="https://github.com/redswer/finalProject/wiki/Join_Membership_japanese">詳細(WIKI)</a>
 - カカオアドレスAPI連動
 - 有効性検査
 - ID重複チェック
#### マイページ - <a >詳細(WIKI)</a>
 - 会員情報変更
 - 会員脱退

#### 詳細ページ - <a >詳細(WIKI)</a>
 - カテゴリー別分類
 - サイドメニュー
 - 製品検索
#### 決済ページ - <a >詳細(WIKI)</a>
 - 決済手段の選択
 - 住所管理
 - クーポン適用
#### お問い合わせ/お知らせ - <a >詳細(WIKI)</a>
 - 文の作成、読み込み、修正、削除 (CRUD)

#### 管理者ページ - <a >詳細(WIKI)</a>
 - 商品登録
