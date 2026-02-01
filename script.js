/* ============================================
   JEFFERSON CAPELARI - TECH REPAIR WEBSITE
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });
    
    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ============================================
    // TYPED TEXT EFFECT
    // ============================================
    const typedText = document.getElementById('typed-text');
    const words = ['Celulares', 'iPhones', 'Android', 'Computadoras', 'Tablets'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
    
    // ============================================
    // PARTICLES ANIMATION
    // ============================================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    let counterAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Intersection Observer for counter animation
    const heroStats = document.querySelector('.hero-stats');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    if (heroStats) {
        counterObserver.observe(heroStats);
    }
    
    // ============================================
    // AOS INITIALIZATION
    // ============================================
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
    
    // ============================================
    // GALLERY FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // ============================================
    // GALLERY LIGHTBOX
    // ============================================
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
    
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    }
    
    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    let currentSlide = 0;
    let slidesPerView = 3;
    let totalSlides = testimonialCards.length;
    
    // Update slides per view based on screen size
    function updateSlidesPerView() {
        if (window.innerWidth <= 768) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 1024) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
    }
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const dotsCount = Math.ceil(totalSlides / slidesPerView);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Go to slide
    function goToSlide(index) {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        currentSlide = Math.max(0, Math.min(index, maxSlide));
        
        const cardWidth = testimonialCards[0].offsetWidth + 30; // Include gap
        const offset = currentSlide * slidesPerView * cardWidth;
        
        testimonialTrack.style.transform = `translateX(-${offset}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Initialize
    updateSlidesPerView();
    createDots();
    
    // Handle resize
    window.addEventListener('resize', function() {
        updateSlidesPerView();
        createDots();
        goToSlide(0);
    });
    
    // Auto-slide
    setInterval(() => {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        if (currentSlide < maxSlide) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
    
    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create WhatsApp message
        const message = `
*Nuevo mensaje de contacto*

*Nombre:* ${data.name}
*Email:* ${data.email}
*Teléfono:* ${data.phone || 'No proporcionado'}
*Servicio:* ${data.service}

*Mensaje:*
${data.message}
        `.trim();
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5491112345678?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        contactForm.classList.add('success');
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove('success');
        }, 3000);
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // SERVICE CARDS HOVER EFFECT
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // INPUT FOCUS EFFECTS
    // ============================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // ============================================
    // LAZY LOADING IMAGES (for when real images are added)
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (hero) {
                hero.style.backgroundPositionY = rate + 'px';
            }
        }
    });
    
    // ============================================
    // ANIMATION ON SCROLL FOR ELEMENTS
    // ============================================
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateOnScroll.forEach(el => scrollObserver.observe(el));
    
    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c¡Hola! 👋', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cEsta web fue creada para Jefferson Capelari', 'font-size: 14px; color: #374151;');
    console.log('%c¿Necesitas una página web? Contáctame 🚀', 'font-size: 14px; color: #22d3ee;');
    
});
