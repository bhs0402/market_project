
//배너
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

new Swiper('.swiper', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    speed: 500,


    navigation: {
        prevEl: '.prev',
        nextEl: '.next',
    },
});

new Swiper('.swiper2', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    speed: 500,


    navigation: {
        prevEl: '.prev2',
        nextEl: '.next2',
    },
});

new Swiper('.swiper3', {
    slidesPerView: 4,
    slidesPerGroup: 4,
    speed: 500,


    navigation: {
        prevEl: '.prev3',
        nextEl: '.next3',
    },
});