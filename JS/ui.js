// ===== ui.js =====
// Підключи на всіх сторінках де є списки з Supabase:
// <script src="js/ui.js"></script>
 
// --- Показати стан завантаження ---
function showLoading(containerId, message) {
    message = message || 'Завантаження...';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 48px 20px;
            color: #aaa;
            font-size: 14px;
        ">
            <div style="
                width: 20px; height: 20px;
                border: 2px solid #ddd;
                border-top-color: #2980b9;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                flex-shrink: 0;
            "></div>
            ${message}
        </div>
        <style>
            @keyframes spin { to { transform: rotate(360deg); } }
        </style>
    `;
}
 
// --- Показати стан "порожньо" ---
function showEmpty(containerId, message) {
    message = message || 'Нічого не знайдено';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
        <div style="
            text-align: center;
            padding: 48px 20px;
            color: #bbb;
        ">
            <div style="font-size: 36px; margin-bottom: 12px;">🔍</div>
            <div style="font-size: 14px;">${message}</div>
        </div>
    `;
}
 
// --- Показати стан помилки ---
function showError(containerId, message) {
    message = message || 'Помилка завантаження. Спробуй ще раз.';
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
        <div style="
            text-align: center;
            padding: 48px 20px;
            color: #e74c3c;
        ">
            <div style="font-size: 36px; margin-bottom: 12px;">⚠️</div>
            <div style="font-size: 14px;">${message}</div>
            <button onclick="location.reload()" style="
                margin-top: 14px;
                background: none;
                border: 1px solid #e74c3c;
                color: #e74c3c;
                padding: 7px 18px;
                border-radius: 6px;
                font-size: 13px;
                cursor: pointer;
            ">Оновити сторінку</button>
        </div>
    `;
}
 