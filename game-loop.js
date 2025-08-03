// 게임 루프
function gameLoop() {
    // 게임 오버 상태 체크
    if (gameState.gameOver) {
        return; // 게임 오버 시 루프 중단
    }
    
    // 일시정지 상태 체크
    if (gameState.isPaused) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    // 캔버스 크기 조정 (모바일 최적화)
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // 화면 크기에 맞게 캔버스 조정
    const container = canvas.parentElement;
    const maxWidth = Math.min(800, window.innerWidth - 40);
    const maxHeight = Math.min(400, window.innerHeight * 0.6);
    
    canvas.style.width = maxWidth + 'px';
    canvas.style.height = maxHeight + 'px';
    
    // 화면 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 배경 그리기
    drawBackground(ctx);
    
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
    
    // 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
function startGame() {
    console.log("게임이 시작되었습니다!");
    gameLoop();
}

// 페이지 로드 시 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    // 모바일 최적화 설정
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        // 터치 이벤트 최적화
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
    
    // 게임 시작
    startGame();
});

// 윈도우 리사이즈 시 캔버스 크기 조정
window.addEventListener('resize', () => {
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const maxWidth = Math.min(800, window.innerWidth - 40);
        const maxHeight = Math.min(400, window.innerHeight * 0.6);
        
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = maxHeight + 'px';
    }
}); 