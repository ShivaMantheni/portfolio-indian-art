/* ═══════════════════════════════════════════════════════
   INDIAN ART PORTFOLIO — JavaScript
   Features: Wave Loader, Visitor Tracking, Terminal,
   Config Viewer, Experience Counter, Dark/Light Toggle
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ────── WAVE LOADER ──────
    initWaveLoader();

    // ────── THEME TOGGLE ──────
    initThemeToggle();

    // ────── NAVIGATION ──────
    initNavigation();

    // ────── EXPERIENCE COUNTER ──────
    initExperienceCounter();

    // ────── TYPING EFFECT ──────
    initTypingEffect();

    // ────── SCROLL ANIMATIONS ──────
    initScrollAnimations();

    // ────── CONFIG VIEWER ──────
    initConfigViewer();

    // ────── LIVE TERMINAL ──────
    initTerminal();

    // ────── CONTACT FORM ──────
    initContactForm();

    // ────── PARTICLES ──────
    initParticles();

    // ────── VISITOR TRACKING ──────
    initVisitorTracking();

    // ────── MISC ──────
    initMisc();
});

/* ═══════════════════════════════════════════════════════
   WAVE LOADER (Google-style)
   ═══════════════════════════════════════════════════════ */
function initWaveLoader() {
    const overlay = document.getElementById('loader-overlay');
    const percentEl = document.getElementById('loader-percent');
    if (!overlay) return;

    document.body.style.overflow = 'hidden';
    let progress = 0;

    const loadTimer = setInterval(() => {
        progress += Math.random() * 4 + 1;
        if (progress >= 100) progress = 100;
        if (percentEl) percentEl.textContent = Math.floor(progress) + '%';

        if (progress >= 100) {
            clearInterval(loadTimer);
            setTimeout(() => {
                overlay.classList.add('fade-out');
                document.body.style.overflow = 'auto';
                // Trigger hero animations
                document.querySelectorAll('.animate-in').forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 150);
                });
                // Show visitor modal after loader fades (for first-time visitors)
                setTimeout(() => showVisitorModal(), 800);
            }, 400);
        }
    }, 60);
}

/* ═══════════════════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════════════════ */
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Load saved theme
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    });
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════ */
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const backToTop = document.getElementById('back-to-top');

    // Scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Back to top button
        if (backToTop) {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active nav link
        updateActiveNavLink();
    });

    // Hamburger
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close on nav link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Back to top
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCE COUNTER
   ═══════════════════════════════════════════════════════ */
function initExperienceCounter() {
    const counterEl = document.getElementById('experience-counter');
    const tenureEl = document.getElementById('auto-tenure');
    if (!counterEl) return;

    const startDate = new Date('2024-06-01');

    function updateCounter() {
        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        let display = '';
        if (years > 0) display += `${years}Y `;
        display += `${months}M ${days}D`;

        counterEl.textContent = display;

        if (tenureEl) {
            let tenureText = '';
            if (years > 0) tenureText += `${years} Year${years > 1 ? 's' : ''}, `;
            tenureText += `${months} Month${months > 1 ? 's' : ''}`;
            tenureEl.textContent = `(${tenureText})`;
        }
    }

    updateCounter();
    setInterval(updateCounter, 60000); // Update every minute
}

/* ═══════════════════════════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════════════════════════ */
function initTypingEffect() {
    const el = document.getElementById('typed-tagline');
    if (!el) return;

    const phrases = [
        'Architecting Secure Networks 🛡️',
        'Building Scalable Solutions ⚡',
        'Cisco & Cloud Specialist ☁️',
        'Full-Stack Developer 💻',
        'Network Automation Expert 🤖'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const current = phrases[phraseIdx];

        if (!isDeleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            speed = 60 + Math.random() * 40;

            if (charIdx === current.length) {
                isDeleting = true;
                speed = 2000; // Pause before deleting
            }
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            speed = 30;

            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                speed = 500; // Pause before next phrase
            }
        }

        setTimeout(type, speed);
    }

    // Start after loader
    setTimeout(type, 3000);
}

/* ═══════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ═══════════════════════════════════════════════════════ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars
                if (entry.target.querySelector('.bar-fill')) {
                    entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width + '%';
                            bar.classList.add('animated');
                        }, 300);
                    });
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* ═══════════════════════════════════════════════════════
   CONFIG VIEWER (Interactive Network Config)
   ═══════════════════════════════════════════════════════ */
function initConfigViewer() {
    const tabs = document.querySelectorAll('.config-tab');
    const codes = document.querySelectorAll('.config-code');
    const devices = document.querySelectorAll('.topo-device');

    function switchConfig(configId) {
        tabs.forEach(t => t.classList.remove('active'));
        codes.forEach(c => c.classList.add('hidden'));
        devices.forEach(d => d.classList.remove('active'));

        const activeTab = document.querySelector(`.config-tab[data-config="${configId}"]`);
        const activeCode = document.getElementById(`config-${configId}`);
        const activeDevice = document.querySelector(`.topo-device[data-device="${configId}"]`);

        if (activeTab) activeTab.classList.add('active');
        if (activeCode) activeCode.classList.remove('hidden');
        if (activeDevice) activeDevice.classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchConfig(tab.getAttribute('data-config'));
        });
    });

    devices.forEach(device => {
        device.addEventListener('click', () => {
            switchConfig(device.getAttribute('data-device'));
        });
    });

    // Default: activate first
    if (devices.length > 0) {
        devices[0].classList.add('active');
    }
}

/* ═══════════════════════════════════════════════════════
   LIVE TERMINAL
   ═══════════════════════════════════════════════════════ */
function initTerminal() {
    const terminal = document.getElementById('live-terminal');
    const toggleBtn = document.getElementById('terminal-toggle');
    const closeBtn = document.getElementById('terminal-close');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    if (!terminal || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        terminal.classList.toggle('terminal-hidden');
        terminal.classList.toggle('terminal-visible');
        if (terminal.classList.contains('terminal-visible')) {
            setTimeout(() => input.focus(), 300);
        }
    });

    closeBtn.addEventListener('click', () => {
        terminal.classList.add('terminal-hidden');
        terminal.classList.remove('terminal-visible');
    });

    const commands = {
        help: () => `
Available commands:
  <span class="term-cmd">about</span>     — Learn about me
  <span class="term-cmd">skills</span>    — View my tech stack
  <span class="term-cmd">contact</span>   — Get my contact info
  <span class="term-cmd">projects</span>  — View my projects
  <span class="term-cmd">certs</span>     — View certifications
  <span class="term-cmd">resume</span>    — Download my resume
  <span class="term-cmd">whoami</span>    — Who are you?
  <span class="term-cmd">date</span>      — Current date & time
  <span class="term-cmd">clear</span>     — Clear terminal
  <span class="term-cmd">theme</span>     — Toggle dark/light mode
  <span class="term-cmd">loader</span>    — Info about the loader
  <span class="term-cmd">namaste</span>   — A greeting 🙏`,

        about: () => `
<span style="color: var(--gold)">Shivakumar M</span>
Network Engineer & Software Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Passionate about building secure networks
and innovative software solutions. Cisco &
Cloud specialist with full-stack capabilities.`,

        skills: () => `
<span style="color: var(--gold)">Tech Stack:</span>
  Languages  │ Java, Python, JavaScript, C++
  Web Dev    │ HTML5, CSS3, Bootstrap 5, React
  Networking │ Cisco, OSPF, VLANs, ACLs, BGP
  Cloud      │ AWS, Docker, Git, Linux`,

        contact: () => `
<span style="color: var(--gold)">Contact Info:</span>
  📧 Email    │ shivakumar@example.com
  💼 LinkedIn │ linkedin.com/in/shivakumar
  🐙 GitHub   │ github.com/shivakumar`,

        projects: () => `
<span style="color: var(--gold)">Projects:</span>
  01. Enterprise Campus Network (Cisco)
  02. Full-Stack Task Manager (Java/React)
  03. Network Automation Suite (Python)
Type a project number to learn more!`,

        certs: () => `
<span style="color: var(--gold)">Certifications:</span>
  ✓ CCNA — Cisco Systems
  ✓ CompTIA A+
  ✓ AWS Cloud Practitioner
  ✓ CompTIA Network+
  ✓ Python Professional`,

        resume: () => {
            return `📄 Resume download initiated...
(Add your actual resume link here)`;
        },

        whoami: () => `You are a <span style="color: var(--saffron)">curious visitor</span> exploring this portfolio. Welcome! 🙏`,

        date: () => `📅 ${new Date().toLocaleString('en-IN', {
            dateStyle: 'full',
            timeStyle: 'medium',
            timeZone: 'Asia/Kolkata'
        })}`,

        theme: () => {
            const toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.click();
            const current = document.documentElement.getAttribute('data-theme');
            return `🎨 Theme switched to <span class="term-cmd">${current}</span> mode.`;
        },

        loader: () => `
🌀 <span style="color: var(--gold)">Wave Loader</span>
The loading animation uses a Google-style
multi-ring circular spinner with bouncing
wave bars — representing data flowing
through the network!`,

        namaste: () => `
🙏 <span style="color: var(--saffron)">Namaste!</span>
"I bow to the divine in you."
Thank you for visiting my portfolio!
May your code compile on the first try. ✨`,

        clear: () => 'CLEAR'
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            if (!cmd) return;

            // Show command
            const cmdLine = document.createElement('p');
            cmdLine.innerHTML = `<span class="term-prompt">visitor@portfolio:~$</span> <span class="term-cmd">${cmd}</span>`;
            output.appendChild(cmdLine);

            // Process command
            if (commands[cmd]) {
                const result = commands[cmd]();
                if (result === 'CLEAR') {
                    output.innerHTML = `
                        <p class="term-welcome">Terminal cleared. Type help for commands.</p>
                    `;
                } else {
                    const response = document.createElement('p');
                    response.classList.add('term-response');
                    response.innerHTML = result;
                    output.appendChild(response);
                }
            } else {
                const error = document.createElement('p');
                error.classList.add('term-error');
                error.textContent = `Command not found: "${cmd}". Type "help" for available commands.`;
                output.appendChild(error);
            }

            // Scroll to bottom
            const body = document.getElementById('terminal-body');
            body.scrollTop = body.scrollHeight;
        }
    });
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission (replace with EmailJS/Formspree)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show success message
        status.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        status.className = 'form-status success';
        form.reset();

        // Clear status after 5 seconds
        setTimeout(() => {
            status.textContent = '';
            status.className = 'form-status';
        }, 5000);

        console.log('Form data:', data);
    });
}

/* ═══════════════════════════════════════════════════════
   PARTICLES (Decorative floating particles)
   ═══════════════════════════════════════════════════════ */
function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const colors = ['#FF6B35', '#DAA520', '#B22222', '#00758F', '#4ADE80'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.cssText = `
            background: ${color};
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

        container.appendChild(particle);
    }
}

/* ═══════════════════════════════════════════════════════
   VISITOR TRACKING (Name capture + log)
   ═══════════════════════════════════════════════════════ */

// Get visitor list from localStorage
function getVisitors() {
    try {
        return JSON.parse(localStorage.getItem('portfolio-visitors') || '[]');
    } catch {
        return [];
    }
}

// Save visitor list
function saveVisitors(visitors) {
    localStorage.setItem('portfolio-visitors', JSON.stringify(visitors));
}

// Add a new visitor
function addVisitor(name) {
    const visitors = getVisitors();
    visitors.push({
        name: name.trim(),
        time: new Date().toISOString()
    });
    // Keep last 50 visitors
    if (visitors.length > 50) visitors.splice(0, visitors.length - 50);
    saveVisitors(visitors);
    renderVisitorLog();
}

// Render visitor log in footer
function renderVisitorLog() {
    const listEl = document.getElementById('visitor-log-list');
    const badgeEl = document.getElementById('visit-count-badge');
    if (!listEl) return;

    const visitors = getVisitors();
    if (badgeEl) badgeEl.textContent = visitors.length;

    if (visitors.length === 0) {
        listEl.innerHTML = '<p class="visitor-empty">No visitors yet. Be the first!</p>';
        return;
    }

    // Show most recent visitors first
    const reversed = [...visitors].reverse();
    listEl.innerHTML = reversed.map(v => {
        const initials = v.name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
        const timeAgo = getTimeAgo(new Date(v.time));
        return `
            <div class="visitor-chip">
                <span class="visitor-chip-avatar">${initials}</span>
                <span>${escapeHtml(v.name)}</span>
                <span class="visitor-chip-time">${timeAgo}</span>
            </div>
        `;
    }).join('');
}

// Calculate time ago
function getTimeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Show visitor welcome modal (for first-time visitors per session)
function showVisitorModal() {
    const modal = document.getElementById('visitor-modal');
    const nameInput = document.getElementById('visitor-name-input');
    const submitBtn = document.getElementById('visitor-submit');
    const skipBtn = document.getElementById('visitor-skip');
    if (!modal) return;

    // Check if already registered this session
    if (sessionStorage.getItem('visitor-registered')) return;

    modal.classList.remove('visitor-modal-hidden');
    modal.classList.add('visitor-modal-visible');
    setTimeout(() => nameInput && nameInput.focus(), 500);

    function closeModal() {
        modal.classList.add('visitor-modal-hidden');
        modal.classList.remove('visitor-modal-visible');
        sessionStorage.setItem('visitor-registered', 'true');
    }

    submitBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            addVisitor(name);
        }
        closeModal();
    });

    nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    skipBtn.addEventListener('click', () => {
        // Add anonymous visit
        addVisitor('Anonymous Visitor');
        closeModal();
    });
}

// Initialize visitor tracking
function initVisitorTracking() {
    renderVisitorLog();
}

/* ═══════════════════════════════════════════════════════
   MISC UTILITIES
   ═══════════════════════════════════════════════════════ */
function initMisc() {
    // Current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Collaboration button → smooth scroll to contact with snake transition
    const collabBtn = document.getElementById('collab-btn');
    if (collabBtn) {
        collabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Tilt effect on cert cards
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Smooth reveal on resume button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Add your resume PDF link here!');
        });
    }
}
