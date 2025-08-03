// 게임 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 사운드 효과 객체들 (간단한 오디오 컨텍스트 사용)
let audioContext = null;
let sounds = {};

// 사운드 초기화 함수
function initSounds() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 간단한 사운드 생성 함수
        function createSound(frequency, duration, type = 'sine') {
            return () => {
                if (!audioContext) return;
                
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = type;
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            };
        }
        
        // 사운드 효과 생성
        sounds = {
            shoot: createSound(800, 0.1, 'square'),      // 탕 소리
            explosion: createSound(200, 0.3, 'sawtooth'), // 펑 소리
            rescue: createSound(600, 0.5, 'sine')         // 구출 소리
        };
        
        console.log('🎵 사운드 시스템 초기화 완료!');
    } catch (e) {
        console.log('사운드 초기화 실패:', e);
    }
}

// 사운드 재생 함수
function playSound(soundName) {
    try {
        if (sounds[soundName]) {
            sounds[soundName]();
            console.log(`🔊 ${soundName} 사운드 재생!`);
        }
    } catch (e) {
        console.log('사운드 재생 실패:', e);
    }
}

// 게임 상태 관리
const gameState = {
    score: 0,
    gameOver: false,
    isPaused: false,
    ammo: 30,
    maxAmmo: 30,
    isReloading: false,
    bomberAvailable: true,
    hasKey: false,
    petRescued: false,
    level: 1,
    enemiesDefeated: 0
};

// 점수 업데이트 함수
function updateScore(points) {
    gameState.score += points;
    const scoreElement = document.getElementById('scoreValue');
    if (scoreElement) {
        scoreElement.textContent = gameState.score;
    }
}

// 게임 오버 처리
function gameOver() {
    gameState.gameOver = true;
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreElement = document.getElementById('finalScore');
    
    if (gameOverScreen && finalScoreElement) {
        finalScoreElement.textContent = gameState.score;
        gameOverScreen.style.display = 'flex';
    }
}

// 게임 재시작
function restartGame() {
    gameState.score = 0;
    gameState.gameOver = false;
    gameState.isPaused = false;
    gameState.ammo = 30;
    gameState.isReloading = false;
    gameState.bomberAvailable = true;
    gameState.hasKey = false;
    gameState.petRescued = false;
    gameState.level = 1;
    gameState.enemiesDefeated = 0;
    
    // 점수 표시 업데이트
    const scoreElement = document.getElementById('scoreValue');
    if (scoreElement) {
        scoreElement.textContent = '0';
    }
    
    // 게임 오버 화면 숨기기
    const gameOverScreen = document.getElementById('gameOverScreen');
    if (gameOverScreen) {
        gameOverScreen.style.display = 'none';
    }
    
    // 게임 객체들 초기화
    if (typeof resetGameObjects === 'function') {
        resetGameObjects();
    }
    
    console.log("게임이 재시작되었습니다!");
}

// 재시작 버튼 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
    }
});

// 게임 일시정지/재개
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    console.log(gameState.isPaused ? "게임이 일시정지되었습니다." : "게임이 재개되었습니다.");
}

// 레벨 업
function levelUp() {
    gameState.level++;
    console.log(`레벨 ${gameState.level}로 업그레이드!`);
}

// 적 처치 시 점수 추가
function enemyDefeated() {
    gameState.enemiesDefeated++;
    updateScore(10);
    
    // 10마리 처치마다 레벨업
    if (gameState.enemiesDefeated % 10 === 0) {
        levelUp();
    }
}

// 스테이지 정보
const stageInfo = {
    1: { monsters: 40, bosses: 40, name: "스테이지 1" },
    2: { monsters: 40, bosses: 40, name: "스테이지 2" },
    3: { monsters: 40, bosses: 40, name: "최종 스테이지" }
};

// 스테이지 진행 상황
let stageProgress = {
    monstersKilled: 0,
    bossesKilled: 0
}; 