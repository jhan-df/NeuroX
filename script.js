const intro = document.getElementById('intro-screen');
const lobby = document.getElementById('lobby-screen');

function toggleScreen(enter) {
    if (enter) {
        intro.style.transform = 'translateY(-100%)';
    } else {
        intro.style.transform = 'translateY(0)';
    }
}

// 1번 화면에서 내릴 때만 작동 (올라가는 기능 제거)
window.addEventListener('wheel', (e) => {
    const isIntroVisible = !intro.style.transform || intro.style.transform === 'translateY(0px)' || intro.style.transform === 'translateY(0)';
    if (isIntroVisible && e.deltaY > 0) {
        toggleScreen(true);
    }
}, { passive: true });

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active-section'));
    document.getElementById(sectionId).classList.add('active-section');
}

// --- 타임라인 로직 ---
const timelineContent = document.querySelector('.timeline-content');
const orbitCircle = document.querySelector('.orbit-circle');
const orbitNumbers = document.querySelectorAll('.orbit-number');
const historyItems = document.querySelectorAll('.history-item');

if (timelineContent) {
    timelineContent.addEventListener('scroll', () => {
        const containerHeight = timelineContent.offsetHeight;
        // 1. 현재 인덱스 계산
        const index = Math.round(timelineContent.scrollTop / containerHeight);
        
        // 2. 전체 궤도(원) 회전 각도
        const rotationAngle = index * -40; 
        orbitCircle.style.transform = `translateY(-50%) rotate(${rotationAngle}deg)`;
        
        // 3. [추가된 핵심 로직] 숫자가 기울어지지 않게 상쇄 회전 적용
        orbitNumbers.forEach((num, i) => {
            const initialAngle = (i - 2) * 40; // 숫자의 기본 배치 각도
            // 궤도가 돌아간 만큼 반대 방향으로 똑같이 돌려줍니다.
            num.style.transform = `rotate(${initialAngle}deg) rotate(${-rotationAngle - initialAngle}deg)`;
        });
        
        updateTimelineUI(index);
    });
}

function updateTimelineUI(index) {
    orbitNumbers.forEach((num, i) => {
        if (i === index) {
            num.style.color = "#ffffff";
            num.style.opacity = "1";
            num.style.fontSize = "6rem"; // 선택된 숫자 대폭 강조
        } else {
            num.style.color = "rgba(255, 255, 255, 0.05)";
            num.style.opacity = "0.2";
            num.style.fontSize = "3.5rem";
        }
    });

    historyItems.forEach((item, i) => {
        if (i === index) item.classList.add('active-text');
        else item.classList.remove('active-text');
    });
}