// 플레이어 그리기
function drawPlayer(ctx) {
    // 몸체
    ctx.fillStyle = player.color;
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

// 적 그리기
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

// 총알 그리기
function drawBullets(ctx) {
    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // 총알 궤적 효과
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.fillRect(bullet.x - 5, bullet.y + 1, 5, 3);
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

// 게임 클리어 그리기
function drawGameClear(ctx) {
    if (gameState.petRescued) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
        ctx.fillRect(0, 0, 800, 400);
        
        ctx.fillStyle = 'green';
        ctx.font = 'bold 48px Arial';
        ctx.fillText('게임 클리어!', 250, 200);
        
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText('애완동물을 구출했습니다!', 250, 250);
        ctx.fillText(`최종 점수: ${gameState.score}`, 300, 300);
    }
} 