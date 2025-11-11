// Authentication functionality
function initAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const closeButtons = document.querySelectorAll('.close');
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Open register modal
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            registerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Switch to register form
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
        });
    }
    
    // Switch to login form
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    }
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                // Simulate login process
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Вход...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // In a real app, you would send AJAX request here
                    loginModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Update UI for logged in user
                    updateUIForLoggedInUser();
                    
                    if (typeof showNotification === 'function') {
                        showNotification('Вы успешно вошли в систему', 'success');
                    }
                }, 1500);
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegisterForm()) {
                // Simulate registration process
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Регистрация...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // In a real app, you would send AJAX request here
                    registerModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Update UI for logged in user
                    updateUIForLoggedInUser();
                    
                    if (typeof showNotification === 'function') {
                        showNotification('Регистрация прошла успешно', 'success');
                    }
                }, 1500);
            }
        });
    }
    
    // Form validation functions
    function validateLoginForm() {
        let isValid = true;
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        
        // Reset errors
        clearErrors(loginForm);
        
        // Email validation
        if (!email.value.trim()) {
            showError(email, 'Введите email или телефон');
            isValid = false;
        }
        
        // Password validation
        if (!password.value) {
            showError(password, 'Введите пароль');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, 'Пароль должен содержать не менее 6 символов');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateRegisterForm() {
        let isValid = true;
        const name = document.getElementById('registerName');
        const email = document.getElementById('registerEmail');
        const phone = document.getElementById('registerPhone');
        const password = document.getElementById('registerPassword');
        const confirm = document.getElementById('registerConfirm');
        
        // Reset errors
        clearErrors(registerForm);
        
        // Name validation
        if (!name.value.trim()) {
            showError(name, 'Введите ФИО');
            isValid = false;
        }
        
        // Email validation
        if (!email.value.trim()) {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        // Phone validation
        if (!phone.value.trim()) {
            showError(phone, 'Введите телефон');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Введите корректный телефон');
            isValid = false;
        }
        
        // Password validation
        if (!password.value) {
            showError(password, 'Введите пароль');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, 'Пароль должен содержать не менее 6 символов');
            isValid = false;
        }
        
        // Confirm password validation
        if (!confirm.value) {
            showError(confirm, 'Подтвердите пароль');
            isValid = false;
        } else if (password.value !== confirm.value) {
            showError(confirm, 'Пароли не совпадают');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        input.classList.add('error');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearErrors(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorElement = input.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    function updateUIForLoggedInUser() {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn-outline" id="userAccount">
                        <i class="fas fa-user"></i> Личный кабинет
                    </button>
                    <button class="btn btn-outline" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i> Выйти
                    </button>
                </div>
            `;
            
            // Add logout functionality
            document.getElementById('logoutBtn').addEventListener('click', function() {
                // Reset UI to logged out state
                authButtons.innerHTML = `
                    <button class="btn btn-outline" id="loginBtn">Войти</button>
                    <button class="btn btn-primary" id="registerBtn">Регистрация</button>
                `;
                
                // Re-initialize auth buttons
                initAuth();
                
                if (typeof showNotification === 'function') {
                    showNotification('Вы вышли из системы', 'info');
                }
            });
        }
    }
}
function updateUIForLoggedInUser() {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <button class="btn btn-outline" id="userAccount">
                    <i class="fas fa-user"></i> Личный кабинет
                </button>
                <button class="btn btn-outline" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Выйти
                </button>
            </div>
        `;
        
        // Add logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            // Clear cart when logging out
            if (typeof cartItems !== 'undefined') {
                cartItems = [];
                if (typeof updateCartCount === 'function') {
                    updateCartCount(0);
                }
            }
            
            // Reset UI to logged out state
            authButtons.innerHTML = `
                <button class="btn btn-outline" id="loginBtn">Войти</button>
                <button class="btn btn-primary" id="registerBtn">Регистрация</button>
            `;
            
            // Re-initialize auth buttons
            initAuth();
            
            if (typeof showNotification === 'function') {
                showNotification('Вы вышли из системы', 'info');
            }
        });
        
        // Personal account button
        document.getElementById('userAccount').addEventListener('click', function() {
            showNotification('Личный кабинет в разработке', 'info');
        });
    }
}