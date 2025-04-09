
const params = new URLSearchParams(window.location.search);
const lang = params.get('lang');


fetch(`/lang/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (translations[key]) {
            el.textContent = translations[key];
            }
        });
    });