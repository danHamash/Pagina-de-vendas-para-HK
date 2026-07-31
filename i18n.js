let currentTranslations = {};

const ctaLinks = {
  pt: 'https://pokemondb.net/pokedex/pikachu',
  es: 'https://pokemondb.net/pokedex/charmander',
  en: 'https://pokemondb.net/pokedex/bulbasaur'
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

      // 👇 COLE ESTE BLOCO AQUI
const ctas = ['hero-cta', 'buy-cta'];

ctas.forEach(id => {
  const btn = document.getElementById(id);

  if (btn && ctaLinks[lang]) {
    btn.href = ctaLinks[lang];
  }
});

    // Atualiza idioma da página
    document.documentElement.lang = lang;

    // Salva escolha do usuário
    localStorage.setItem('lang', lang);

  } catch (error) {
    console.error('Erro ao carregar idioma:', error);
  }
}

// Botões de idioma
document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    loadLanguage(button.dataset.lang);

    // Fecha o acordeão no mobile
    const details = button.closest('.lang-switcher');
    if (details) details.removeAttribute('open');
  });
});

// Idioma do navegador
const browserLang = navigator.language.startsWith('es')
  ? 'es'
  : navigator.language.startsWith('en')
  ? 'en'
  : 'pt';

// Idioma salvo ou detectado
const savedLang = localStorage.getItem('lang') || browserLang;

// Inicializa o site
loadLanguage(savedLang);