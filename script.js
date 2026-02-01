/* ============================================
   JEFFERSON CAPELARI - TECH REPAIR WEBSITE
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // #region agent log
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        const cs = window.getComputedStyle(skipLink);
        const rect = skipLink.getBoundingClientRect();
        const isFocused = document.activeElement === skipLink;
        fetch('http://127.0.0.1:7242/ingest/ed64f3a2-dbc9-4046-b070-6255ec1f40ab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:DOMContentLoaded',message:'skip-link state',data:{position:cs.position,top:cs.top,rectTop:rect.top,rectVisible:rect.top<window.innerHeight,isFocused},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
        if (isFocused) fetch('http://127.0.0.1:7242/ingest/ed64f3a2-dbc9-4046-b070-6255ec1f40ab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'script.js:DOMContentLoaded',message:'skip-link has focus',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
    }
    // #endregion

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
    
    // Menú hamburguesa: abrir/cerrar
    navToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Abrir menú');
            document.body.style.overflow = '';
            
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
        const whatsappUrl = `https://wa.me/5492901478638?text=${encodedMessage}`;
        
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
