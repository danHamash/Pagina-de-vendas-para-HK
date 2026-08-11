let currentTranslations = {};

// Apenas espanhol
const ctaLinks = {
  es: '#'
};

async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);

    if (!response.ok) {
      throw new Error(`Idioma ${lang} não encontrado`);
    }

    const translations = await response.json();
    currentTranslations = translations;

    // Traduz textos
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

    // Atualiza CTAs
    const ctas = ['hero-cta', 'buy-cta'];

    ctas.forEach(id => {
      const btn = document.getElementById(id);

      if (btn && ctaLinks.es) {
        btn.href = ctaLinks.es;
      }
    });

    // Define idioma da página
    document.documentElement.lang = 'es';

    // Salva sempre espanhol
    localStorage.setItem('lang', 'es');

  } catch (error) {
    console.error('Erro ao carregar idioma:', error);
  }
}

// Remove idioma salvo anteriormente
localStorage.removeItem('lang');

// Inicializa sempre em espanhol
loadLanguage('es');