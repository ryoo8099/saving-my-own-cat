// 플레이어 그리기 (고양이)
function drawPlayer() {
    // 고양이 몸체 (HP에 따라 색상 변화)
    const healthPercentage = gameState.playerHP / gameState.maxHP;
    let bodyColor = player.color;
    
    if (healthPercentage < 0.3) {
        bodyColor = '#FF0000'; // 빨간색 (위험)
    } else if (healthPercentage < 0.6) {
        bodyColor = '#FFA500'; // 주황색 (주의)
    }
    
    ctx.fillStyle = bodyColor;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // 고양이 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(player.x + 20, player.y + 15, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // 고양이 귀
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(player.x + 5, player.y - 5, 8, 15);
    ctx.fillRect(player.x + 27, player.y - 5, 8, 15);
    
    // 고양이 눈
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 10, 3, 0, Math.PI * 2);
    ctx.arc(player.x + 25, player.y + 10, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 고양이 가관총 (더 큰 총)
    ctx.fillStyle = '#333';
    ctx.fillRect(player.x + 35, player.y + 15, 25, 6);
    // 가관총 배럴
    ctx.fillStyle = '#666';
    ctx.fillRect(player.x + 35, player.y + 13, 3, 10);
    ctx.fillRect(player.x + 35, player.y + 17, 3, 10);
    
    // 플레이어 HP 바
    const hpBarWidth = player.width;
    const hpBarHeight = 4;
    const hpPercentage = gameState.playerHP / gameState.maxHP;
    
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(player.x, player.y - 10, hpBarWidth, hpBarHeight);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(player.x, player.y - 10, hpBarWidth * hpPercentage, hpBarHeight);
}

// 총알 그리기
function drawBullets() {
    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// 자주포 총알 그리기
function drawArtilleryBullets() {
    artilleryBullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // 자주포 총알 효과 (더 큰 총알)
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(bullet.x + bullet.width/2, bullet.y + bullet.height/2, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

// 군인 고양이 그리기
function drawSoldierCat() {
    if (!soldierCat.isActive) return;
    
    // 군인 고양이 몸체
    ctx.fillStyle = soldierCat.color;
    ctx.fillRect(soldierCat.x, soldierCat.y, soldierCat.width, soldierCat.height);
    
    // 군인 고양이 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(soldierCat.x + 20, soldierCat.y + 15, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // 군인 고양이 귀
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(soldierCat.x + 5, soldierCat.y - 5, 8, 15);
    ctx.fillRect(soldierCat.x + 27, soldierCat.y - 5, 8, 15);
    
    // 군인 고양이 눈
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(soldierCat.x + 15, soldierCat.y + 10, 3, 0, Math.PI * 2);
    ctx.arc(soldierCat.x + 25, soldierCat.y + 10, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 군인 고양이 자주포 (더 큰 포)
    ctx.fillStyle = '#333';
    ctx.fillRect(soldierCat.x + 35, soldierCat.y + 15, 30, 8);
    // 자주포 배럴
    ctx.fillStyle = '#666';
    ctx.fillRect(soldierCat.x + 35, soldierCat.y + 13, 4, 12);
    ctx.fillRect(soldierCat.x + 35, soldierCat.y + 19, 4, 12);
    
    // 군인 고양이 헬멧
    ctx.fillStyle = '#2F4F4F';
    ctx.beginPath();
    ctx.arc(soldierCat.x + 20, soldierCat.y + 8, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // 군인 고양이 이름 표시
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText('군인 고양이', soldierCat.x - 10, soldierCat.y - 15);
}

// 폭격기 그리기
function drawBombers() {
    bombers.forEach(bomber => {
        // 폭격기 몸체
        ctx.fillStyle = bomber.color;
        ctx.fillRect(bomber.x, bomber.y, bomber.width, bomber.height);
        
        // 폭격기 날개
        ctx.fillStyle = '#666';
        ctx.fillRect(bomber.x - 10, bomber.y + 5, 20, 8);
        ctx.fillRect(bomber.x + bomber.width - 10, bomber.y + 5, 20, 8);
        
        // 폭탄 그리기
        bomber.bombs.forEach(bomb => {
            ctx.fillStyle = bomb.color;
            ctx.fillRect(bomb.x, bomb.y, bomb.width, bomb.height);
        });
    });
}

// 적 그리기
function drawEnemies() {
    enemies.forEach(enemy => {
        // 적 몸체
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        
        // 적 총
        ctx.fillStyle = '#333';
        ctx.fillRect(enemy.x - 15, enemy.y + enemy.height / 2 - 2, 15, 4);
        
        // HP 바
        const hpBarWidth = enemy.width;
        const hpBarHeight = 4;
        const hpPercentage = enemy.hp / enemy.maxHp;
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(enemy.x, enemy.y - 10, hpBarWidth, hpBarHeight);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(enemy.x, enemy.y - 10, hpBarWidth * hpPercentage, hpBarHeight);
    });
}

// 보스 그리기
function drawBosses() {
    bosses.forEach(boss => {
        // 보스 몸체
        ctx.fillStyle = boss.color;
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
        
        // 보스 총
        ctx.fillStyle = '#333';
        ctx.fillRect(boss.x - 20, boss.y + boss.height / 2 - 3, 20, 6);
        
        // 보스 HP 바
        const hpBarWidth = boss.width;
        const hpBarHeight = 6;
        const hpPercentage = boss.hp / boss.maxHp;
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(boss.x, boss.y - 15, hpBarWidth, hpBarHeight);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(boss.x, boss.y - 15, hpBarWidth * hpPercentage, hpBarHeight);
        
        // 보스 라벨
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(`BOSS ${boss.type}`, boss.x, boss.y - 20);
    });
}

// 고양이 그리기 (철창에 갇힌)
function drawCagedCat() {
    // 구출 완료 후에는 최종 축하 화면으로 넘어가므로 철창은 그리지 않음
    if (gameState.petRescued) {
        return;
    }
    
    // 철창 (5cm 더 아래로 이동 - y: 70 → 120)
    ctx.fillStyle = '#666';
    ctx.fillRect(750, 120, 40, 60);
    
    // 철창 막대들
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = '#333';
        ctx.fillRect(752 + i * 8, 120, 2, 60);
    }
    
    // 자물쇠 (열쇠로 열기 전까지 표시)
    if (!gameState.rescueAnimation && !gameState.petRescued) {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(770, 140, 8, 12);
        
        // 자물쇠 구멍
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(774, 146, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 고양이
    if (!gameState.rescueAnimation && !gameState.petRescued) {
        // 갇힌 고양이
        drawCagedCatBody();
    } else if (gameState.rescueAnimation) {
        // 구출 애니메이션 중인 고양이
        drawRescueAnimation();
    }
}

// 갇힌 고양이 그리기
function drawCagedCatBody() {
    // 고양이 몸체 (5cm 더 아래로 이동 - y: 80 → 130)
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(755, 130, 30, 30);
    
    // 고양이 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(770, 140, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // 고양이 눈
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(767, 138, 2, 0, Math.PI * 2);
    ctx.arc(773, 138, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // 고양이 입 (슬픈 표정)
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(770, 145, 2, 0, Math.PI * 2);
    ctx.fill();
}

// 구출 애니메이션 그리기
function drawRescueAnimation() {
    const currentTime = Date.now();
    const elapsed = currentTime - gameState.rescueStartTime;
    
    if (elapsed < 3000) { // 3초간 애니메이션
        // 철창에서 화면 중앙으로 이동하는 애니메이션
        const progress = elapsed / 3000;
        const startX = 755;
        const endX = canvas.width / 2 - 15; // 화면 중앙
        const catX = startX + (endX - startX) * progress;
        const catY = 130 + (300 - 130) * progress; // 땅으로 내려오는 효과 (시작점을 130으로 조정)
        
        // 고양이 몸체
        ctx.fillStyle = '#FFA500';
        ctx.fillRect(catX, catY, 30, 30);
        
        // 고양이 얼굴
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(catX + 15, catY + 10, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // 고양이 눈 (행복한 표정)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(catX + 12, catY + 8, 2, 0, Math.PI * 2);
        ctx.arc(catX + 18, catY + 8, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // 고양이 입 (웃는 표정)
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(catX + 15, catY + 15, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // 고양이 귀
        ctx.fillStyle = '#FFA500';
        ctx.fillRect(catX + 5, catY - 5, 8, 15);
        ctx.fillRect(catX + 17, catY - 5, 8, 15);
        
        // 구출 메시지
        ctx.fillStyle = 'gold';
        ctx.font = '16px Arial';
        ctx.fillText('🎉 구출 완료!', catX - 10, catY - 30);
    } else {
        // 애니메이션 완료
        gameState.rescueAnimation = false;
        gameState.petRescued = true;
    }
}

// 구출된 고양이 그리기 (만세하는 모습)
function drawRescuedCat() {
    // 구출 완료 후에는 최종 축하 화면으로 넘어가므로 이 함수는 사용되지 않음
    // 대신 drawFinalCelebration 함수가 호출됨
}

// 플레이어 축하 모습 그리기
function drawPlayerCelebration() {
    // 플레이어 만세하는 팔
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(player.x + 15, player.y - 15, 4, 15); // 왼팔
    ctx.fillRect(player.x + 21, player.y - 15, 4, 15); // 오른팔
    
    // 플레이어 축하 메시지
    ctx.fillStyle = 'gold';
    ctx.font = '12px Arial';
    ctx.fillText('🎉 성공!', player.x - 10, player.y - 35);
}

// 플레이어 중앙 축하 모습 그리기
function drawPlayerCenterCelebration() {
    // 플레이어를 화면 중앙으로 이동
    const screenCenterX = canvas.width / 2;
    const playerCenterX = screenCenterX + 50; // 고양이 옆에 위치
    
    // 플레이어 몸체 (중앙에 위치)
    const healthPercentage = gameState.playerHP / gameState.maxHP;
    let bodyColor = player.color;
    
    if (healthPercentage < 0.3) {
        bodyColor = '#FF0000'; // 빨간색 (위험)
    } else if (healthPercentage < 0.6) {
        bodyColor = '#FFA500'; // 주황색 (주의)
    }
    
    ctx.fillStyle = bodyColor;
    ctx.fillRect(playerCenterX, 300, player.width, player.height);
    
    // 플레이어 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(playerCenterX + 20, 315, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // 플레이어 귀
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(playerCenterX + 5, 295, 8, 15);
    ctx.fillRect(playerCenterX + 27, 295, 8, 15);
    
    // 플레이어 눈
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(playerCenterX + 15, 310, 3, 0, Math.PI * 2);
    ctx.arc(playerCenterX + 25, 310, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 플레이어 가관총
    ctx.fillStyle = '#333';
    ctx.fillRect(playerCenterX + 35, 315, 25, 6);
    ctx.fillStyle = '#666';
    ctx.fillRect(playerCenterX + 35, 313, 3, 10);
    ctx.fillRect(playerCenterX + 35, 317, 3, 10);
    
    // 플레이어 만세하는 팔
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(playerCenterX + 15, 285, 4, 15); // 왼팔
    ctx.fillRect(playerCenterX + 21, 285, 4, 15); // 오른팔
    
    // 플레이어 축하 메시지
    ctx.fillStyle = 'gold';
    ctx.font = '12px Arial';
    ctx.fillText('🎉 성공!', playerCenterX - 10, 265);
    
    // 함께 만세하는 메시지
    ctx.fillStyle = 'gold';
    ctx.font = '16px Arial';
    ctx.fillText('🎉 함께 만세! 🎉', screenCenterX - 50, 250);
}

// 열쇠 그리기
function drawKey() {
    if (gameState.hasKey && !gameState.petRescued) {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(player.x + 10, player.y - 20, 15, 8);
        ctx.fillRect(player.x + 20, player.y - 18, 4, 4);
    }
}

// 적 총알 그리기
function drawEnemyBullets() {
    enemyBullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// UI 그리기
function drawUI() {
    // 구출 완료 후에는 UI를 그리지 않음
    if (gameState.petRescued) {
        return;
    }
    
    // 점수
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`점수: ${gameState.score}`, 10, 30);
    
    // 플레이어 HP (색상 변화)
    const hpColor = gameState.playerHP > gameState.maxHP * 0.6 ? 'black' : gameState.playerHP > gameState.maxHP * 0.3 ? 'orange' : 'red';
    ctx.fillStyle = hpColor;
    ctx.font = '16px Arial';
    ctx.fillText(`HP: ${gameState.playerHP}/${gameState.maxHP}`, 10, 50);
    
    // 스테이지 정보
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`스테이지: ${gameState.stage}`, 10, 70);
    ctx.fillText(`몬스터: ${stageProgress.monstersKilled}/${stageInfo[gameState.stage].monsters}`, 10, 90);
    ctx.fillText(`보스: ${stageProgress.bossesKilled}/${stageInfo[gameState.stage].bosses}`, 10, 110);
    
    // 총알 개수
    ctx.fillStyle = gameState.ammo > 0 ? 'black' : 'red';
    ctx.font = '16px Arial';
    ctx.fillText(`총알: ${gameState.ammo}/${gameState.maxAmmo}`, 10, 130);
    
    // 장전 중 표시
    if (gameState.isReloading) {
        ctx.fillStyle = 'orange';
        ctx.font = '14px Arial';
        ctx.fillText('🔫 장전 중...', 10, 150);
    }
    
    // 군인 고양이 정보
    ctx.fillStyle = '#4A90E2';
    ctx.font = '14px Arial';
    ctx.fillText('🚀 군인 고양이: 자주포 자동 발사', 10, 170);
    
    // 경고 메시지
    if (gameState.playerHP < gameState.maxHP * 0.3) {
        ctx.fillStyle = 'red';
        ctx.font = '18px Arial';
        ctx.fillText('⚠️ 위험! HP가 낮습니다!', 10, 170);
    }
    
    // HP 회복 안내
    ctx.fillStyle = 'green';
    ctx.font = '12px Arial';
    ctx.fillText('💚 탱크 처치: HP +50 | 몬스터 처치: HP +100', 10, 190);
    ctx.fillText('💚 빠른 적 처치: HP +80 | 강한 적 처치: HP +120', 10, 205);
    
    // 폭격기 상태
    if (gameState.bomberAvailable) {
        ctx.fillStyle = 'blue';
        ctx.font = '12px Arial';
        ctx.fillText('🚁 A키: 폭격기 호출 가능', 10, 210);
    } else {
        ctx.fillStyle = 'gray';
        ctx.font = '12px Arial';
        ctx.fillText('🚁 폭격기 재충전 중...', 10, 210);
    }
    
    // 보스 정보
    if (bosses.length > 0) {
        ctx.fillStyle = 'red';
        ctx.font = '14px Arial';
        ctx.fillText('⚠️ 보스 출현! 주의하세요!', 10, 225);
    }
    
    // 열쇠 보유 정보
    if (gameState.hasKey) {
        ctx.fillStyle = 'gold';
        ctx.font = '14px Arial';
        ctx.fillText('🔑 열쇠 획득! 철창 근처에서 자동으로 고양이를 구출합니다!', 10, 245);
    }
}

// 게임오버 화면
function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'red';
    ctx.font = '48px Arial';
    ctx.fillText('게임 오버!', 250, 180);
    
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`최종 점수: ${gameState.score}`, 300, 220);
}

// 게임 클리어 화면
function drawGameClear() {
    if (gameState.petRescued) {
        // 축하 배경은 이미 그려졌으므로 오버레이만 추가
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'gold';
        ctx.font = '48px Arial';
        ctx.fillText('게임 클리어!', 250, 180);
        
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText(`최종 점수: ${gameState.score}`, 300, 220);
        ctx.fillText('고양이를 구출했습니다!', 280, 250);
        ctx.fillText('🎉 축하합니다! 🎉', 300, 280);
    }
} 

// 축하 배경 그리기 (구출 완료 시)
function drawCelebrationBackground() {
    // 하늘 (밝은 색)
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, 200);
    
    // 구름들 (행복한 구름)
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(80 + i * 120, 60 + Math.sin(Date.now() * 0.002 + i) * 15, 25, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 지면 (꽃밭)
    ctx.fillStyle = '#98FB98';
    ctx.fillRect(0, 200, canvas.width, 200);
    
    // 꽃들
    for (let i = 0; i < 10; i++) {
        const x = 50 + i * 80;
        const y = 250 + Math.sin(Date.now() * 0.001 + i) * 5;
        
        // 꽃잎
        ctx.fillStyle = '#FF69B4';
        for (let j = 0; j < 5; j++) {
            ctx.beginPath();
            ctx.arc(x + Math.cos(j * Math.PI * 2 / 5) * 8, 
                   y + Math.sin(j * Math.PI * 2 / 5) * 8, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 꽃술
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 하트들 (축하 효과)
    for (let i = 0; i < 5; i++) {
        const x = 100 + i * 150;
        const y = 100 + Math.sin(Date.now() * 0.003 + i) * 20;
        
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.bezierCurveTo(x - 10, y, x - 10, y - 10, x, y - 10);
        ctx.bezierCurveTo(x + 10, y - 10, x + 10, y, x, y + 10);
        ctx.fill();
    }
}

// 전쟁 배경 그리기
function drawWarBackground() {
    // 하늘 (어두운 색)
    ctx.fillStyle = '#2F4F4F';
    ctx.fillRect(0, 0, canvas.width, 200);
    
    // 구름들
    ctx.fillStyle = '#696969';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(100 + i * 150, 50 + Math.sin(Date.now() * 0.001 + i) * 10, 20, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 지면 (전쟁터)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 200, canvas.width, 200);
    
    // 폭탄 구덩이들
    ctx.fillStyle = '#654321';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(200 + i * 200, 250, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 철조망
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 180 + i * 5);
        ctx.lineTo(canvas.width, 180 + i * 5);
        ctx.stroke();
    }
    
    // 전쟁 잔해들
    ctx.fillStyle = '#444';
    ctx.fillRect(50, 280, 30, 20);
    ctx.fillRect(300, 290, 40, 10);
    ctx.fillRect(600, 285, 25, 15);
} 

// 최종 축하 화면 (두 고양이가 함께 만세)
function drawFinalCelebration() {
    // 화면 중앙 위치 계산
    const screenCenterX = canvas.width / 2;
    
    // 플레이어 고양이 (왼쪽)
    const playerCenterX = screenCenterX - 60;
    const playerY = 300;
    
    // 구출된 고양이 (오른쪽)
    const rescuedCatX = screenCenterX + 30;
    const rescuedCatY = 300;
    
    // 플레이어 고양이 그리기
    drawPlayerInCenter(playerCenterX, playerY);
    
    // 구출된 고양이 그리기
    drawRescuedCatInCenter(rescuedCatX, rescuedCatY);
    
    // 함께 만세하는 메시지
    ctx.fillStyle = 'gold';
    ctx.font = '24px Arial';
    ctx.fillText('🎉 함께 만세! 🎉', screenCenterX - 80, 250);
    
    // 축하 메시지
    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(`최종 점수: ${gameState.score}`, screenCenterX - 60, 200);
    ctx.fillText('고양이를 구출했습니다!', screenCenterX - 80, 180);
    ctx.fillText('🎉 축하합니다! 🎉', screenCenterX - 60, 160);
}

// 중앙에 위치한 플레이어 고양이 그리기
function drawPlayerInCenter(x, y) {
    // 플레이어 몸체 (중앙에 위치)
    const healthPercentage = gameState.playerHP / gameState.maxHP;
    let bodyColor = player.color;
    
    if (healthPercentage < 0.3) {
        bodyColor = '#FF0000'; // 빨간색 (위험)
    } else if (healthPercentage < 0.6) {
        bodyColor = '#FFA500'; // 주황색 (주의)
    }
    
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x, y, player.width, player.height);
    
    // 플레이어 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x + 20, y + 15, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // 플레이어 귀
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(x + 5, y - 5, 8, 15);
    ctx.fillRect(x + 27, y - 5, 8, 15);
    
    // 플레이어 눈
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x + 15, y + 10, 3, 0, Math.PI * 2);
    ctx.arc(x + 25, y + 10, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 플레이어 가관총
    ctx.fillStyle = '#333';
    ctx.fillRect(x + 35, y + 15, 25, 6);
    ctx.fillStyle = '#666';
    ctx.fillRect(x + 35, y + 13, 3, 10);
    ctx.fillRect(x + 35, y + 17, 3, 10);
    
    // 플레이어 만세하는 팔
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(x + 15, y - 15, 4, 15); // 왼팔
    ctx.fillRect(x + 21, y - 15, 4, 15); // 오른팔
    
    // 플레이어 축하 메시지
    ctx.fillStyle = 'gold';
    ctx.font = '12px Arial';
    ctx.fillText('🎉 성공!', x - 10, y - 35);
}

// 중앙에 위치한 구출된 고양이 그리기
function drawRescuedCatInCenter(x, y) {
    // 구출된 고양이 몸체
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(x, y, 30, 30);
    
    // 구출된 고양이 얼굴
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x + 15, y + 10, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // 구출된 고양이 눈 (행복한 표정)
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x + 12, y + 8, 2, 0, Math.PI * 2);
    ctx.arc(x + 18, y + 8, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // 구출된 고양이 입 (웃는 표정)
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(x + 15, y + 15, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // 구출된 고양이 귀
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(x + 5, y - 5, 8, 15);
    ctx.fillRect(x + 17, y - 5, 8, 15);
    
    // 만세하는 팔
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(x + 25, y - 15, 4, 15); // 오른팔
    ctx.fillRect(x + 1, y - 15, 4, 15);  // 왼팔
    
    // 만세 메시지
    ctx.fillStyle = 'gold';
    ctx.font = '12px Arial';
    ctx.fillText('🎉 만세!', x - 5, y - 35);
} 