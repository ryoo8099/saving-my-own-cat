// 플레이어 (고양이)
const player = {
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    groundY: 300,
    color: '#FFA500'
};

// 총알 배열
const bullets = [];

// 적 배열
const enemies = [];

// 적 총알 배열
const enemyBullets = [];

// 보스 배열
const bosses = [];

// 애완동물 배열
const pets = [];

// 폭격기 배열
const bombers = [];

// 군인 고양이 캐릭터
const soldierCat = {
    x: 150,
    y: 300,
    width: 40,
    height: 40,
    color: '#4A90E2',
    lastFireTime: 0,
    fireInterval: 200, // 0.2초 = 200ms
    isActive: true
};

// 자주포 총알 배열
const artilleryBullets = [];

// 키보드 입력
const keys = {}; 