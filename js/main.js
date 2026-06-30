// 导航栏滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 54, 93, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(26, 54, 93, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.overview-card, .advantage-item, .reserve-card, .info-card, .system-image-card, .three-d-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // 数字计数动画
    function animateNumbers() {
        const numbers = document.querySelectorAll('.reserve-value');
        numbers.forEach(num => {
            const text = num.textContent;
            const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
            const suffix = text.replace(/[0-9.]/g, '');
            
            if (!isNaN(numericValue)) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    num.innerHTML = current.toFixed(2) + '<span>' + suffix + '</span>';
                }, 30);
            }
        });
    }

    // 当资源储量区域进入视口时触发数字动画
    const reservesSection = document.querySelector('.reserves-preview');
    if (reservesSection) {
        const reservesObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    reservesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        reservesObserver.observe(reservesSection);
    }

    // 首页轮播图功能
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        let currentSlide = 0;
        const slideInterval = 4000; // 4秒切换一次

        function goToSlide(index) {
            // 移除所有active类
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            
            // 添加active类到当前幻灯片
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        }

        // 自动轮播
        let autoSlide = setInterval(nextSlide, slideInterval);

        // 点击指示点切换
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(autoSlide);
                goToSlide(index);
                autoSlide = setInterval(nextSlide, slideInterval);
            });
        });

        // 鼠标悬停暂停轮播
        heroSlider.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });

        heroSlider.addEventListener('mouseleave', function() {
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
        
        // 初始化显示第一张
        goToSlide(0);
    }

    // 三维图轮播功能
    const threeDSlider = document.querySelector('.three-d-slider');
    if (threeDSlider) {
        const threeDSlides = threeDSlider.querySelectorAll('.three-d-slide');
        let currentThreeDSlide = 0;
        const threeDSlideInterval = 3000; // 3秒切换一次

        function goToThreeDSlide(index) {
            threeDSlides.forEach((slide) => {
                slide.style.opacity = '0';
                slide.classList.remove('active');
            });
            
            if (threeDSlides[index]) {
                threeDSlides[index].style.opacity = '1';
                threeDSlides[index].classList.add('active');
            }
            currentThreeDSlide = index;
        }

        function nextThreeDSlide() {
            const next = (currentThreeDSlide + 1) % threeDSlides.length;
            goToThreeDSlide(next);
        }

        // 自动轮播
        let autoThreeDSlide = setInterval(nextThreeDSlide, threeDSlideInterval);

        // 鼠标悬停暂停轮播
        threeDSlider.addEventListener('mouseenter', function() {
            clearInterval(autoThreeDSlide);
        });

        threeDSlider.addEventListener('mouseleave', function() {
            clearInterval(autoThreeDSlide);
            autoThreeDSlide = setInterval(nextThreeDSlide, threeDSlideInterval);
        });
        
        // 初始化显示第一张
        goToThreeDSlide(0);
    }
});
