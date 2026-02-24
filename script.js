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

// 1번 화면(인트로)에서 휠을 내릴 때 감지
window.addEventListener('wheel', (e) => {
    // 인트로가 화면에 있는 상태인지 확인 (transform 값이 0이거나 없을 때)
    const isIntroVisible = intro.style.transform === 'translateY(0px)' || 
                           intro.style.transform === 'translateY(0)' || 
                           intro.style.transform === '';

    if (isIntroVisible && e.deltaY > 0) {
        toggleScreen(true);
    }
}, { passive: true });

// 2번 화면(로비) 최상단에서 휠을 올릴 때 감지
lobby.addEventListener('wheel', (e) => {
    if (lobby.scrollTop === 0 && e.deltaY < 0) {
        toggleScreen(false);
    }
}, { passive: true });

// 메뉴 섹션 전환 함수
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
}

const timelineContent = document.querySelector('.timeline-content');
const orbitCircle = document.querySelector('.orbit-circle');
const orbitNumbers = document.querySelectorAll('.orbit-number');

if (timelineContent) {
    timelineContent.addEventListener('scroll', () => {
        // history-item 하나당 높이 계산 (스크롤 영역 / 아이템 개수)
        const itemHeight = timelineContent.scrollHeight / orbitNumbers.length;
        const scrollPos = timelineContent.scrollTop;
        
        // 현재 어떤 아이템이 중앙에 있는지 계산
        const index = Math.round(scrollPos / (timelineContent.clientHeight));
        
        // 원 회전: 한 칸당 20도씩 역방향으로 회전하여 숫자를 중앙으로 가져옴
        // (기존 각도가 -40, -20, 0, 20, 40 이므로 index에 따라 반대로 돌려야 함)
        const rotation = (index - 2) * -20; 
        orbitCircle.style.transform = `rotate(${rotation}deg)`;
        
        // 강조 효과
        orbitNumbers.forEach((num, i) => {
            if (i === index) {
                num.style.color = "#ffffff";
                num.style.opacity = "1";
                num.style.fontSize = "5rem";
            } else {
                num.style.color = "rgba(255, 255, 255, 0.05)";
                num.style.fontSize = "4rem";
            }
        });
    });
}