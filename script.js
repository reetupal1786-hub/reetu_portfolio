/**
 * Reetu Pal - Data Analyst Portfolio JavaScript
 * Modern Interactive Functionality:
 * 1. Preloader Handler
 * 2. Header & Sticky Nav & Mobile Drawer
 * 3. Dynamic Typing Animation
 * 4. Active Section Navigation Highlighter
 * 5. Animated Number Counters
 * 6. Skill Category Filtering
 * 7. Project Live Demo Modal Popup
 * 8. Resume Modal & File Generation Download
 * 9. Contact Form Validation & Feedback
 * 10. Scroll Reveal Animations & Scroll-to-Top Button
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==================== 1. PRELOADER HIDE ==================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hide');
        });
        // Fallback hide after 1.5s in case load event fired early
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 1500);
    }

    /* ==================== 2. MOBILE NAVIGATION DRAWER ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ==================== 3. HEADER SCROLL BACKGROUND ==================== */
    const header = document.getElementById('header');
    const scrollUpBtn = document.getElementById('scroll-up');

    window.addEventListener('scroll', () => {
        // Sticky Header Shadow
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }

        // Scroll to Top Button Visibility
        if (window.scrollY >= 400) {
            scrollUpBtn.classList.add('show-scroll');
        } else {
            scrollUpBtn.classList.remove('show-scroll');
        }
    });

    /* ==================== 4. TYPING ANIMATION ==================== */
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = [
            "Data Analyst",
            "Power BI Specialist",
            "Python & SQL Developer",
            "Business Intelligence Enthusiast"
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    /* ==================== 5. ACTIVE MENU HIGHLIGHT ON SCROLL ==================== */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (sectionsClass) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionsClass.classList.add('active-link');
                } else {
                    sectionsClass.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /* ==================== 6. ANIMATED NUMBER COUNTERS ==================== */
    const statNumbers = document.querySelectorAll('.stat__number');
    let animatedStats = false;

    function animateCounters() {
        const statsSection = document.querySelector('.about__stats');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animatedStats) {
            animatedStats = true;

            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    // Format depending on original string
                    if (counter.textContent.includes('%')) {
                        counter.textContent = Math.floor(current) + '%';
                    } else if (counter.textContent.includes('+')) {
                        counter.textContent = Math.floor(current) + '+';
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, stepTime);
            });
        }
    }
    window.addEventListener('scroll', animateCounters);

    /* ==================== 7. SKILL CATEGORY FILTERING ==================== */
    const filterBtns = document.querySelectorAll('.skills__btn');
    const skillCards = document.querySelectorAll('.skill__card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active-skill'));
            btn.classList.add('active-skill');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==================== 8. PROJECT DEMO MODAL ==================== */
    const projectModal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const projectDemoBtns = document.querySelectorAll('.project-demo-btn');

    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');
    const modalInsights = document.getElementById('modal-insights');

    projectDemoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const img = btn.getAttribute('data-img');
            const desc = btn.getAttribute('data-desc');
            const tech = btn.getAttribute('data-tech');
            const insights = btn.getAttribute('data-insights');

            modalTitle.textContent = title;
            modalImg.src = img;
            modalDesc.textContent = desc;
            modalTech.textContent = tech;
            modalInsights.textContent = insights;

            projectModal.classList.add('active-modal');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeProjectModal() {
        projectModal.classList.remove('active-modal');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

    /* ==================== 9. RESUME DOWNLOAD MODAL ==================== */
    const resumeModal = document.getElementById('resume-modal');
    const resumeBtn = document.getElementById('download-resume-btn');
    const resumeClose = document.getElementById('resume-close');
    const resumeOverlay = document.getElementById('resume-overlay');
    const triggerDownload = document.getElementById('trigger-download-file');

    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active-modal');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeResumeModal() {
        resumeModal.classList.remove('active-modal');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    if (resumeClose) resumeClose.addEventListener('click', closeResumeModal);
    if (resumeOverlay) resumeOverlay.addEventListener('click', closeResumeModal);

    // Generate downloadable Resume file
    if (triggerDownload) {
        triggerDownload.addEventListener('click', () => {
            const resumeText = `=====================================================
REETU PAL - DATA ANALYST RESUME
=====================================================
Email: reetupal.analytics@gmail.com
Location: India
Degree: B.Tech (Bachelor of Technology)

TECHNICAL SKILLS:
-----------------------------------------------------
- Languages & Tools: Python, SQL, Power BI, Advanced Excel
- Python Libraries: Pandas, NumPy, Matplotlib, Seaborn
- BI & Analytics: DAX Measures, Power Query ETL, Star Schema Data Modeling
- Core Competencies: Data Cleaning, Data Visualization, EDA, Descriptive Statistics

FEATURED PROJECTS:
-----------------------------------------------------
1. Bank Loan Dashboard (Power BI)
   - Evaluated $31M+ loan applications, portfolio default risks, interest rates.
2. Sales Dashboard (Power BI)
   - Built interactive revenue, MoM, YoY, product category & regional profit analysis.
3. Coffee Sales Data Analysis (Python)
   - Performed EDA on customer roast preferences & repeat buying patterns.
4. HR Analytics Dashboard (Power BI / Excel)
   - Tracked 16.1% attrition rate, tenure, and department satisfaction levels.
5. Blinkit Quick Commerce Sales Dashboard (Power BI)
   - Analyzed $1.2M grocery sales across tier 1/2/3 cities and outlet sizes.

CERTIFICATIONS:
-----------------------------------------------------
- Data Analytics Certificate
- Power BI Certificate
- Python Certificate
=====================================================`;

            const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Reetu_Pal_Data_Analyst_Resume.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            closeResumeModal();
        });
    }

    // Close Modals on ESC Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeResumeModal();
        }
    });

    /* ==================== 10. CONTACT FORM HANDLING ==================== */
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;

            // Form feedback UI
            formResponse.className = 'form__response success';
            formResponse.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been sent successfully. I will reach out to you at ${email} soon.`;

            contactForm.reset();

            setTimeout(() => {
                formResponse.innerHTML = '';
                formResponse.className = 'form__response';
            }, 6000);
        });
    }

    /* ==================== 11. SCROLL REVEAL OBSERVER ==================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply scroll reveal styling to sections and cards
    const revealElements = document.querySelectorAll('.section__title, .about__content, .stat__card, .skill__card, .project__card, .timeline__item, .cert__card, .contact__card, .contact__form-container');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Add revealed CSS rule dynamically
    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
