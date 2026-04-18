/* ============================================
   Blue Lui Personal Website - Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    const htmlEl = document.documentElement;
    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        htmlEl.lang = lang === 'zh' ? 'zh-Hant' : 'en';
        
        // Update all elements with data-en and data-zh attributes
        document.querySelectorAll('[data-en][data-zh]').forEach(el => {
            el.textContent = el.getAttribute('data-' + lang);
        });

        // Update form labels
        document.querySelectorAll('label[data-en][data-zh]').forEach(el => {
            el.textContent = el.getAttribute('data-' + lang);
        });

        // Update button text
        document.querySelectorAll('button[data-en][data-zh]').forEach(el => {
            el.textContent = el.getAttribute('data-' + lang);
        });

        // Update lang toggle visual
        const enSpan = langToggle.querySelector('.lang-en');
        const zhSpan = langToggle.querySelector('.lang-zh');
        if (lang === 'en') {
            enSpan.style.fontWeight = '700';
            enSpan.style.color = 'var(--primary)';
            zhSpan.style.fontWeight = '400';
            zhSpan.style.color = 'var(--text-secondary)';
        } else {
            enSpan.style.fontWeight = '400';
            enSpan.style.color = 'var(--text-secondary)';
            zhSpan.style.fontWeight = '700';
            zhSpan.style.color = 'var(--primary)';
        }

        localStorage.setItem('bluelui-lang', lang);
    }

    // Initialize language from localStorage or default to EN
    const savedLang = localStorage.getItem('bluelui-lang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage('en');
    }

    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'en' ? 'zh' : 'en');
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-header, .about-content, .research-focus, .skill-category, .publication-card, .timeline-item, .beyond-card, .contact-content');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Smooth scroll for anchor links
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

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const subject = encodeURIComponent('Message from ' + name + ' - Blue Lui Website');
        const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
        window.location.href = 'mailto:blueluiyl@link.cuhk.edu.hk?subject=' + subject + '&body=' + body;

        // Reset form
        contactForm.reset();

        // Show confirmation
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = currentLang === 'en' ? 'Message Sent!' : '訊息已發送！';
        btn.style.background = '#27ae60';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});
