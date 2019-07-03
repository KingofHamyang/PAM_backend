설문조사 플랫폼 ParticipateAsMoney **PAM**
======================

## 1. **ParticipateAsMoney** 소개
**ParticipateAsMoney** (PAM)은 설문조사를 등록하고, 참여할 수 있는 사이트입니다. 설문에 참여하는 사람들은 그 대가로 포인트를 받을 수 있으며, 설문을 등록하고 하는 사람은 그에 합당한 대가를 지불해야 합니다. 포인트를 통해 참여를 유도하고, 설문을 등록하는 설문조사 생태계 플랫폼 조성을 목표로 합니다.

## 2. Back-end
이 repository는 PAM의 database와 통신하기 위한 HTTP 기반 Node.js API Server입니다. AWS RDS를 이용해 MySQL을 띄우고, 방화벽을 통해 해당 API를 통해서만 데이터에 접근하도록 합니다.

## 3. 실행 방법
### 1. package.json에 나와있는 모듈을 모두 설치한다

```
npm install express
...등등
```
### 2. npm start를 이용하여 테스트서버 실행

```
node app.js
```
router/survey/Survey_regist - 설문 등록
router/survey/Survey_titles - 설문 제목 리스트
router/survey/Survey_details - 설문 제목과 답변 목록들 함께 출력
router/survey/Survey_submit - 설문 참여 답변 제출 
router/survey/Survey_result - 설문 조사 결과 확인

router/user/regist_post - 회원가입
router/user/login_post - 로그인, 유효한 로그인 시도 시 cookie 발급 
router/user/logout - 로그아웃, 쿠키파괴
router/user/myinfo - 내 정보 확인

주의. 아직 배포환경에서 쓸 정도로 개발되지 않았습니다!
	

****