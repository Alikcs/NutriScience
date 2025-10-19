
// Бургер-меню
const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-list');

burger.addEventListener('click', () => {
    navList.classList.toggle('active');
    burger.classList.toggle('active');
});
// Карусель на главной
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Автопереключение слайдов
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Клик по точкам
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        showSlide(parseInt(this.getAttribute('data-slide')));
    });
});
// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Закрываем меню на мобильных после клика
            navList.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});


// Кнопка CTA
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

// Изменение шапки при скролле
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(250,250,250,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--light)';
        header.style.backdropFilter = 'none';
    }
});
// Анимация появления секций при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});