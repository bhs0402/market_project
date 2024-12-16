//TODO 배너 슬라이드 형식으로 바꾸기

//https://www.kurly.com/shop/event/kurlyEvent.php?htmid=event/2024/1118/holiday_market&eventTab=tab1
//슬라이드 배너
let currentSlide = 0;
const slides = document.querySelectorAll('#main > .banner-container > .slide-wrapper > .slide');
const slideCount = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.style.display = 'none');
    slides[n].style.display = 'block';
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // 3초마다 자동 슬라이드
});