// 키보드 입력 처리
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    console.log("Key pressed:", e.key);
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
}); 