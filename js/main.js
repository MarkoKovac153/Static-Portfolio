// Mobile menu, project filters, active nav link, footer year.

const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');

function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('open', open);
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

// Any link to a section opens that section's dropdown before scrolling to it
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    const fold = a && document.querySelector(a.getAttribute('href') + ' > .fold');
    if (fold) fold.open = true;
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Project filters
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.grid .card');

chips.forEach((chip) => {
    chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        chips.forEach((c) => {
            const on = c === chip;
            c.classList.toggle('is-active', on);
            c.setAttribute('aria-pressed', String(on));
        });
        cards.forEach((card) => {
            card.hidden = filter !== 'all' && !card.dataset.tags.split(' ').includes(filter);
        });
    });
});

// Highlight the nav link of the section in view
const navLinks = [...document.querySelectorAll('.nav-links a')];
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
            a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();

// Colour theme swatches
const swatches = document.querySelectorAll('.swatch');
function applyTheme(t) {
    if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
    swatches.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.theme === t)));
}
let savedTheme = '';
try { savedTheme = localStorage.getItem('theme') || ''; } catch {}
applyTheme(document.querySelector(`.swatch[data-theme="${savedTheme}"]`) ? savedTheme : '');
swatches.forEach((b) => b.addEventListener('click', () => {
    applyTheme(b.dataset.theme);
    try { localStorage.setItem('theme', b.dataset.theme); } catch {}
}));
