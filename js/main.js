/* ============================================
   Main JavaScript – Theme, Scroll-to-Top, Init
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollToTop();
    initFadeAnimations();
    initCodeCopyButtons();
    initAnswerToggles();
    initMarkCompleteButtons();
    highlightActiveNav();
});

/* ---------- Theme Toggle ---------- */
function initTheme() {
    const saved = localStorage.getItem('nodejs-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);

    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('nodejs-theme', next);
            updateThemeIcon(next);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
}

/* ---------- Scroll to Top ---------- */
function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- Fade-in on Scroll ---------- */
function initFadeAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* ---------- Copy Code Buttons ---------- */
function initCodeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.closest('.code-block-wrapper').querySelector('pre code');
            if (!codeBlock) return;
            const text = codeBlock.textContent;
            navigator.clipboard.writeText(text).then(() => {
                btn.classList.add('copied');
                btn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                }, 2000);
            }).catch(() => {
                /* Fallback for older browsers */
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                btn.classList.add('copied');
                btn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                }, 2000);
            });
        });
    });
}

/* ---------- Answer Toggles ---------- */
function initAnswerToggles() {
    document.querySelectorAll('.answer-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                target.classList.toggle('show');
                const isOpen = target.classList.contains('show');
                btn.innerHTML = isOpen
                    ? '<i class="bi bi-eye-slash"></i> Hide Answer'
                    : '<i class="bi bi-eye"></i> Show Answer';
            }
        });
    });
}

/* ---------- Mark Complete Buttons ---------- */
function initMarkCompleteButtons() {
    document.querySelectorAll('.mark-complete-btn').forEach(btn => {
        const section = btn.dataset.section;
        if (!section) return;

        const completed = JSON.parse(localStorage.getItem('nodejs-completed') || '[]');
        if (completed.includes(section)) {
            btn.classList.add('completed');
            btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed';
        }

        btn.addEventListener('click', () => {
            const completed = JSON.parse(localStorage.getItem('nodejs-completed') || '[]');
            if (completed.includes(section)) {
                // Un-mark
                const idx = completed.indexOf(section);
                completed.splice(idx, 1);
                btn.classList.remove('completed');
                btn.innerHTML = '<i class="bi bi-check-circle"></i> Mark Complete';
            } else {
                completed.push(section);
                btn.classList.add('completed');
                btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed';
            }
            localStorage.setItem('nodejs-completed', JSON.stringify(completed));
            // Update sidebar & progress
            if (typeof updateSidebarProgress === 'function') updateSidebarProgress();
            if (typeof updateProgressBar === 'function') updateProgressBar();
        });
    });
}

/* ---------- Highlight Active Nav ---------- */
function highlightActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link-top').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page) {
            link.classList.add('active');
        }
    });
}

/* ---------- Init Highlight.js (called after load) ---------- */
function initHighlightJS() {
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    }
}

// Run highlight after everything loads
window.addEventListener('load', initHighlightJS);
