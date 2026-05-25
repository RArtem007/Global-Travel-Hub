// Валідація email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Валідація пароля
function validatePassword(password) {
    if (password.length < 6) return 'Пароль мінімум 6 символів';
    return null;
}

// Показати помилку під полем
function showFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const old = document.getElementById(inputId + '_error');
    if (old) old.remove();
    input.style.borderColor = '#e74c3c';
    const err = document.createElement('div');
    err.id = inputId + '_error';
    err.textContent = '⚠ ' + message;
    input.after(err);
}

// Прибрати помилку з поля
function clearFieldError(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.style.borderColor = '#ccc';
    const err = document.getElementById(inputId + '_error');
    if (err) err.remove();
}

// Прибрати всі помилки
function clearAllErrors() {
    document.querySelectorAll('[id$="_error"]').forEach(el => el.remove());
    document.querySelectorAll('input').forEach(el => el.style.borderColor = '#ccc');
}

// Валідація форми логіну/реєстрації
function validateLoginForm(isRegister) {
    clearAllErrors();
    const email = document.getElementById('email')?.value.trim() || '';
    const password = document.getElementById('password')?.value || '';
    let valid = true;

    if (!email) {
        showFieldError('email', 'Введіть email');
        valid = false;
    } else if (!validateEmail(email)) {
        showFieldError('email', 'Невірний формат email');
        valid = false;
    }

    if (!password) {
        showFieldError('password', 'Введіть пароль');
        valid = false;
    } else if (isRegister) {
        const pwdErr = validatePassword(password);
        if (pwdErr) {
            showFieldError('password', pwdErr);
            valid = false;
        }
    }

    return valid;
}

module.exports = {
    validateEmail,
    validatePassword,
    showFieldError,
    clearFieldError,
    clearAllErrors,
    validateLoginForm,
};
