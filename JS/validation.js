// ===== validation.js =====
// Підключи на сторінках де є форми:
// <script src="js/validation.js"></script>
 
// --- Показати помилку під полем ---
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
 
    // Видаляємо старий елемент помилки якщо є
    const old = document.getElementById(inputId + '_error');
    if (old) old.remove();
 
    input.style.borderColor = '#e74c3c';
 
    const err = document.createElement('div');
    err.id = inputId + '_error';
    err.style.cssText = 'color:#e74c3c; font-size:12px; margin-top:-10px; margin-bottom:10px;';
    err.textContent = '⚠ ' + message;
    input.after(err);
}
 
// --- Прибрати помилку з поля ---
function clearError(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.style.borderColor = '#ccc';
 
    const err = document.getElementById(inputId + '_error');
    if (err) err.remove();
}
 
// --- Прибрати всі помилки ---
function clearAllErrors() {
    document.querySelectorAll('[id$="_error"]').forEach(el => el.remove());
    document.querySelectorAll('input').forEach(el => el.style.borderColor = '#ccc');
}
 
// --- Валідація email ---
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
 
// --- Валідація пароля ---
function validatePassword(password) {
    if (password.length < 6) return 'Пароль мінімум 6 символів';
    return null;
}
 
// --- Валідація форми логіну/реєстрації ---
// Повертає true якщо все ок, false якщо є помилки
function validateLoginForm(isRegister) {
    clearAllErrors();
 
    const email = document.getElementById('email')?.value.trim() || '';
    const password = document.getElementById('password')?.value || '';
    let valid = true;
 
    if (!email) {
        showError('email', 'Введіть email');
        valid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Невірний формат email');
        valid = false;
    }
 
    if (!password) {
        showError('password', 'Введіть пароль');
        valid = false;
    } else if (isRegister) {
        const pwdErr = validatePassword(password);
        if (pwdErr) {
            showError('password', pwdErr);
            valid = false;
        }
    }
 
    return valid;
}
 
// --- Живе очищення помилки при вводі ---
document.addEventListener('DOMContentLoaded', function () {
    ['email', 'password'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => clearError(id));
    });
});