/**
 * @jest-environment jsdom
 */
const { getActivePage, highlightActiveLink, getAuthLabel } = require('../JS/app.exports');

// ─────────────────────────────────────────────
//  getActivePage — визначення поточної сторінки
// ─────────────────────────────────────────────
describe('getActivePage', () => {
    it('index.html → index.html', () => {
        expect(getActivePage('/Global-Travel-Hub/index.html')).toBe('index.html');
    });
    it('tours.html → tours.html', () => {
        expect(getActivePage('/Global-Travel-Hub/tours.html')).toBe('tours.html');
    });
    it('contacts.html → contacts.html', () => {
        expect(getActivePage('/contacts.html')).toBe('contacts.html');
    });
    it('b.html → b.html', () => {
        expect(getActivePage('/b.html')).toBe('b.html');
    });
    it('admin.html → admin.html', () => {
        expect(getActivePage('/admin.html')).toBe('admin.html');
    });

    // GitHub Pages — порожній pop після слешу
    it('порожній рядок (корінь) → index.html', () => {
        expect(getActivePage('/Global-Travel-Hub/')).toBe('index.html');
    });
    it('тільки слеш → index.html', () => {
        expect(getActivePage('/')).toBe('index.html');
    });
    it('шлях без розширення → index.html', () => {
        expect(getActivePage('/Global-Travel-Hub')).toBe('index.html');
    });

    // Регістр
    it('великі літери → нижній регістр', () => {
        expect(getActivePage('/Tours.HTML')).toBe('tours.html');
    });
});

// ─────────────────────────────────────────────
//  highlightActiveLink — підсвітка nav-посилань
// ─────────────────────────────────────────────
describe('highlightActiveLink', () => {
    function makeLinks(hrefs) {
        document.body.innerHTML = hrefs
            .map(h => `<a href="${h}">${h}</a>`)
            .join('');
        return Array.from(document.querySelectorAll('a'));
    }

    it('додає клас active до відповідного посилання', () => {
        const links = makeLinks(['index.html', 'tours.html', 'contacts.html']);
        highlightActiveLink(links, 'tours.html');
        expect(links[1].classList.contains('active')).toBe(true);
    });

    it('не додає active до решти посилань', () => {
        const links = makeLinks(['index.html', 'tours.html', 'contacts.html']);
        highlightActiveLink(links, 'tours.html');
        expect(links[0].classList.contains('active')).toBe(false);
        expect(links[2].classList.contains('active')).toBe(false);
    });

    it('знімає попередній active перед новим', () => {
        const links = makeLinks(['index.html', 'tours.html']);
        links[0].classList.add('active');          // вручну ставимо
        highlightActiveLink(links, 'tours.html');  // переходимо на tours
        expect(links[0].classList.contains('active')).toBe(false);
        expect(links[1].classList.contains('active')).toBe(true);
    });

    it('нічого не активується якщо сторінки немає в nav', () => {
        const links = makeLinks(['index.html', 'tours.html']);
        highlightActiveLink(links, 'login.html');
        links.forEach(l => expect(l.classList.contains('active')).toBe(false));
    });

    it('посилання з повним шляхом — береться тільки ім\'я файлу', () => {
        const links = makeLinks(['/Global-Travel-Hub/index.html', 'tours.html']);
        highlightActiveLink(links, 'index.html');
        expect(links[0].classList.contains('active')).toBe(true);
    });

    it('працює з порожнім масивом посилань', () => {
        expect(() => highlightActiveLink([], 'index.html')).not.toThrow();
    });
});

// ─────────────────────────────────────────────
//  getAuthLabel — текст кнопки авторизації
// ─────────────────────────────────────────────
describe('getAuthLabel', () => {
    it('звичайний користувач → 👤 + ім\'я', () => {
        expect(getAuthLabel('john@gmail.com', false)).toBe('👤 john@gmail.com');
    });
    it('адмін → 👑 + ім\'я', () => {
        expect(getAuthLabel('admin@travel.com', true)).toBe('👑 admin@travel.com');
    });
    it('немає користувача → null', () => {
        expect(getAuthLabel(null, false)).toBeNull();
    });
    it('порожній рядок → null', () => {
        expect(getAuthLabel('', false)).toBeNull();
    });
    it('isAdmin=false але user є → звичайна іконка', () => {
        expect(getAuthLabel('user@ua.com', false)).toContain('👤');
    });
    it('isAdmin=true → іконка корони', () => {
        expect(getAuthLabel('admin@ua.com', true)).toContain('👑');
    });
});
