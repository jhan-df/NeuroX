const intro = document.getElementById('intro-screen');
const lobby = document.getElementById('lobby-screen');

// 화면 전환 함수
function toggleScreen(enter) {
    if (enter) {
        intro.style.transform = 'translateY(-100%)';
    } else {
        intro.style.transform = 'translateY(0)';
    }
}

// 1번 화면에서 휠 내릴 때
window.addEventListener('wheel', (e) => {
    if (intro.style.transform === 'translateY(0)' || intro.style.transform === '') {
        if (e.deltaY > 0) toggleScreen(true);
    }
});

// 2번 화면 최상단에서 휠 올릴 때
lobby.addEventListener('wheel', (e) => {
    if (lobby.scrollTop === 0 && e.deltaY < 0) {
        toggleScreen(false);
    }
});

// 메뉴 섹션 전환
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
}