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

    // Helper to clear login error
    const clearLoginError = () => {
        loginError.classList.remove('show');
        loginError.textContent = '';
    };

    // Clear error on input interaction
    document.getElementById('username').addEventListener('input', clearLoginError);
    document.getElementById('password').addEventListener('input', clearLoginError);
    document.querySelectorAll('input[name="user-role"]').forEach(radio => {
        radio.addEventListener('change', clearLoginError);
    });

    // Auto-login if user was previously logged in
    const storedCurrentUser = localStorage.getItem('kundalik_current_user');
    if (storedCurrentUser) {
        const user = JSON.parse(storedCurrentUser);
        launchDashboard(user);
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
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const roleChecked = document.querySelector('input[name="user-role"]:checked');
        const role = roleChecked ? roleChecked.value : '';

        // Specific Validation
        if (!username || !password) {
            loginError.textContent = 'Iltimos, barcha maydonlarni to\'ldiring!';
            loginError.classList.add('show');
            return;
        }

        // Loading state
        const submitBtn = loginForm.querySelector('.primary-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Kirilmoqda...';

        // Load users from localStorage or use default
        const storedUsers = localStorage.getItem('kundalik_users');
        const allUsers = storedUsers ? JSON.parse(storedUsers) : users;

        // Verify credentials & role
        const user = allUsers.find(u => u.username === username && u.password === password && u.role === role);

        setTimeout(() => {
            if (!user) {
                loginError.textContent = 'Username, Parol yoki Rol noto\'g\'ri!';
                loginError.classList.add('show');

                // Shake effect
                const card = document.querySelector('.auth-card');
                card.style.animation = 'shake 0.4s ease';
                setTimeout(() => card.style.animation = '', 400);

                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                return;
            }

            clearLoginError();
            launchDashboard(user);
            // Persist logged-in user for page reloads
            localStorage.setItem('kundalik_current_user', JSON.stringify(user));

            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 600); // Slight delay for premium feel
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

        // Clear persisted user
        localStorage.removeItem('kundalik_current_user');

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

        const sinfSec = document.getElementById('sinf-section');
        const extraSec = document.getElementById('extra-section');
        if (sinfSec) sinfSec.classList.toggle('active', tabId === 'sinf');
        if (extraSec) extraSec.classList.toggle('active', tabId === 'extra');
    };

    const extraClassesMock = {
        "1111": { name: "Saidazimxon Ismoilov", subject: "MATH", time: "09:00", days: "Seshanba, Payshanba, Shanba" },
        "2222": { name: "Ali Valiyev", subject: "HISTORY", time: "13:00", days: "Seshanba, Payshanba, Shanba" },
        "3333": { name: "Nosirjonov Nurbek", subject: "ENGLISH", time: "15:00", days: "Dushanba, Chorshanba, Juma" }
    };

    window.verifyExtraPass = () => {
        const passEl = document.getElementById('extra-pass');
        if (!passEl) return;
        const pass = passEl.value;
        const error = document.getElementById('extra-error');
        const dataContainer = document.querySelector('#extra-section .subject-grid');

        const found = extraClassesMock[pass];

        if (found) {
            const extraAuth = document.getElementById('extra-auth');
            const extraData = document.getElementById('extra-data');
            if (extraAuth) extraAuth.style.display = 'none';
            if (extraData) extraData.classList.add('active');
            if (error) error.classList.remove('show');

            if (dataContainer) {
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
            }
        } else {
            if (error) {
                error.textContent = 'Bunday parolga ega o‘quvchi yo‘q! (To\'g\'ri kodlar: 1111, 2222, 3333)';
                error.classList.add('show');
            }
        }
    };

    function renderGrades() {
        const container = document.getElementById('subject-list');
        if (!container) return;
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
    const extraPassInput = document.getElementById('extra-pass');
    if (extraPassInput) {
        extraPassInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                window.verifyExtraPass();
            }
        });
    }

    // ========== ADMIN CLI COMMAND SYSTEM ==========

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

    // Command handler
    const commandInput = document.getElementById('admin-command-input');
    const commandOutput = document.getElementById('command-output');
    // REMOVED: usersDisplay, usersListTerminal (replaced by modal)

    if (commandInput) {
        commandInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const cmd = parseInt(commandInput.value);

                // Visual feedback - flash effect
                commandInput.classList.add('executing');
                setTimeout(() => {
                    commandInput.classList.remove('executing');
                }, 300);

                executeCommand(cmd);
                commandInput.value = '';
            }
        });

        // Add typing sound effect (visual)
        commandInput.addEventListener('input', (e) => {
            commandInput.style.color = e.target.value ? 'var(--accent-cyan)' : 'var(--success-green)';
        });

        // Click handler for Yuborish button
        const adminSubmitBtn = document.getElementById('admin-submit-btn');
        if (adminSubmitBtn) {
            adminSubmitBtn.addEventListener('click', () => {
                const cmd = parseInt(commandInput.value);
                if (!isNaN(cmd)) {
                    // Visual feedback
                    commandInput.classList.add('executing');
                    setTimeout(() => commandInput.classList.remove('executing'), 300);
                    executeCommand(cmd);
                    commandInput.value = '';
                }
            });
        }
    }

    function executeCommand(cmd) {
        commandOutput.innerHTML = '';

        if (cmd === 1) {
            // O'qituvchi qo'shish
            commandOutput.innerHTML = '<div class="success">--- O\'qituvchi qo\'shish ---</div>';
            setTimeout(() => {
                const teacherRadio = document.querySelector('input[name="new-user-role"][value="teacher"]');
                if (teacherRadio) teacherRadio.checked = true;
                openAddUserModal();
            }, 300);
        } else if (cmd === 2) {
            // O'quvchi qo'shish
            commandOutput.innerHTML = '<div class="success">--- O\'quvchi qo\'shish ---</div>';
            setTimeout(() => {
                const studentRadio = document.querySelector('input[name="new-user-role"][value="student"]');
                if (studentRadio) studentRadio.checked = true;
                openAddUserModal();
            }, 300);
        } else if (cmd === 3) {
            // Foydalanuvchilar ro'yxati
            listUsersTerminal();
        } else if (cmd === 0) {
            // Chiqish
            commandOutput.innerHTML = '<div class="success">Dastur yakunlandi!</div>';
            setTimeout(() => {
                document.getElementById('logout-btn').click();
            }, 1000);
        } else {
            commandOutput.innerHTML = '<div class="error">Bunday buyruq mavjud emas!</div>';
        }
    }

    function listUsersTerminal() {
        const allUsers = loadUsers();
        let content = '';

        if (allUsers.length === 0) {
            content = '<div class="user-line">Foydalanuvchilar mavjud emas.</div>';
        } else {
            allUsers.forEach(user => {
                content += `<div class="user-line">ID: ${user.id} | ${user.role.toUpperCase()} | ${user.fullName} (@${user.username})</div>`;
            });
        }

        showResultModal('--- Barcha Foydalanuvchilar ---', content, 'modal-admin');
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
        commandOutput.innerHTML = '';
    };

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
            closeAddUserModal();

            // Success feedback (matching Python output)
            const roleText = role === 'teacher' ? 'teacher' : 'student';
            commandOutput.innerHTML = `<div class="success">( SUCCESS ) ${roleText} ${fullName} qo'shildi (ID: ${newId})</div>`;
        });
    }

    // ========== STUDENT CLI COMMAND SYSTEM ==========
    const studentCommandInput = document.getElementById('student-command-input');
    const studentCommandOutput = document.getElementById('student-command-output');
    // REMOVED: studentDataDisplay, studentDataContent (replaced by modal)

    if (studentCommandInput) {
        studentCommandInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const cmd = parseInt(studentCommandInput.value);

                // Visual feedback
                studentCommandInput.classList.add('executing');
                setTimeout(() => studentCommandInput.classList.remove('executing'), 300);

                executeStudentCommand(cmd);
                studentCommandInput.value = '';
            }
        });

        studentCommandInput.addEventListener('input', (e) => {
            studentCommandInput.style.color = e.target.value ? '#bf5af2' : '#32d74b';
        });

        // Click handler for Yuborish button
        const studentSubmitBtn = document.getElementById('student-submit-btn');
        if (studentSubmitBtn) {
            studentSubmitBtn.addEventListener('click', () => {
                const cmd = parseInt(studentCommandInput.value);
                if (!isNaN(cmd)) {
                    // Visual feedback
                    studentCommandInput.classList.add('executing');
                    setTimeout(() => studentCommandInput.classList.remove('executing'), 300);
                    executeStudentCommand(cmd);
                    studentCommandInput.value = '';
                }
            });
        }
    }

    function executeStudentCommand(cmd) {
        studentCommandOutput.innerHTML = '';
        let content = '';

        if (cmd === 1) {
            // Baholarni ko'rish
            gradesMock.forEach(item => {
                content += `<div class="user-line">${item.name}: ${item.grade} (${item.status})</div>`;
            });
            showResultModal('--- Mening Baholarim ---', content, 'modal-student');
        } else if (cmd === 2) {
            // Qo'shimcha darslar
            const extraClasses = [
                { name: 'Python Programming', time: '18:00', students: 'Saidazimxon Ismoilov' },
                { name: 'IELTS Foundation', time: '16:30', students: 'Saidazimxon Ismoilov' },
                { name: 'Algoritmlash', time: '10:00', students: 'Saidazimxon Ismoilov' }
            ];
            extraClasses.forEach(cls => {
                content += `<div class="user-line">${cls.name} | ${cls.time} | O'qituvchi: ${cls.students}</div>`;
            });
            showResultModal('--- Qo\'shimcha Darslar ---', content, 'modal-student');
        } else if (cmd === 3) {
            // O'rtacha ball
            const avg = (gradesMock.reduce((sum, g) => sum + g.grade, 0) / gradesMock.length).toFixed(2);
            studentCommandOutput.innerHTML = `<div class="success">📊 O'rtacha ball: ${avg}</div>`;
        } else if (cmd === 0) {
            studentCommandOutput.innerHTML = '<div class="success">Dastur yakunlandi!</div>';
            setTimeout(() => document.getElementById('logout-btn').click(), 1000);
        } else {
            studentCommandOutput.innerHTML = '<div class="error">Bunday buyruq mavjud emas!</div>';
        }
    }

    // ========== TEACHER CLI COMMAND SYSTEM ==========
    const teacherCommandInput = document.getElementById('teacher-command-input');
    const teacherCommandOutput = document.getElementById('teacher-command-output');
    // REMOVED: teacherDataDisplay, teacherDataContent (replaced by modal)

    if (teacherCommandInput) {
        teacherCommandInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const cmd = parseInt(teacherCommandInput.value);

                // Visual feedback
                teacherCommandInput.classList.add('executing');
                setTimeout(() => teacherCommandInput.classList.remove('executing'), 300);

                executeTeacherCommand(cmd);
                teacherCommandInput.value = '';
            }
        });

        teacherCommandInput.addEventListener('input', (e) => {
            teacherCommandInput.style.color = e.target.value ? '#ff453a' : '#ff9f0a';
        });

        // Click handler for Yuborish button
        const teacherSubmitBtn = document.getElementById('teacher-submit-btn');
        if (teacherSubmitBtn) {
            teacherSubmitBtn.addEventListener('click', () => {
                const cmd = parseInt(teacherCommandInput.value);
                if (!isNaN(cmd)) {
                    // Visual feedback
                    teacherCommandInput.classList.add('executing');
                    setTimeout(() => teacherCommandInput.classList.remove('executing'), 300);
                    executeTeacherCommand(cmd);
                    teacherCommandInput.value = '';
                }
            });
        }
    }

    function executeTeacherCommand(cmd) {
        teacherCommandOutput.innerHTML = '';
        let content = '';

        if (cmd === 1) {
            // Bugungi darslar
            const lessons = [
                { name: 'Matematika (9-A)', time: '08:30', students: 20 },
                { name: 'Matematika (10-B)', time: '10:00', students: 18 },
                { name: 'Algebra (11-C)', time: '11:45', students: 22 }
            ];
            lessons.forEach(lesson => {
                content += `<div class="user-line">${lesson.time} | ${lesson.name} | ${lesson.students} o'quvchi</div>`;
            });
            showResultModal('--- Bugungi Dars Jadvali ---', content, 'modal-teacher');
        } else if (cmd === 2) {
            // Sinflar ro'yxati
            const classes = ['9-A (20 o\'quvchi)', '10-B (18 o\'quvchi)', '11-C (22 o\'quvchi)', '9-B (19 o\'quvchi)', '10-A (21 o\'quvchi)'];
            classes.forEach(cls => {
                content += `<div class="user-line">${cls}</div>`;
            });
            showResultModal('--- Sinflar Ro\'yxati ---', content, 'modal-teacher');
        } else if (cmd === 3) {
            // Statistika
            teacherCommandOutput.innerHTML = '<div class="success">📊 Sinflar: 5 | O\'rtacha o\'zlashtirish: 89% | Yangi baholar: 42</div>';
        } else if (cmd === 0) {
            teacherCommandOutput.innerHTML = '<div class="success">Dastur yakunlandi!</div>';
            setTimeout(() => document.getElementById('logout-btn').click(), 1000);
        } else {
            teacherCommandOutput.innerHTML = '<div class="error">Bunday buyruq mavjud emas!</div>';
        }
    }

    // ========== MODAL UTILITIES ==========
    window.showResultModal = function (title, content, themeClass) {
        const modal = document.getElementById('result-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalContent = modal.querySelector('.modal-content');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;

        // Clear old themes
        modalContent.classList.remove('modal-student', 'modal-teacher', 'modal-admin');
        if (themeClass) modalContent.classList.add(themeClass);

        modal.classList.add('active');
    };

    window.closeResultModal = function () {
        const modal = document.getElementById('result-modal');
        modal.classList.remove('active');
    };
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
