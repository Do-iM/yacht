
export function setLang(lang) {
    fetch(`/lang/${lang}.json`)
        .then((res) => res.json())
        .then((translations) => {
            document.querySelectorAll("[data-i18n]").forEach((el) => {
                const text = translations[el.getAttribute("data-i18n")];
                if (el instanceof HTMLInputElement) {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            });
        });
}
