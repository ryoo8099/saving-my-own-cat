// 게임 객체들
let player = {
    x: 100,
    y: 300,
    width: 40,
    height: 60,
    velocityY: 0,
    isJumping: false,
    groundY: 300
};

let enemies = [];
let bullets = [];

// 플레이어 업데이트
function updatePlayer() {
    // 좌우 이동
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= 5;
    }
    if (keys['ArrowRight'] && player.x < 800 - player.width) {
        player.x += 5;
    }
    
    // 점프
    if (keys[' '] && !player.isJumping) {
        player.velocityY = -15;
        player.isJumping = true;
    }
    
    // 중력
    player.velocityY += 0.8;
    player.y += player.velocityY;
    
    // 바닥 체크
    if (player.y > player.groundY) {
        player.y = player.groundY;
        player.velocityY = 0;
        player.isJumping = false;
    }
}

// 플레이어 그리기
function drawPlayer(ctx) {
    // 몸체
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(player.x + player.width/2, player.y + 15, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // 눈
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(player.x + player.width/2 - 5, player.y + 12, 3, 0, Math.PI * 2);
    ctx.arc(player.x + player.width/2 + 5, player.y + 12, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 귀
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(player.x + 5, player.y);
    ctx.lineTo(player.x + 15, player.y - 10);
    ctx.lineTo(player.x + 25, player.y);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(player.x + 15, player.y);
    ctx.lineTo(player.x + 25, player.y - 10);
    ctx.lineTo(player.x + 35, player.y);
    ctx.fill();
}

// 배경 그리기
function drawBackground(ctx) {
    // 하늘 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 400);
    
    // 구름
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(100, 80, 20, 0, Math.PI * 2);
    ctx.arc(120, 80, 25, 0, Math.PI * 2);
    ctx.arc(140, 80, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(600, 60, 15, 0, Math.PI * 2);
    ctx.arc(615, 60, 20, 0, Math.PI * 2);
    ctx.arc(630, 60, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // 땅
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 360, 800, 40);
}

// 적 생성
function createEnemy() {
    const enemy = {
        x: 800,
        y: 300,
        width: 40,
        height: 60,
        speed: -2,
        color: '#FF6B6B'
    };
    enemies.push(enemy);
    console.log("적이 생성되었습니다!");
}

// 적들 업데이트
function updateEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.x += enemy.speed;
        
        // 화면 밖으로 나가면 제거
        if (enemy.x + enemy.width < 0) {
            enemies.splice(index, 1);
        }
    });
}

// 적들 그리기
function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        // 몸체
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // 얼굴
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width/2, enemy.y + 15, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // 눈 (빨간색)
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width/2 - 5, enemy.y + 12, 3, 0, Math.PI * 2);
        ctx.arc(enemy.x + enemy.width/2 + 5, enemy.y + 12, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // 뿔
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.moveTo(enemy.x + 10, enemy.y);
        ctx.lineTo(enemy.x + 20, enemy.y - 15);
        ctx.lineTo(enemy.x + 30, enemy.y);
        ctx.fill();
    });
}

// 총알 생성
function createBullet() {
    if (gameState.ammo > 0) {
        const bullet = {
            x: player.x + player.width,
            y: player.y + player.height/2,
            width: 10,
            height: 5,
            speed: 8,
            color: '#FFFF00'
        };
        bullets.push(bullet);
        gameState.ammo--;
        console.log("총알 발사!");
    }
}

// 총알들 업데이트
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        
        // 화면 밖으로 나가면 제거
        if (bullet.x > 800) {
            bullets.splice(index, 1);
        }
    });
    
    // 발사 처리
    if (keys['1'] && gameState.ammo > 0) {
        if (!keys.lastShot || Date.now() - keys.lastShot > 200) {
            createBullet();
            keys.lastShot = Date.now();
        }
    }
}

// 총알들 그리기
function drawBullets(ctx) {
    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // 총알 궤적 효과
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.fillRect(bullet.x - 5, bullet.y + 1, 5, 3);
    });
}

// 충돌 감지
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                
                // 충돌 발생
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                
                // 점수 추가
                if (typeof enemyDefeated === 'function') {
                    enemyDefeated();
                } else {
                    gameState.score += 10;
                    console.log("적 처치! 점수:", gameState.score);
                }
            }
        });
    });
    
    // 플레이어와 적 충돌
    enemies.forEach(enemy => {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            
            // 게임 오버
            if (typeof gameOver === 'function') {
                gameOver();
            } else {
                gameState.gameOver = true;
                console.log("게임 오버!");
            }
        }
    });
}

// UI 그리기
function drawUI(ctx) {
    // 점수
    ctx.fillStyle = 'black';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`점수: ${gameState.score}`, 10, 30);
    
    // 총알 수
    ctx.fillText(`총알: ${gameState.ammo}`, 10, 60);
    
    // 레벨
    ctx.fillText(`레벨: ${gameState.level}`, 10, 90);
    
    // 게임 오버 메시지
    if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, 800, 400);
        
        ctx.fillStyle = 'red';
        ctx.font = 'bold 48px Arial';
        ctx.fillText('게임 오버!', 250, 200);
        
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(`최종 점수: ${gameState.score}`, 300, 250);
        ctx.fillText('다시 시작하려면 새로고침하세요', 200, 300);
    }
}

// 게임 객체들 초기화
function resetGameObjects() {
    player = {
        x: 100,
        y: 300,
        width: 40,
        height: 60,
        velocityY: 0,
        isJumping: false,
        groundY: 300
    };
    
    enemies = [];
    bullets = [];
} 