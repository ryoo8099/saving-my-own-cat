// 게임 루프
function gameLoop() {
    // 게임 오버 상태 체크
    if (gameState && gameState.gameOver) {
        return; // 게임 오버 시 루프 중단
    }
    
    // 일시정지 상태 체크
    if (gameState && gameState.isPaused) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    // 캔버스 가져오기
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // 화면 크기에 맞게 캔버스 조정
    const maxWidth = Math.min(800, window.innerWidth - 40);
    const maxHeight = Math.min(400, window.innerHeight * 0.8);
    
    canvas.style.width = maxWidth + 'px';
    canvas.style.height = maxHeight + 'px';
    
    // 화면 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 배경 그리기
    if (typeof drawBackground === 'function') {
        drawBackground(ctx);
    }
    
    // 플레이어 업데이트 및 그리기
    if (typeof updatePlayer === 'function') {
        updatePlayer();
    }
    if (typeof drawPlayer === 'function') {
        drawPlayer(ctx);
    }
    
    // 적들 업데이트 및 그리기
    if (typeof updateEnemies === 'function') {
        updateEnemies();
    }
    if (typeof drawEnemies === 'function') {
        drawEnemies(ctx);
    }
    
    // 총알들 업데이트 및 그리기
    if (typeof updateBullets === 'function') {
        updateBullets();
    }
    if (typeof drawBullets === 'function') {
        drawBullets(ctx);
    }
    
    // 충돌 감지
    if (typeof checkCollisions === 'function') {
        checkCollisions();
    }
    
    // UI 그리기
    if (typeof drawUI === 'function') {
        drawUI(ctx);
    }
    
    // 게임 클리어 체크
    if (gameState && gameState.petRescued && typeof drawGameClear === 'function') {
        drawGameClear(ctx);
    }
    
    // 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
function startGame() {
    console.log("게임이 시작되었습니다!");
    
    // 초기 적 생성
    setTimeout(() => {
        if (typeof createEnemy === 'function') {
            createEnemy();
        }
    }, 2000);
    
    // 주기적으로 적 생성
    setInterval(() => {
        if (gameState && !gameState.gameOver && enemies && enemies.length < 3) {
            if (typeof createEnemy === 'function') {
                createEnemy();
            }
        }
    }, 3000);
    
    gameLoop();
}

// 페이지 로드 시 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    // 게임 시작
    startGame();
});

// 윈도우 리사이즈 시 캔버스 크기 조정
window.addEventListener('resize', () => {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const maxWidth = Math.min(800, window.innerWidth - 40);
        const maxHeight = Math.min(400, window.innerHeight * 0.8);
        
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = maxHeight + 'px';
    }
}); 