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

// --- [NEW] 관람차 회전 로직 ---
const historyWheel = document.getElementById('history-wheel');
const timelineItems = document.querySelectorAll('.timeline-item');
let currentIndex = 0; 

const cultureSection = document.getElementById('culture');

if (cultureSection) {
    cultureSection.addEventListener('wheel', (e) => {
        e.preventDefault(); // 페이지 전체가 꿀렁이는 걸 막아줍니다.
        
        if (e.deltaY > 0) {
            if (currentIndex < timelineItems.length - 1) {
                currentIndex++;
                updateWheel();
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
                updateWheel();
            }
        }
    }, { passive: false });
}

// 클릭하면 해당 연도로 이동 (이 함수가 있어야 숫자를 눌렀을 때 돌아갑니다!)
function rotateTo(index) {
    currentIndex = index;
    updateWheel();
}

function updateWheel() {
    const rotateAngle = currentIndex * -15; // 15도씩 회전
    historyWheel.style.transform = `rotate(${rotateAngle}deg)`;

    timelineItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 시작하자마자 01번이 중앙에 오도록 초기화
updateWheel();

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