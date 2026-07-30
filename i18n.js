async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);

    if (!response.ok) {
      throw new Error(`Idioma ${lang} não encontrado`);
    }

    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;

      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

  } catch (error) {
    console.error('Erro ao carregar idioma:', error);
  }
}

const browserLang = navigator.language.startsWith('es')
  ? 'es'
  : navigator.language.startsWith('en')
  ? 'en'
  : 'pt';

const savedLang = localStorage.getItem('lang') || browserLang;
loadLanguage(savedLang);