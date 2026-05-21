import { describe, it, expect } from 'vitest';

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    if (password.length < 6) return 'Пароль мінімум 6 символів';
    return null;
}

// --- Тести email ---
describe('validateEmail', () => {
    it('правильний email', () => {
        expect(validateEmail('test@gmail.com')).toBe(true);
    });

    it('без @', () => {
        expect(validateEmail('testgmail.com')).toBe(false);
    });

    it('порожній рядок', () => {
        expect(validateEmail('')).toBe(false);
    });
});

// --- Тести пароля ---
describe('validatePassword', () => {
    it('пароль достатньо довгий', () => {
        expect(validatePassword('abc123')).toBe(null);
    });

    it('пароль занадто короткий', () => {
        expect(validatePassword('abc')).toBe('Пароль мінімум 6 символів');
    });
});