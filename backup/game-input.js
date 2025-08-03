// 키보드 이벤트 리스너
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // 첫 번째 키 입력 시 사운드 시스템 초기화
    if (!audioContext) {
        initSounds();
    }
    
    // 가관총 발사 (1번키나 2번키 모두 3발씩)
    if ((e.key === '1' || e.key === '2') && gameState.ammo >= 3 && !gameState.isReloading) {
        fireBullet(3);
    }
    
    // 장전 (R키만)
    if ((e.key === 'r' || e.key === 'R') && !gameState.isReloading) {
        reloadAmmo();
    }
    
    // 폭격기 호출 (A키)
    if ((e.key === 'a' || e.key === 'A') && gameState.bomberAvailable) {
        callBomber();
    }
    
    // 열쇠 사용 (K키)
    if ((e.key === 'k' || e.key === 'K') && gameState.hasKey && !gameState.petRescued) {
        useKey();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
}); 