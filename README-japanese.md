# FIB (Fox In Books)
Spring Boot + React 도서 소개 / 구매 사이트


## 🖥️ 프로젝트 소개
교보문고, yes24 페이지를 참고하여 만든 도서 사이트


## 🕰️ 개발 기간
* 1차 (HTML / CSS) : 23.06.19 ~ 23.07.21
* 2차 (JavaScript / React) : 23.08.7 ~ 23.09.01
* 3차 (Spring Boot / DB) : 23.11.1 ~ 23.12.15


### 🧑‍🤝‍🧑 멤버 구성
 - 팀장 : 김해림 - 결제/주문, 상품 등록, 리뷰
 - 팀원 1 : 안진혁 - 로그인, 회원가입, 회원정보 수정, Id 찾기, Pw 찾기, 마이 페이지
 - 팀원 2 : 양세현 - 메인 페이지, 이벤트/쿠폰, 공지사항/문의
 - 팀원 3 : 이성룡 - 상품 리스트, 카테고리별 상품, 배송 정보


### ⚙️ 개발 환경
 - `Java 11`
 - **IDE** : STS 3.9.9
 - **Framework** : SpringBoot 2.7.17, React (JSX)
 - **Database** : mySQL 8.0.25


## 📌 주요 기능
#### 메인 페이지 - <a >상세보기(WIKI)</a>
 - 이미지 슬라이드
 - 네비게이션 메뉴
 - 검색

#### 로그인 - <a href="https://github.com/redswer/finalProject/wiki/Login">상세보기(WIKI)</a>
 - DB 의 정보와 비교
 - ID 찾기, PW 찾기 (새로운 PW 메일로 전송)
 - 로그인 시 쿠키 및 세션 생성
 - ajax / axios 이용하여 유효성 검사
#### 회원가입 - <a href="https://github.com/redswer/finalProject/wiki/Join_Membership">상세보기(WIKI)</a>
 - 카카오 주소 API 연동
 - 유효성 검사
 - ID 중복체크
#### 마이 페이지 - <a >상세보기(WIKI)</a>
 - 회원정보 변경
 - 회원탈퇴

#### 상세 페이지 - <a >상세보기(WIKI)</a>
 - 카테고리 별 분류
 - 사이드 메뉴
 - 제품 검색
#### 결제 페이지 - <a >상세보기(WIKI)</a>
 - 결제수단 선택
 - 주소지 관리
 - 쿠폰 적용
#### 문의 및 공지사항 - <a >상세보기(WIKI)</a>
 - 글 작성, 읽기, 수정, 삭제 (CRUD)

#### 관리자 페이지 - <a >상세보기(WIKI)</a>
 - 상품 등록
