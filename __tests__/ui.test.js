/**
 * @jest-environment jsdom
 */
const { showLoading, showEmpty, showError } = require('../JS/ui.exports');

function makeContainer(id = 'box') {
    document.body.innerHTML = `<div id="${id}"></div>`;
    return document.getElementById(id);
}

// ─────────────────────────────────────────────
//  showLoading
// ─────────────────────────────────────────────
describe('showLoading', () => {
    it('вставляє вміст у контейнер', () => {
        const el = makeContainer();
        showLoading('box');
        expect(el.innerHTML).not.toBe('');
    });
    it('показує дефолтний текст "Завантаження..."', () => {
        makeContainer();
        showLoading('box');
        expect(document.getElementById('box').textContent).toContain('Завантаження...');
    });
    it('показує кастомний текст', () => {
        makeContainer();
        showLoading('box', 'Зачекайте...');
        expect(document.getElementById('box').textContent).toContain('Зачекайте...');
    });
    it('не падає якщо контейнер не існує', () => {
        expect(() => showLoading('nonexistent')).not.toThrow();
    });
    it('перезаписує старий вміст', () => {
        makeContainer();
        document.getElementById('box').innerHTML = '<p>старий вміст</p>';
        showLoading('box');
        expect(document.getElementById('box').querySelector('p')).toBeNull();
    });
});

// ─────────────────────────────────────────────
//  showEmpty
// ─────────────────────────────────────────────
describe('showEmpty', () => {
    it('вставляє вміст у контейнер', () => {
        const el = makeContainer();
        showEmpty('box');
        expect(el.innerHTML).not.toBe('');
    });
    it('показує дефолтний текст "Нічого не знайдено"', () => {
        makeContainer();
        showEmpty('box');
        expect(document.getElementById('box').textContent).toContain('Нічого не знайдено');
    });
    it('показує кастомний текст', () => {
        makeContainer();
        showEmpty('box', 'Турів не знайдено');
        expect(document.getElementById('box').textContent).toContain('Турів не знайдено');
    });
    it('не падає якщо контейнер не існує', () => {
        expect(() => showEmpty('nonexistent')).not.toThrow();
    });
});

// ─────────────────────────────────────────────
//  showError
// ─────────────────────────────────────────────
describe('showError (ui)', () => {
    it('вставляє вміст у контейнер', () => {
        const el = makeContainer();
        showError('box');
        expect(el.innerHTML).not.toBe('');
    });
    it('показує дефолтний текст про помилку', () => {
        makeContainer();
        showError('box');
        expect(document.getElementById('box').textContent).toContain('Помилка');
    });
    it('показує кастомний текст', () => {
        makeContainer();
        showError('box', 'Сервер недоступний');
        expect(document.getElementById('box').textContent).toContain('Сервер недоступний');
    });
    it('не падає якщо контейнер не існує', () => {
        expect(() => showError('nonexistent')).not.toThrow();
    });
    it('перезаписує попередній вміст', () => {
        makeContainer();
        showLoading('box');
        showError('box', 'Щось пішло не так');
        expect(document.getElementById('box').textContent).toContain('Щось пішло не так');
        expect(document.getElementById('box').textContent).not.toContain('Завантаження');
    });
});
