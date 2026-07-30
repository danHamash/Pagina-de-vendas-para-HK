async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);

    if (!response.ok) {
      throw new Error(`Idioma ${lang} não encontrado`);
    }

    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(element => {
  const key = element.dataset.i18n;

  if (!translations[key]) return;

  // Elementos que contêm HTML
  const htmlKeys = ['hero_title', 'brand'];

  if (htmlKeys.includes(key)) {
    element.innerHTML = translations[key];
  } else {
    element.textContent = translations[key];
  }
});

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

  } catch (error) {
    console.error('Erro ao carregar idioma:', error);
  }
}

/* clique nas bandeiras */
document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    loadLanguage(button.dataset.lang);
  });
});

/* idioma do navegador */
const browserLang = navigator.language.startsWith('es')
  ? 'es'
  : navigator.language.startsWith('en')
  ? 'en'
  : 'pt';

/* idioma salvo ou navegador */
const savedLang = localStorage.getItem('lang') || browserLang;

/* inicia o site no idioma correto */
loadLanguage(savedLang);