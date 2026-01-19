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

        // Load users from localStorage or use default
        const storedUsers = localStorage.getItem('kundalik_users');
        const allUsers = storedUsers ? JSON.parse(storedUsers) : users;

        // Verify credentials & role
        const user = allUsers.find(u => u.username === username && u.password === password && u.role === role);

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

    // ========== ADMIN USER MANAGEMENT ==========

    // Initialize users in localStorage if not exists
    if (!localStorage.getItem('kundalik_users')) {
        localStorage.setItem('kundalik_users', JSON.stringify(users));
    }

    // Load users from localStorage
    function loadUsers() {
        const stored = localStorage.getItem('kundalik_users');
        return stored ? JSON.parse(stored) : users;
    }

    // Save users to localStorage
    function saveUsers(usersList) {
        localStorage.setItem('kundalik_users', JSON.stringify(usersList));
    }

    // Render users list in admin panel
    function renderUsersList() {
        const container = document.getElementById('users-list');
        if (!container) return;

        const allUsers = loadUsers();
        container.innerHTML = '';

        allUsers.forEach(user => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div class="subject-info">
                    <strong>${user.fullName}</strong>
                    <p>${user.typeDisplay} • @${user.username}</p>
                </div>
                <div class="grade-badge">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
            `;
            container.appendChild(card);
        });
    }

    // Open modal
    window.openAddUserModal = () => {
        document.getElementById('add-user-modal').classList.add('active');
        document.getElementById('add-user-form').reset();
        document.getElementById('add-user-error').classList.remove('show');
        document.getElementById('add-user-error').textContent = '';
    };

    // Close modal
    window.closeAddUserModal = () => {
        document.getElementById('add-user-modal').classList.remove('active');
    };

    // Add user button listener
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', openAddUserModal);
    }

    // Form submission
    const addUserForm = document.getElementById('add-user-form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('new-username').value.trim().toLowerCase();
            const password = document.getElementById('new-password').value.trim();
            const firstName = document.getElementById('new-firstname').value.trim();
            const lastName = document.getElementById('new-lastname').value.trim();
            const middleName = document.getElementById('new-middlename').value.trim().toLowerCase();
            const birthDate = document.getElementById('new-birthdate').value.trim();
            const role = document.querySelector('input[name="new-user-role"]:checked').value;
            const errorDiv = document.getElementById('add-user-error');

            // Validation (matching Python logic)
            if (password.length !== 4 || !/^\d{4}$/.test(password)) {
                errorDiv.textContent = '( ERROR ) Parol 4 ta raqamdan iborat bo\'lishi kerak!';
                errorDiv.classList.add('show');
                return;
            }

            if (birthDate.length !== 10 || !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) {
                errorDiv.textContent = '( ERROR ) Tug\'ilgan sana noto\'g\'ri! (DD.MM.YYYY formatida kiriting)';
                errorDiv.classList.add('show');
                return;
            }

            if (!middleName.endsWith('ovich') && !middleName.endsWith('ovna')) {
                errorDiv.textContent = '( ERROR ) Otasining ismi \'ovich\' yoki \'ovna\' bilan tugashi shart!';
                errorDiv.classList.add('show');
                return;
            }

            // Create new user
            const allUsers = loadUsers();
            const newId = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;

            // Capitalize first letter of first and last name
            const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
            const fullName = `${capitalizedFirstName} ${capitalizedLastName}`;

            const newUser = {
                id: newId,
                username: username,
                password: password,
                role: role,
                fullName: fullName,
                typeDisplay: role === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi',
                firstName: capitalizedFirstName,
                lastName: capitalizedLastName,
                middleName: middleName,
                birthDate: birthDate
            };

            allUsers.push(newUser);
            saveUsers(allUsers);
            renderUsersList();
            closeAddUserModal();

            // Success feedback
            alert(`✅ ${role === 'teacher' ? 'O\'qituvchi' : 'O\'quvchi'} ${fullName} muvaffaqiyatli qo'shildi!`);
        });
    }

    // Render users list on admin dashboard load
    if (document.getElementById('users-list')) {
        renderUsersList();
    }
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
