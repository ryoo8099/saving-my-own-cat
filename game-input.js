// 키보드 입력 처리
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log("Key pressed:", e.key);
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// 모바일 터치 입력 처리
const touchInput = {
    jump: false,
    shoot: false,
    bomb: false
};

// 터치 버튼 이벤트 리스너
function setupTouchControls() {
    const jumpBtn = document.getElementById('jumpBtn');
    const shootBtn = document.getElementById('shootBtn');
    const bombBtn = document.getElementById('bombBtn');

    // 점프 버튼
    jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchInput.jump = true;
        keys[' '] = true; // 스페이스바와 동일하게 처리
    });

    jumpBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchInput.jump = false;
        keys[' '] = false;
    });

    // 발사 버튼
    shootBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchInput.shoot = true;
        keys['1'] = true; // 1번키와 동일하게 처리
    });

    shootBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchInput.shoot = false;
        keys['1'] = false;
    });

    // 폭탄 버튼
    bombBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchInput.bomb = true;
        keys['a'] = true; // A키와 동일하게 처리
    });

    bombBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        touchInput.bomb = false;
        keys['a'] = false;
    });

    // 마우스 이벤트도 지원 (데스크톱 테스트용)
    jumpBtn.addEventListener('mousedown', () => {
        touchInput.jump = true;
        keys[' '] = true;
    });

    jumpBtn.addEventListener('mouseup', () => {
        touchInput.jump = false;
        keys[' '] = false;
    });

    shootBtn.addEventListener('mousedown', () => {
        touchInput.shoot = true;
        keys['1'] = true;
    });

    shootBtn.addEventListener('mouseup', () => {
        touchInput.shoot = false;
        keys['1'] = false;
    });

    bombBtn.addEventListener('mousedown', () => {
        touchInput.bomb = true;
        keys['a'] = true;
    });

    bombBtn.addEventListener('mouseup', () => {
        touchInput.bomb = false;
        keys['a'] = false;
    });
}

// 화면 회전 감지
function setupOrientationWarning() {
    const orientationWarning = document.getElementById('orientationWarning');
    
    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            // 세로 모드
            orientationWarning.classList.remove('show');
        } else {
            // 가로 모드
            orientationWarning.classList.add('show');
        }
    }

    // 초기 체크
    checkOrientation();
    
    // 화면 회전 시 체크
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
}

// 터치 이벤트 최적화
function preventDefaultTouchEvents() {
    document.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('touch-btn')) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    setupTouchControls();
    setupOrientationWarning();
    preventDefaultTouchEvents();
    console.log("모바일 터치 컨트롤이 설정되었습니다!");
}); 