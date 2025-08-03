// 총알 발사 함수 (가관총 - 항상 3발씩)
function fireBullet(count) {
    if (gameState.ammo >= 3 && !gameState.isReloading) {
        // 가관총은 항상 3발씩 발사
        for (let i = 0; i < 3; i++) {
            bullets.push({
                x: player.x + player.width,
                y: player.y + player.height / 2 + (i - 1) * 3,
                width: 8,
                height: 4,
                speed: 8,
                color: '#FFFF00'
            });
        }
        gameState.ammo -= 3;
        
        // 탕 소리 효과 재생
        playSound('shoot');
    }
}

// 장전 함수
function reloadAmmo() {
    if (!gameState.isReloading) {
        gameState.isReloading = true;
        console.log("🔫 장전 중...");
        
        // 0.5초 후 장전 완료
        setTimeout(() => {
            gameState.ammo = gameState.maxAmmo;
            gameState.isReloading = false;
            console.log("✅ 장전 완료!");
        }, 500);
    }
}

// 폭격기 호출 함수
function callBomber() {
    if (gameState.bomberAvailable) {
        gameState.bomberAvailable = false;
        console.log("🚁 폭격기 호출!");
        
        // 폭격기 생성
        bombers.push({
            x: -100,
            y: 50,
            width: 60,
            height: 30,
            speed: 3,
            bombs: [],
            color: '#4A4A4A'
        });
        
        // 0.5초 후 폭격기 재사용 가능
        setTimeout(() => {
            gameState.bomberAvailable = true;
            console.log("✅ 폭격기 재사용 가능!");
        }, 500);
    }
}

// 군인 고양이 자주포 발사 함수
function fireArtillery() {
    const currentTime = Date.now();
    
    if (soldierCat.isActive && currentTime - soldierCat.lastFireTime >= soldierCat.fireInterval) {
        // 자주포 총알 생성 (더 큰 총알)
        artilleryBullets.push({
            x: soldierCat.x + soldierCat.width,
            y: soldierCat.y + soldierCat.height / 2,
            width: 12,
            height: 6,
            speed: 10,
            color: '#FF4500',
            damage: 25
        });
        
        soldierCat.lastFireTime = currentTime;
        
        // 자주포 발사 소리 효과
        playSound('shoot');
        
        console.log("🚀 자주포 발사!");
    }
}

// 열쇠 사용 함수
function useKey() {
    // 철창 근처에서만 열쇠 사용 가능
    if (player.x > 700 && player.x < 800) {
        console.log("🔑 열쇠로 철창을 열고 고양이를 구출합니다!");
        gameState.rescueAnimation = true;
        gameState.rescueStartTime = Date.now();
        gameState.hasKey = false; // 열쇠 사용 완료
    } else {
        console.log("❌ 철창 근처로 가서 열쇠를 사용하세요!");
    }
}

// 자동 철장 열기 함수 (열쇠 획득 후 철장 근처에서 자동으로 열기)
function checkAutoOpenCage() {
    if (gameState.hasKey && !gameState.petRescued && !gameState.rescueAnimation) {
        if (player.x > 700 && player.x < 800) {
            console.log("🔑 자동으로 철창을 열고 고양이를 구출합니다!");
            gameState.rescueAnimation = true;
            gameState.rescueStartTime = Date.now();
            gameState.hasKey = false;
            
            // 구출 완료 시 사운드 효과와 배경 변경
            playSound('rescue');
            canvas.classList.add('rescued');
        }
    }
}

// 플레이어 업데이트
function updatePlayer() {
    // 좌우 이동
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= 5;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
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

// 총알 업데이트
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        
        // 화면 밖으로 나가면 제거
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });
}

// 자주포 총알 업데이트
function updateArtilleryBullets() {
    artilleryBullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        
        // 화면 밖으로 나가면 제거
        if (bullet.x > canvas.width) {
            artilleryBullets.splice(index, 1);
        }
    });
}

// 폭격기 업데이트
function updateBombers() {
    bombers.forEach((bomber, bIndex) => {
        bomber.x += bomber.speed;
        
        // 폭격기가 화면 중앙에 도달하면 폭탄 투하
        if (bomber.x > canvas.width / 2 && bomber.bombs.length === 0) {
            // 여러 개의 폭탄 투하
            for (let i = 0; i < 5; i++) {
                bomber.bombs.push({
                    x: bomber.x + Math.random() * 200 - 100,
                    y: bomber.y + bomber.height,
                    width: 8,
                    height: 8,
                    speed: 2,
                    color: '#FF4500'
                });
            }
        }
        
        // 폭탄 업데이트
        bomber.bombs.forEach((bomb, bombIndex) => {
            bomb.y += bomb.speed;
            
            // 폭탄이 바닥에 닿으면 폭발
            if (bomb.y > 300) {
                bomber.bombs.splice(bombIndex, 1);
                
                // 폭발 범위 내의 적들 제거
                enemies.forEach((enemy, eIndex) => {
                    const distance = Math.abs(enemy.x - bomb.x);
                    if (distance < 100) {
                        enemies.splice(eIndex, 1);
                        gameState.score += 30;
                        console.log(`💥 폭격으로 적 처치! 점수: ${gameState.score}`);
                        playSound('explosion'); // 펑 소리 효과
                    }
                });
            }
        });
        
        // 폭격기가 화면 밖으로 나가면 제거
        if (bomber.x > canvas.width + 100) {
            bombers.splice(bIndex, 1);
        }
    });
}

// 적 생성
function createEnemy() {
    const enemyTypes = [
        { type: 'monster', width: 30, height: 40, color: '#FF0000', speed: -2, hp: 100, damage: 15 },
        { type: 'tank', width: 50, height: 30, color: '#8B4513', speed: -1, hp: 50, damage: 25 },
        { type: 'fast', width: 25, height: 35, color: '#FF4500', speed: -4, hp: 80, damage: 10 },
        { type: 'strong', width: 40, height: 45, color: '#8B0000', speed: -1.5, hp: 150, damage: 20 }
    ];
    
    const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    enemies.push({
        x: canvas.width,
        y: 300,
        width: enemyType.width,
        height: enemyType.height,
        color: enemyType.color,
        speed: enemyType.speed,
        hp: enemyType.hp,
        maxHp: enemyType.hp,
        type: enemyType.type,
        damage: enemyType.damage,
        lastAttackTime: 0,
        lastShootTime: 0
    });
}

// 보스 생성
function createBoss() {
    const bossTypes = [
        { type: 'giant', width: 80, height: 60, color: '#8B0000', speed: -1, hp: 200, damage: 30 },
        { type: 'robot', width: 70, height: 50, color: '#2F4F4F', speed: -1.5, hp: 150, damage: 25 },
        { type: 'dragon', width: 90, height: 70, color: '#4B0082', speed: -0.8, hp: 300, damage: 40 },
        { type: 'cyborg', width: 75, height: 55, color: '#006400', speed: -2, hp: 180, damage: 35 }
    ];
    
    const bossType = bossTypes[Math.floor(Math.random() * bossTypes.length)];
    
    bosses.push({
        x: canvas.width,
        y: 280,
        width: bossType.width,
        height: bossType.height,
        color: bossType.color,
        speed: bossType.speed,
        hp: bossType.hp,
        maxHp: bossType.hp,
        type: bossType.type,
        damage: bossType.damage,
        lastAttackTime: 0,
        lastShootTime: 0
    });
}

// 적 업데이트
function updateEnemies() {
    const currentTime = Date.now();
    
    enemies.forEach((enemy, index) => {
        enemy.x += enemy.speed;
        
        // 적 총알 발사 (0.5초마다 1발씩)
        if (currentTime - enemy.lastShootTime > 500) {
            enemyBullets.push({
                x: enemy.x,
                y: enemy.y + enemy.height / 2,
                width: 6,
                height: 3,
                speed: -6,
                color: '#FF0000'
            });
            enemy.lastShootTime = currentTime;
        }
        
        // 플레이어와 적 충돌 체크 (몬스터 공격)
        if (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y) {
            
            // 1초마다 한 번씩만 공격
            if (currentTime - enemy.lastAttackTime > 1000) {
                gameState.playerHP -= enemy.damage;
                enemy.lastAttackTime = currentTime;
                console.log(`💥 ${enemy.type}에게 공격받음! HP: ${gameState.playerHP}`);
            }
        }
        
        // 화면 밖으로 나가면 제거
        if (enemy.x + enemy.width < 0) {
            enemies.splice(index, 1);
            gameState.playerHP -= 5; // 적이 지나가면 작은 데미지
        }
    });
}

// 보스 업데이트
function updateBosses() {
    const currentTime = Date.now();
    
    bosses.forEach((boss, index) => {
        boss.x += boss.speed;
        
        // 보스 총알 발사 (0.5초마다 1발씩)
        if (currentTime - boss.lastShootTime > 500) {
            enemyBullets.push({
                x: boss.x,
                y: boss.y + boss.height / 2,
                width: 8,
                height: 4,
                speed: -8,
                color: '#FF4500'
            });
            boss.lastShootTime = currentTime;
        }
        
        // 플레이어와 보스 충돌 체크
        if (boss.x < player.x + player.width &&
            boss.x + boss.width > player.x &&
            boss.y < player.y + player.height &&
            boss.y + boss.height > player.y) {
            
            // 1초마다 한 번씩만 공격
            if (currentTime - boss.lastAttackTime > 1000) {
                gameState.playerHP -= boss.damage;
                boss.lastAttackTime = currentTime;
                console.log(`💥 ${boss.type} 보스에게 공격받음! HP: ${gameState.playerHP}`);
            }
        }
        
        // 화면 밖으로 나가면 제거
        if (boss.x + boss.width < 0) {
            bosses.splice(index, 1);
            gameState.playerHP -= 20; // 보스가 지나가면 큰 데미지
        }
    });
}

// 적 총알 업데이트
function updateEnemyBullets() {
    enemyBullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        
        // 화면 밖으로 나가면 제거
        if (bullet.x < 0) {
            enemyBullets.splice(index, 1);
        }
    });
}

// 충돌 체크
function checkCollisions() {
    // 플레이어 총알과 적 충돌
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                
                // 총알 제거
                bullets.splice(bIndex, 1);
                
                // 적 체력 감소
                enemy.hp -= 10;
                gameState.score += 5;
                
                // 적 제거
                if (enemy.hp <= 0) {
                    enemies.splice(eIndex, 1);
                    gameState.score += 20;
                    stageProgress.monstersKilled++;
                    
                    // HP 회복 (적 타입에 따라)
                    if (enemy.type === 'tank') {
                        // 갈색 탱크를 죽이면 HP 50 회복
                        gameState.playerHP = Math.min(gameState.playerHP + 50, gameState.maxHP);
                        console.log(`💚 탱크 처치! HP 50 회복! 현재 HP: ${gameState.playerHP}`);
                    } else if (enemy.type === 'monster') {
                        // 빨간색 몬스터를 죽이면 HP 100 회복
                        gameState.playerHP = Math.min(gameState.playerHP + 100, gameState.maxHP);
                        console.log(`💚 몬스터 처치! HP 100 회복! 현재 HP: ${gameState.playerHP}`);
                    } else if (enemy.type === 'fast') {
                        // 빠른 적을 죽이면 HP 80 회복
                        gameState.playerHP = Math.min(gameState.playerHP + 80, gameState.maxHP);
                        console.log(`💚 빠른 적 처치! HP 80 회복! 현재 HP: ${gameState.playerHP}`);
                    } else if (enemy.type === 'strong') {
                        // 강한 적을 죽이면 HP 120 회복
                        gameState.playerHP = Math.min(gameState.playerHP + 120, gameState.maxHP);
                        console.log(`💚 강한 적 처치! HP 120 회복! 현재 HP: ${gameState.playerHP}`);
                    }
                    
                    // 스테이지 완료 체크
                    checkStageComplete();
                }
            }
        });
        
        // 플레이어 총알과 보스 충돌
        bosses.forEach((boss, bIndex) => {
            if (bullet.x < boss.x + boss.width &&
                bullet.x + bullet.width > boss.x &&
                bullet.y < boss.y + boss.height &&
                bullet.y + bullet.height > boss.y) {
                
                // 총알 제거
                bullets.splice(bIndex, 1);
                
                // 보스 체력 감소
                boss.hp -= 15;
                gameState.score += 10;
                
                // 보스 제거
                if (boss.hp <= 0) {
                    bosses.splice(bIndex, 1);
                    gameState.score += 100;
                    stageProgress.bossesKilled++;
                    
                    // 보스 타입에 따른 HP 회복
                    if (boss.type === 'giant') {
                        gameState.playerHP = Math.min(gameState.playerHP + 150, gameState.maxHP);
                        console.log(`💚 거대 보스 처치! HP 150 회복! 점수: ${gameState.score}`);
                    } else if (boss.type === 'robot') {
                        gameState.playerHP = Math.min(gameState.playerHP + 130, gameState.maxHP);
                        console.log(`💚 로봇 보스 처치! HP 130 회복! 점수: ${gameState.score}`);
                    } else if (boss.type === 'dragon') {
                        gameState.playerHP = Math.min(gameState.playerHP + 200, gameState.maxHP);
                        console.log(`💚 드래곤 보스 처치! HP 200 회복! 점수: ${gameState.score}`);
                    } else if (boss.type === 'cyborg') {
                        gameState.playerHP = Math.min(gameState.playerHP + 180, gameState.maxHP);
                        console.log(`💚 사이보그 보스 처치! HP 180 회복! 점수: ${gameState.score}`);
                    }
                    
                    // 스테이지 완료 체크
                    checkStageComplete();
                }
            }
        });
    });
    
    // 자주포 총알과 적 충돌
    artilleryBullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                
                // 자주포 총알 제거
                artilleryBullets.splice(bIndex, 1);
                
                // 적 체력 감소 (자주포는 더 큰 데미지)
                enemy.hp -= bullet.damage || 25;
                gameState.score += 10;
                
                // 적 제거
                if (enemy.hp <= 0) {
                    enemies.splice(eIndex, 1);
                    gameState.score += 25;
                    stageProgress.monstersKilled++;
                    
                    // HP 회복 (적 타입에 따라)
                    if (enemy.type === 'tank') {
                        gameState.playerHP = Math.min(gameState.playerHP + 50, gameState.maxHP);
                        console.log(`💚 자주포로 탱크 처치! HP 50 회복! 현재 HP: ${gameState.playerHP}`);
                    } else if (enemy.type === 'monster') {
                        gameState.playerHP = Math.min(gameState.playerHP + 100, gameState.maxHP);
                        console.log(`💚 자주포로 몬스터 처치! HP 100 회복! 현재 HP: ${gameState.playerHP}`);
                    } else if (enemy.type === 'fast') {
                        gameState.playerHP = Math.min(gameState.playerHP + 80, gameState.maxHP);
                        console.log(`💚 자주포로 빠른 적 처치! HP 80 회복! 현재 HP: ${gameState.playerHP}`);
                    } else if (enemy.type === 'strong') {
                        gameState.playerHP = Math.min(gameState.playerHP + 120, gameState.maxHP);
                        console.log(`💚 자주포로 강한 적 처치! HP 120 회복! 현재 HP: ${gameState.playerHP}`);
                    }
                    
                    // 스테이지 완료 체크
                    checkStageComplete();
                }
            }
        });
        
        // 자주포 총알과 보스 충돌
        bosses.forEach((boss, bIndex) => {
            if (bullet.x < boss.x + boss.width &&
                bullet.x + bullet.width > boss.x &&
                bullet.y < boss.y + boss.height &&
                bullet.y + bullet.height > boss.y) {
                
                // 자주포 총알 제거
                artilleryBullets.splice(bIndex, 1);
                
                // 보스 체력 감소 (자주포는 더 큰 데미지)
                boss.hp -= bullet.damage || 25;
                gameState.score += 15;
                
                // 보스 제거
                if (boss.hp <= 0) {
                    bosses.splice(bIndex, 1);
                    gameState.score += 120;
                    stageProgress.bossesKilled++;
                    
                    // 보스 타입에 따른 HP 회복
                    if (boss.type === 'giant') {
                        gameState.playerHP = Math.min(gameState.playerHP + 150, gameState.maxHP);
                        console.log(`💚 자주포로 거대 보스 처치! HP 150 회복! 점수: ${gameState.score}`);
                    } else if (boss.type === 'robot') {
                        gameState.playerHP = Math.min(gameState.playerHP + 130, gameState.maxHP);
                        console.log(`💚 자주포로 로봇 보스 처치! HP 130 회복! 점수: ${gameState.score}`);
                    } else if (boss.type === 'dragon') {
                        gameState.playerHP = Math.min(gameState.playerHP + 200, gameState.maxHP);
                        console.log(`💚 자주포로 드래곤 보스 처치! HP 200 회복! 점수: ${gameState.score}`);
                    } else if (boss.type === 'cyborg') {
                        gameState.playerHP = Math.min(gameState.playerHP + 180, gameState.maxHP);
                        console.log(`💚 자주포로 사이보그 보스 처치! HP 180 회복! 점수: ${gameState.score}`);
                    }
                    
                    // 스테이지 완료 체크
                    checkStageComplete();
                }
            }
        });
    });
    
    // 적 총알과 플레이어 충돌
    enemyBullets.forEach((bullet, bIndex) => {
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            
            // 적 총알 제거
            enemyBullets.splice(bIndex, 1);
            
            // 플레이어 데미지
            gameState.playerHP -= 10;
            console.log(`💥 적 총알에 맞음! HP: ${gameState.playerHP}`);
        }
    });
}

// 스테이지 완료 체크
function checkStageComplete() {
    const currentStage = stageInfo[gameState.stage];
    if (stageProgress.monstersKilled >= currentStage.monsters && 
        stageProgress.bossesKilled >= currentStage.bosses) {
        
        if (gameState.stage < 3) {
            // 다음 스테이지로 진행
            gameState.stage++;
            stageProgress.monstersKilled = 0;
            stageProgress.bossesKilled = 0;
            console.log(`🎉 스테이지 ${gameState.stage - 1} 완료! 스테이지 ${gameState.stage} 시작!`);
        } else {
            // 게임 클리어
            gameState.hasKey = true;
            console.log("🎉 모든 스테이지 완료! 열쇠를 획득했습니다!");
        }
    }
} 