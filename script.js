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
        const itemHeight = 300; // history-item의 높이
        const scrollPos = timelineContent.scrollTop;
        const index = Math.round(scrollPos / itemHeight);
        
        // 스크롤에 맞춰 원 회전 (한 칸당 20도씩)
        const rotation = index * -20;
        orbitCircle.style.transform = `rotate(${rotation}deg)`;
        
        // 현재 인덱스 숫자 강조
        orbitNumbers.forEach((num, i) => {
            if (i === index) num.classList.add('active');
            else num.classList.remove('active');
        });
    });
}