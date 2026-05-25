function showLoading(containerId, message) {
    message = message || 'Завантаження...';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `<div class="loading-spinner">${message}</div>`;
}

function showEmpty(containerId, message) {
    message = message || 'Нічого не знайдено';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `<div class="empty-state">${message}</div>`;
}

function showError(containerId, message) {
    message = message || 'Помилка завантаження. Спробуй ще раз.';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `<div class="error-state">${message}</div>`;
}

module.exports = { showLoading, showEmpty, showError };
