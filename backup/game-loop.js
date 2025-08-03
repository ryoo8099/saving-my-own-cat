// 게임 루프
function gameLoop() {
    // 화면 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameState.gameOver && !gameState.petRescued) {
        // 전쟁 배경 그리기
        drawWarBackground();
        
        // 플레이어 업데이트
        updatePlayer();
        
        // 총알 업데이트
        updateBullets();
        
        // 자주포 총알 업데이트
        updateArtilleryBullets();
        
        // 군인 고양이 자주포 발사
        fireArtillery();
        
        // 폭격기 업데이트
        updateBombers();
        
        // 적 업데이트
        updateEnemies();
        
        // 보스 업데이트
        updateBosses();
        
        // 적 총알 업데이트
        updateEnemyBullets();
        
        // 충돌 체크
        checkCollisions();
        
        // 자동 철장 열기 체크
        checkAutoOpenCage();
        
        // 스테이지 3에서 열쇠를 얻은 후에는 적 생성 중단
        if (!(gameState.stage === 3 && gameState.hasKey)) {
            // 적 생성 (0.5초마다)
            const currentTime = Date.now();
            if (!gameState.lastEnemySpawnTime || currentTime - gameState.lastEnemySpawnTime > 500) {
                createEnemy();
                gameState.lastEnemySpawnTime = currentTime;
            }
            
            // 보스 생성 (2초마다)
            if (!gameState.lastBossSpawnTime || currentTime - gameState.lastBossSpawnTime > 2000) {
                createBoss();
                gameState.lastBossSpawnTime = currentTime;
            }
        }
        
        // 자동 재장전 (총알이 0이 되면 0.1초 후 자동 재장전)
        if (gameState.ammo <= 0 && !gameState.isReloading) {
            setTimeout(() => {
                gameState.ammo = gameState.maxAmmo;
                console.log("🔫 자동 재장전 완료!");
            }, 100);
        }
        
        // 게임오버 체크
        if (gameState.playerHP <= 0) {
            gameState.gameOver = true;
        }
        
        // 그리기
        drawPlayer();
        drawSoldierCat();
        drawBullets();
        drawArtilleryBullets();
        drawBombers();
        drawEnemies();
        drawBosses();
        drawEnemyBullets();
        drawCagedCat();
        drawKey();
        drawUI();
        
        // 게임 클리어 체크
        drawGameClear();
    } else if (gameState.gameOver) {
        drawGameOver();
    } else if (gameState.petRescued) {
        // 구출 완료 시 축하 배경 그리기
        drawCelebrationBackground();
        drawFinalCelebration();
    }
    
    requestAnimationFrame(gameLoop);
}

// 게임 시작
console.log("🐱 괴물을 물리치고, 너의 애완동물을 구하라! 게임이 시작되었습니다!");

// 사운드 시스템 초기화
initSounds();

gameLoop(); 