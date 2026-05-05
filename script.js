/* script.js - Portfolio Template Scripts */

(function() {
    'use strict';

    // ============================================
    // 1. Mobile Navigation Toggle
    // ============================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.header__nav-link');

    function toggleNav() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
    }

    function closeNav() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleNav);

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeNav();
                navToggle.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeNav();
            }
        });
    }

    // ============================================
    // 2. Active Navigation Link on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 150; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.header__nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Use IntersectionObserver for better performance
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-150px 0px -60% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    } else {
        // Fallback to scroll event
        window.addEventListener('scroll', setActiveNavLink);
    }

    // ============================================
    // 3. Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // ============================================
    // 4. Contact Form Handling (Visual Only)
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Visual feedback only (no backend)
            alert(`Спасибо, ${name}! Ваше сообщение отправлено.\n\nЭто демонстрационная форма. Для реальной отправки подключите бэкенд или сервис вроде Formspree.`);
            
            // Reset form
            this.reset();
        });
    }

    // ============================================
    // 5. Dynamic Year in Footer
    // ============================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // 6. Header Shadow on Scroll
    // ============================================
    const header = document.getElementById('header');

    function updateHeaderShadow() {
        if (header) {
            if (window.scrollY > 10) {
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    }

    if (header) {
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });
    }

})();
