# 🎮 게임 개발 프로젝트 인수인계 문서

## 📋 프로젝트 정보

**프로젝트명:** 괴물을 물리치고, 너의 애완동물을 구하라!
**GitHub 저장소:** https://github.com/ryoo8099/saving-my-own-cat
**라이브 링크:** https://ryoo8099.github.io/saving-my-own-cat/

## 🖥️ 다른 PC에서 작업하는 방법

### 1단계: 새 PC에서 Git 설치
```bash
# Windows에서 Git 설치
# https://git-scm.com/download/win 에서 다운로드
```

### 2단계: 프로젝트 클론
```bash
# 원하는 폴더로 이동
cd C:\Users\YourName\Desktop

# GitHub에서 프로젝트 클론
git clone https://github.com/ryoo8099/saving-my-own-cat.git

# 프로젝트 폴더로 이동
cd saving-my-own-cat
```

### 3단계: 개발 환경 설정
```bash
# 로컬 서버 실행 (Python이 설치되어 있다면)
python -m http.server 8000

# 또는 Node.js가 설치되어 있다면
npx http-server

# 브라우저에서 접속
http://localhost:8000/game.html
```

### 4단계: 작업 후 업로드
```bash
# 변경사항 확인
git status

# 변경사항 추가
git add .

# 커밋
git commit -m "작업 내용 설명"

# GitHub에 업로드
git push origin main
```

## 📁 프로젝트 구조

```
saving-my-own-cat/
├── game.html          # 메인 게임 파일
├── game.css           # 스타일 파일
├── game-state.js      # 게임 상태 관리
├── game-objects.js    # 게임 객체들
├── game-input.js      # 입력 처리
├── game-functions.js  # 게임 로직
├── game-drawing.js    # 그래픽 렌더링
├── game-loop.js       # 게임 루프
└── README.md          # 프로젝트 설명
```

## 🎮 게임 기능

### 현재 구현된 기능:
- ✅ 플레이어 고양이 (파란색, 귀, 눈)
- ✅ 적들 (빨간색, 뿔, 빨간 눈)
- ✅ 총알 시스템 (노란색, 궤적)
- ✅ 배경 (하늘 그라데이션, 구름, 땅)
- ✅ 점수 시스템
- ✅ 키보드 컨트롤

### 조작법:
- **방향키:** 좌우 이동
- **스페이스바:** 점프
- **1번키:** 총알 발사
- **R키:** 장전

## 🔧 개발 팁

### 1. 게임 수정 시 주의사항:
- `game-functions.js`에서 게임 로직 수정
- `game-drawing.js`에서 그래픽 수정
- `game-input.js`에서 입력 처리 수정
- `game-loop.js`에서 게임 루프 수정

### 2. 테스트 방법:
- 브라우저에서 `F12`를 눌러 개발자 도구 열기
- Console 탭에서 에러 확인
- Network 탭에서 파일 로딩 확인

### 3. 디버깅:
```javascript
// 콘솔에 로그 출력
console.log("디버그 메시지");

// 게임 상태 확인
console.log("플레이어 위치:", player.x, player.y);
console.log("적 개수:", enemies.length);
```

## 🚀 배포 방법

### GitHub Pages 자동 배포:
1. GitHub 저장소로 이동
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main
5. Save 클릭

### 수동 배포:
```bash
# 변경사항 커밋
git add .
git commit -m "업데이트 내용"
git push origin main

# 몇 분 후 자동으로 배포됨
```

## 📞 문제 해결

### 자주 발생하는 문제:

1. **게임이 안 나올 때:**
   - 브라우저 캐시 삭제 (Ctrl+F5)
   - 개발자 도구에서 에러 확인

2. **Git 오류:**
   ```bash
   # 강제로 원격 저장소와 동기화
   git fetch origin
   git reset --hard origin/main
   ```

3. **로컬 서버 오류:**
   - 다른 포트 사용: `python -m http.server 8080`
   - 방화벽 설정 확인

## 📝 작업 기록

### 최근 작업 내용:
- 게임 루프 최적화
- 충돌 감지 시스템 개선
- UI 표시 개선
- 키보드 입력 처리 개선

### 다음 작업 예정:
- 사운드 효과 추가
- 애니메이션 개선
- 레벨 시스템 구현
- 파워업 아이템 추가

---

**💡 팁:** 작업할 때마다 `git commit`과 `git push`를 잊지 마세요! 