document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');

    // Theme Management
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('kundalik_theme', isLight ? 'light' : 'dark');

        // Micro-feedback animation
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => themeToggle.style.transform = 'scale(1)', 150);
    });

    if (localStorage.getItem('kundalik_theme') === 'light') {
        body.classList.add('light-mode');
    }

    // Official Mock Data (Mirroring Backend)
    const users = [
        { id: 1, username: '1', password: '1', role: 'admin', fullName: 'Saidazimxon Ismilow', typeDisplay: 'Asosiy Admin' },
        { id: 2, username: '2', password: '2', role: 'teacher', fullName: 'Saidazimxon Ismilow', typeDisplay: 'Matematika O\'qituvchisi' },
        { id: 3, username: '2', password: '2', role: 'student', fullName: 'Saidazimxon Ismilow', typeDisplay: 'O\'quvchi' },
        { id: 4, username: 'admin', password: 'admin', role: 'admin', fullName: 'Administrator', typeDisplay: 'Tizim Admini' }
    ];

    const gradesMock = [
        { name: 'Matematika', grade: 5, status: 'A' },
        { name: 'Ingliz Tili', grade: 5, status: 'A+' },
        { name: 'Ona Tili', grade: 4, status: 'B' },
        { name: 'Fizika', grade: 5, status: 'A' },
        { name: 'Tarix', grade: 4, status: 'B+' },
        { name: 'Kimyo', grade: 3, status: 'C' }
    ];

    // Auth Logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.querySelector('input[name="user-role"]:checked').value;

        // Verify credentials & role
        const user = users.find(u => u.username === username && u.password === password && u.role === role);

        if (!user) {
            loginError.textContent = 'Username, Parol yoki Rol noto\'g\'ri!';
            loginError.classList.add('show');

            // Shake effect
            const card = document.querySelector('.auth-card');
            card.style.animation = 'shake 0.4s ease';
            setTimeout(() => card.style.animation = '', 400);
            return;
        }

        loginError.classList.remove('show');
        loginError.textContent = '';

        launchDashboard(user);
    });

    function launchDashboard(user) {
        // Hide Login
        document.getElementById('auth-section').classList.remove('active');

        // Show selected role dashboard
        const dashboard = document.getElementById(`${user.role}-dashboard`);
        dashboard.classList.add('active');

        // Update Displays
        const displays = document.querySelectorAll(`[id$="${user.role}-display"]`);
        displays.forEach(d => d.textContent = user.fullName);

        // Show Logout
        logoutBtn.style.display = 'block';

        if (user.role === 'student') {
            renderGrades();
        }
    }

    logoutBtn.addEventListener('click', () => {
        document.querySelectorAll('.role-section').forEach(s => s.classList.remove('active'));
        document.getElementById('auth-section').classList.add('active');
        logoutBtn.style.display = 'none';

        // Reset forms
        loginForm.reset();
    });

    // Student Logic
    window.switchStudentTab = (tabId) => {
        const btns = document.querySelectorAll('.tab-btn');
        btns.forEach(b => {
            const isTarget = b.textContent.toLowerCase().includes(tabId === 'sinf' ? 'sinf' : 'qoshimcha');
            b.classList.toggle('active', isTarget);
        });

        document.getElementById('sinf-section').classList.toggle('active', tabId === 'sinf');
        document.getElementById('extra-section').classList.toggle('active', tabId === 'extra');
    };

    const extraClassesMock = {
        "1111": { name: "Saidazimxon Ismoilov", subject: "MATH", time: "09:00", days: "Seshanba, Payshanba, Shanba" },
        "2222": { name: "Ali Valiyev", subject: "HISTORY", time: "13:00", days: "Seshanba, Payshanba, Shanba" },
        "3333": { name: "Nosirjonov Nurbek", subject: "ENGLISH", time: "15:00", days: "Dushanba, Chorshanba, Juma" }
    };

    window.verifyExtraPass = () => {
        const pass = document.getElementById('extra-pass').value;
        const error = document.getElementById('extra-error');
        const dataContainer = document.querySelector('#extra-section .subject-grid');

        const found = extraClassesMock[pass];

        if (found) {
            document.getElementById('extra-auth').style.display = 'none';
            document.getElementById('extra-data').classList.add('active');
            error.classList.remove('show');

            dataContainer.innerHTML = `
                <div class="subject-card">
                    <div class="subject-info">
                        <strong>${found.subject}</strong>
                        <p>${found.days}</p>
                        <p style="font-size: 0.8rem; margin-top: 5px;">O'quvchi: ${found.name}</p>
                    </div>
                    <div class="grade-badge">${found.time}</div>
                </div>
            `;
        } else {
            error.textContent = 'Bunday parolga ega o‘quvchi yo‘q! (To\'g\'ri kodlar: 1111, 2222, 3333)';
            error.classList.add('show');
        }
    };

    function renderGrades() {
        const container = document.getElementById('subject-list');
        container.innerHTML = '';

        gradesMock.forEach(item => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div class="subject-info">
                    <strong>${item.name}</strong>
                    <p>Haftalik o'zlashtirish • ${item.status}</p>
                </div>
                <div class="grade-badge">${item.grade}</div>
            `;
            container.appendChild(card);
        });
    }

    // Add Enter key listener for extra password
    document.getElementById('extra-pass').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            window.verifyExtraPass();
        }
    });
});

// Add keyframes for shake
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
`;
document.head.appendChild(style);
