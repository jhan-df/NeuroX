const intro = document.getElementById('intro-screen');
const lobby = document.getElementById('lobby-screen');

function toggleScreen(enter) {
    if (enter) {
        intro.style.transform = 'translateY(-100%)';
    } else {
        intro.style.transform = 'translateY(0)';
    }
}

// [수정] 인트로에서 내릴 때만 작동 (올라가는 기능 삭제)
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

const timelineContent = document.querySelector('.timeline-content');
const orbitCircle = document.querySelector('.orbit-circle');
const orbitNumbers = document.querySelectorAll('.orbit-number');
const historyItems = document.querySelectorAll('.history-item');

if (timelineContent) {
    timelineContent.addEventListener('scroll', () => {
        // [수정] 현재 컨테이너 높이를 기준으로 정확한 인덱스 계산
        const itemHeight = timelineContent.offsetHeight;
        const index = Math.round(timelineContent.scrollTop / itemHeight);
        
        const rotation = index * -40; 
        orbitCircle.style.transform = `rotate(${rotation}deg)`;
        
        updateTimelineUI(index);
    });

    orbitNumbers.forEach((num, i) => {
        num.addEventListener('click', () => {
            timelineContent.scrollTo({
                top: i * timelineContent.offsetHeight,
                behavior: 'smooth'
            });
        });
    });
}

function updateTimelineUI(index) {
    orbitNumbers.forEach((num, i) => {
        if (i === index) {
            num.style.color = "#ffffff";
            num.style.opacity = "1";
            num.style.fontSize = "5rem";
        } else {
            num.style.color = "rgba(255, 255, 255, 0.05)";
            num.style.opacity = "0.3"; // 미선택 숫자 가독성 조절
            num.style.fontSize = "3.5rem";
        }
    });

    historyItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active-text');
        } else {
            item.classList.remove('active-text');
        }
    });
}