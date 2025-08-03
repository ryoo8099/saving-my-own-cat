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

// 게임 상태
let gameState = {
    score: 0,
    playerHP: 1500,
    maxHP: 1500,
    gameOver: false,
    level: 1,
    stage: 1,
    ammo: 150,
    maxAmmo: 150,
    isReloading: false,
    bomberAvailable: true,
    hasKey: false,
    petRescued: false,
    rescueAnimation: false,
    rescueStartTime: 0,
    lastEnemySpawnTime: 0,
    lastBossSpawnTime: 0
};

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