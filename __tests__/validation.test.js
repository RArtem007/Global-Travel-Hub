/**
 * @jest-environment jsdom
 */
const {
    validateEmail,
    validatePassword,
    showFieldError,
    clearFieldError,
    clearAllErrors,
    validateLoginForm,
} = require('../JS/validation.exports');

describe('validateEmail', () => {
    it('звичайний gmail', () => expect(validateEmail('test@gmail.com')).toBe(true));
    it('корпоративний email', () => expect(validateEmail('user@company.org')).toBe(true));
    it('email з крапкою в імені', () => expect(validateEmail('first.last@domain.ua')).toBe(true));
    it('email з плюсом', () => expect(validateEmail('user+tag@mail.com')).toBe(true));
    it('субдомен', () => expect(validateEmail('admin@mail.travel.com')).toBe(true));
    it('без @', () => expect(validateEmail('testgmail.com')).toBe(false));
    it('без домену після @', () => expect(validateEmail('test@')).toBe(false));
    it('без крапки в домені', () => expect(validateEmail('test@domain')).toBe(false));
    it('порожній рядок', () => expect(validateEmail('')).toBe(false));
    it('пробіл у середині', () => expect(validateEmail('te st@gmail.com')).toBe(false));
    it('тільки @', () => expect(validateEmail('@')).toBe(false));
    it('пробіл замість email', () => expect(validateEmail('   ')).toBe(false));
});

describe('validatePassword', () => {
    it('рівно 6 символів — ок', () => expect(validatePassword('abc123')).toBe(null));
    it('більше 6 символів — ок', () => expect(validatePassword('securePassword!')).toBe(null));
    it('дуже довгий пароль — ок', () => expect(validatePassword('a'.repeat(100))).toBe(null));
    it('5 символів — помилка', () => expect(validatePassword('abc12')).toBe('Пароль мінімум 6 символів'));
    it('1 символ — помилка', () => expect(validatePassword('a')).toBe('Пароль мінімум 6 символів'));
    it('порожній рядок — помилка', () => expect(validatePassword('')).toBe('Пароль мінімум 6 символів'));
    it('6 пробілів — ок (довжина 6)', () => expect(validatePassword('      ')).toBe(null));
});

describe('showFieldError', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="email" type="email" />
            <input id="password" type="password" />
        `;
    });

    it('додає елемент помилки після поля', () => {
        showFieldError('email', 'Введіть email');
        expect(document.getElementById('email_error')).not.toBeNull();
    });
    it('текст містить переданий message', () => {
        showFieldError('email', 'Невірний формат email');
        expect(document.getElementById('email_error').textContent).toContain('Невірний формат email');
    });
    it('рамка поля стає червоною', () => {
        showFieldError('email', 'Помилка');
        expect(document.getElementById('email').style.borderColor).toBe('#e74c3c');
    });
    it('повторний виклик не дублює помилки', () => {
        showFieldError('email', 'Помилка 1');
        showFieldError('email', 'Помилка 2');
        expect(document.querySelectorAll('#email_error').length).toBe(1);
    });
    it('не падає якщо поле не існує', () => {
        expect(() => showFieldError('nonexistent', 'Помилка')).not.toThrow();
    });
});

describe('clearFieldError', () => {
    beforeEach(() => {
        document.body.innerHTML = `<input id="email" type="email" />`;
    });

    it('видаляє елемент помилки', () => {
        showFieldError('email', 'Помилка');
        clearFieldError('email');
        expect(document.getElementById('email_error')).toBeNull();
    });
    it('скидає колір рамки', () => {
        showFieldError('email', 'Помилка');
        clearFieldError('email');
        expect(document.getElementById('email').style.borderColor).toBe('#ccc');
    });
    it('не падає якщо помилки не було', () => {
        expect(() => clearFieldError('email')).not.toThrow();
    });
});

describe('clearAllErrors', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="email" type="email" />
            <input id="password" type="password" />
        `;
    });

    it('видаляє всі _error елементи', () => {
        showFieldError('email', 'Помилка email');
        showFieldError('password', 'Помилка пароля');
        clearAllErrors();
        expect(document.querySelector('[id$="_error"]')).toBeNull();
    });
    it('скидає рамки всіх полів', () => {
        showFieldError('email', 'Помилка');
        clearAllErrors();
        document.querySelectorAll('input').forEach(el => {
            expect(el.style.borderColor).toBe('#ccc');
        });
    });
});

describe('validateLoginForm', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="email" type="email" value="" />
            <input id="password" type="password" value="" />
        `;
    });

    function fill(email, password) {
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
    }

    it('валідний email і пароль при вході → true', () => {
        fill('user@gmail.com', 'pass123');
        expect(validateLoginForm(false)).toBe(true);
    });
    it('порожній email → false', () => {
        fill('', 'pass123');
        expect(validateLoginForm(false)).toBe(false);
    });
    it('невірний email → false', () => {
        fill('notanemail', 'pass123');
        expect(validateLoginForm(false)).toBe(false);
    });
    it('порожній пароль → false', () => {
        fill('user@gmail.com', '');
        expect(validateLoginForm(false)).toBe(false);
    });
    it('при вході короткий пароль → true (довжина не перевіряється)', () => {
        fill('user@gmail.com', 'abc');
        expect(validateLoginForm(false)).toBe(true);
    });
    it('обидва поля порожні → false', () => {
        fill('', '');
        expect(validateLoginForm(false)).toBe(false);
    });
    it('реєстрація — валідний email і довгий пароль → true', () => {
        fill('new@user.com', 'secure123');
        expect(validateLoginForm(true)).toBe(true);
    });
    it('реєстрація — короткий пароль → false', () => {
        fill('new@user.com', 'abc');
        expect(validateLoginForm(true)).toBe(false);
    });
    it('реєстрація — помилка під полем password', () => {
        fill('new@user.com', 'abc');
        validateLoginForm(true);
        expect(document.getElementById('password_error')).not.toBeNull();
    });
    it('реєстрація — помилка під полем email', () => {
        fill('bademail', 'secure123');
        validateLoginForm(true);
        expect(document.getElementById('email_error')).not.toBeNull();
    });
});
