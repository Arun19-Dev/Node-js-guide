/* ============================================
   Navigation – Sidebar, Mobile, Active States
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initMobileSearch();
    updateSidebarProgress();
});

/* ---------- Sidebar Toggle ---------- */
function initSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Close sidebar on link click (mobile)
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });

    // Mark active sidebar link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;

    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentHash && href === currentPage + currentHash)) {
            link.classList.add('active');
        }
    });

    // Mark completed sidebar items
    const completed = JSON.parse(localStorage.getItem('nodejs-completed') || '[]');
    sidebar.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
        if (completed.includes(link.dataset.section)) {
            link.classList.add('completed');
        }
    });
}

/* ---------- Mobile Search ---------- */
function initMobileSearch() {
    const mobileSearchBtn = document.getElementById('mobileSearchToggle');
    const searchContainer = document.querySelector('.topbar-search');

    if (!mobileSearchBtn || !searchContainer) return;

    mobileSearchBtn.addEventListener('click', () => {
        searchContainer.classList.toggle('mobile-show');
        if (searchContainer.classList.contains('mobile-show')) {
            const input = searchContainer.querySelector('input');
            if (input) input.focus();
        }
    });

    // Close mobile search on outside click
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !mobileSearchBtn.contains(e.target)) {
            searchContainer.classList.remove('mobile-show');
        }
    });
}

/* ---------- Update Sidebar Progress ---------- */
function updateSidebarProgress() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const allSections = sidebar.querySelectorAll('.sidebar-link[data-section]');
    const total = allSections.length;
    if (total === 0) return;

    const completed = JSON.parse(localStorage.getItem('nodejs-completed') || '[]');
    let completedCount = 0;

    allSections.forEach(link => {
        if (completed.includes(link.dataset.section)) {
            link.classList.add('completed');
            completedCount++;
        } else {
            link.classList.remove('completed');
        }
    });

    const percent = Math.round((completedCount / total) * 100);
    const fill = sidebar.querySelector('.sidebar-progress-fill');
    const label = sidebar.querySelector('.progress-percent');

    if (fill) fill.style.width = percent + '%';
    if (label) label.textContent = percent + '%';
}
