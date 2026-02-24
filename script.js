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
const historyItems = document.querySelectorAll('.history-item');

if (timelineContent) {
    // 1. 스크롤 시 회전 및 텍스트 강조 로직
    timelineContent.addEventListener('scroll', () => {
        const itemHeight = timelineContent.clientHeight;
        const scrollPos = timelineContent.scrollTop;
        const index = Math.round(scrollPos / itemHeight);
        
        // 각도가 40도씩 벌어졌으므로 회전 로직도 변경
        const rotation = index * -40; 
        orbitCircle.style.transform = `rotate(${rotation}deg)`;
        
        // 숫자 및 텍스트 상태 업데이트
        updateTimelineUI(index);
    });

    // 2. 숫자 클릭 시 해당 위치로 스크롤 이동
    orbitNumbers.forEach((num, i) => {
        num.addEventListener('click', () => {
            const targetPos = i * timelineContent.clientHeight;
            timelineContent.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
}

function updateTimelineUI(index) {
    // 숫자 강조
    orbitNumbers.forEach((num, i) => {
        if (i === index) {
            num.style.color = "#ffffff";
            num.style.opacity = "1";
            num.style.fontSize = "5rem";
        } else {
            num.style.color = "rgba(255, 255, 255, 0.05)";
            num.style.fontSize = "3.5rem";
        }
    });

    // 텍스트 강조
    historyItems.forEach((item, i) => {
        if (i === index) item.classList.add('active-text');
        else item.classList.remove('active-text');
    });
}