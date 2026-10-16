/* ============================================
   Search – Topic search across pages
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});

/* Searchable content index */
const searchIndex = [
    // Fundamentals Page
    { title: "What is Node.js?", page: "fundamentals.html", section: "#what-is-nodejs", tags: "nodejs runtime v8 engine javascript" },
    { title: "Why Do We Use Node.js?", page: "fundamentals.html", section: "#why-nodejs", tags: "server api backend rest" },
    { title: "Node.js Architecture", page: "fundamentals.html", section: "#architecture", tags: "event loop call stack v8 non-blocking async" },
    { title: "Install Node.js", page: "fundamentals.html", section: "#install", tags: "download install windows npm" },
    { title: "First Node.js Program", page: "fundamentals.html", section: "#first-program", tags: "hello world console log" },
    { title: "Create a Basic Server", page: "fundamentals.html", section: "#basic-server", tags: "http createServer require listen port" },
    { title: "What Is an Endpoint?", page: "fundamentals.html", section: "#endpoints", tags: "url route api get post method" },
    { title: "Create Multiple Endpoints", page: "fundamentals.html", section: "#multiple-endpoints", tags: "routing json response status code" },

    // Topics Page
    { title: "Module 1: Node.js Fundamentals", page: "topics.html", section: "#module-1", tags: "introduction features advantages event loop v8" },
    { title: "Module 2: Installation & Environment", page: "topics.html", section: "#module-2", tags: "install vscode terminal npm" },
    { title: "Module 3: JavaScript Revision", page: "topics.html", section: "#module-3", tags: "variables functions arrow callbacks promises async await" },
    { title: "Module 4: Node.js Modules", page: "topics.html", section: "#module-4", tags: "require exports import fs path os http" },
    { title: "Module 5: npm & Project Management", page: "topics.html", section: "#module-5", tags: "npm install package.json node_modules scripts" },
    { title: "Module 6: Creating HTTP Servers", page: "topics.html", section: "#module-6", tags: "http server client request response port" },
    { title: "Module 7: Routing & Endpoints", page: "topics.html", section: "#module-7", tags: "route endpoint url get post put delete rest" },
    { title: "Module 8: Asynchronous Programming", page: "topics.html", section: "#module-8", tags: "async await promise callback event loop timers" },
    { title: "Module 9: File System", page: "topics.html", section: "#module-9", tags: "readFile writeFile fs file" },
    { title: "Module 10: Express.js Introduction", page: "topics.html", section: "#module-10", tags: "express middleware route api framework" },
    { title: "Module 11: API Fundamentals", page: "topics.html", section: "#module-11", tags: "api rest crud json postman status codes" },
    { title: "Module 12: Environment Variables & Security", page: "topics.html", section: "#module-12", tags: "env dotenv process security cors" },
    { title: "Module 13: Database Fundamentals", page: "topics.html", section: "#module-13", tags: "database mongodb sql nosql crud mongoose" },
    { title: "Module 14: Authentication Basics", page: "topics.html", section: "#module-14", tags: "authentication jwt bcrypt login register session" },
    { title: "Module 15: Error Handling & Debugging", page: "topics.html", section: "#module-15", tags: "error try catch debug vscode" },
    { title: "Module 16: Deployment", page: "topics.html", section: "#module-16", tags: "deploy git github heroku hosting cicd" },
    { title: "Module 17: Projects & Practice", page: "topics.html", section: "#module-17", tags: "project crud api express mongodb" },

    // Practical Lab Page
    { title: "Step 1: Install Node.js", page: "practical-lab.html", section: "#step-1", tags: "install download node npm" },
    { title: "Step 2: Create Project Folder", page: "practical-lab.html", section: "#step-2", tags: "folder project vscode" },
    { title: "Step 3: Initialize Project", page: "practical-lab.html", section: "#step-3", tags: "npm init package.json" },
    { title: "Step 4: Create Application File", page: "practical-lab.html", section: "#step-4", tags: "app.js file create" },
    { title: "Step 5: Write Server Code", page: "practical-lab.html", section: "#step-5", tags: "http server code" },
    { title: "Step 6: Run the Server", page: "practical-lab.html", section: "#step-6", tags: "node run execute terminal" },
    { title: "Step 7: Test the Server", page: "practical-lab.html", section: "#step-7", tags: "localhost browser test" },
    { title: "Step 8: Add More Endpoints", page: "practical-lab.html", section: "#step-8", tags: "endpoints routing about students" },
    { title: "Step 9: Handle Invalid Endpoints", page: "practical-lab.html", section: "#step-9", tags: "404 not found error" },
    { title: "Step 10: npm Scripts", page: "practical-lab.html", section: "#step-10", tags: "npm start scripts package" },
    { title: "Step 11: Debug Common Problems", page: "practical-lab.html", section: "#step-11", tags: "debug error port syntax" },
    { title: "Step 12: Student Assessment", page: "practical-lab.html", section: "#step-12", tags: "quiz assessment mcq practice" },

    // Concepts
    { title: "What is require()?", page: "fundamentals.html", section: "#basic-server", tags: "require commonjs module import" },
    { title: "HTTP Status Codes", page: "fundamentals.html", section: "#endpoints", tags: "200 201 400 401 404 500 status code" },
    { title: "HTTP Methods", page: "fundamentals.html", section: "#endpoints", tags: "get post put patch delete method" },
    { title: "V8 Engine", page: "fundamentals.html", section: "#architecture", tags: "v8 engine google chrome javascript" },
    { title: "Event Loop", page: "fundamentals.html", section: "#architecture", tags: "event loop non-blocking async queue" },
    { title: "Callbacks & Promises", page: "topics.html", section: "#module-8", tags: "callback promise async await then catch" },
    { title: "Express.js REST API", page: "topics.html", section: "#module-10", tags: "express rest api middleware route" },
    { title: "MongoDB Connection", page: "topics.html", section: "#module-13", tags: "mongodb atlas mongoose connection database" },
    { title: "JWT Authentication", page: "topics.html", section: "#module-14", tags: "jwt token authentication login" },
];

function initSearch() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchResults');

    if (!input || !dropdown) return;

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        dropdown.innerHTML = '';

        if (query.length < 2) {
            dropdown.classList.remove('show');
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.tags.toLowerCase().includes(query)
        ).slice(0, 8);

        if (results.length === 0) {
            dropdown.innerHTML = '<div class="search-result-item"><div class="result-title" style="color:var(--text-muted)">No results found</div></div>';
            dropdown.classList.add('show');
            return;
        }

        results.forEach(item => {
            const el = document.createElement('a');
            el.href = item.page + item.section;
            el.className = 'search-result-item';
            el.innerHTML = `
                <div class="result-title">${highlightMatch(item.title, query)}</div>
                <div class="result-page"><i class="bi bi-file-earmark-text"></i> ${getPageName(item.page)}</div>
            `;
            dropdown.appendChild(el);
        });

        dropdown.classList.add('show');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Close on Escape
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('show');
            input.blur();
        }
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<strong style="color:var(--accent-blue)">$1</strong>');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getPageName(page) {
    const names = {
        'fundamentals.html': 'Fundamentals',
        'topics.html': 'Complete Topics',
        'practical-lab.html': 'Practical Lab'
    };
    return names[page] || page;
}
