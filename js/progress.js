/* ============================================
   Progress Tracking – localStorage based
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initProgressTracking();
    initChecklist();
});

/* ---------- Track sections completed ---------- */
function initProgressTracking() {
    updateProgressBar();
}

function updateProgressBar() {
    const progressFills = document.querySelectorAll('.sidebar-progress-fill');
    const progressLabels = document.querySelectorAll('.progress-percent');

    const allSections = document.querySelectorAll('.sidebar-link[data-section]');
    const total = allSections.length;
    if (total === 0) return;

    const completed = JSON.parse(localStorage.getItem('nodejs-completed') || '[]');
    let count = 0;

    allSections.forEach(link => {
        if (completed.includes(link.dataset.section)) {
            count++;
        }
    });

    const percent = Math.round((count / total) * 100);

    progressFills.forEach(fill => {
        fill.style.width = percent + '%';
    });

    progressLabels.forEach(label => {
        label.textContent = percent + '%';
    });

    // Also update any page-level progress indicators
    const pageProgress = document.getElementById('pageProgressFill');
    const pageProgressLabel = document.getElementById('pageProgressLabel');

    if (pageProgress || pageProgressLabel) {
        // Count page-specific sections only
        const pageKey = document.body.dataset.page;
        if (pageKey) {
            const pageSections = document.querySelectorAll('.mark-complete-btn[data-section^="' + pageKey + '"]');
            const pageTotal = pageSections.length;
            let pageCompleted = 0;
            pageSections.forEach(btn => {
                if (completed.includes(btn.dataset.section)) {
                    pageCompleted++;
                }
            });
            const pagePercent = pageTotal > 0 ? Math.round((pageCompleted / pageTotal) * 100) : 0;
            if (pageProgress) pageProgress.style.width = pagePercent + '%';
            if (pageProgressLabel) pageProgressLabel.textContent = pagePercent + '% Complete';
        }
    }
}

/* ---------- Checklist ---------- */
function initChecklist() {
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
        const key = 'nodejs-check-' + checkbox.id;
        const saved = localStorage.getItem(key);

        if (saved === 'true') {
            checkbox.checked = true;
            checkbox.closest('.checklist-item').classList.add('checked');
        }

        checkbox.addEventListener('change', () => {
            localStorage.setItem(key, checkbox.checked);
            checkbox.closest('.checklist-item').classList.toggle('checked', checkbox.checked);
        });
    });
}
