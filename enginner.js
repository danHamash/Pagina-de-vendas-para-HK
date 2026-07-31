document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click',()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});

let compradores = [];

async function carregarCompradores() {
  try {
    const resp = await fetch('compradores.json');
    if (!resp.ok) throw new Error('Falha ao carregar compradores.json');
    compradores = await resp.json();
  } catch (err) {
    console.error('Erro ao carregar compradores:', err);
    compradores = []; // fallback vazio, popup não dispara se der erro
  }
}

const popup = document.getElementById('popup-compra');
const nomeEl = document.getElementById('popup-nome');
const textoEl = document.getElementById('popup-texto');

function mostrarPopup() {
  if (!compradores.length) return; // ainda não carregou ou deu erro

  const pessoa = compradores[Math.floor(Math.random() * compradores.length)];

  nomeEl.textContent = pessoa.nome;

  // pega a tradução atual
  const template =
    currentTranslations.popup_purchase ||
    'de {cidade} acabou de comprar este produto';

  textoEl.textContent = template.replace('{cidade}', pessoa.cidade);

  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 4000);
}

// carrega o JSON e só então inicia os popups
carregarCompradores().then(() => {
  // primeiro popup após 4s
  setTimeout(mostrarPopup, 4000);
  // repete a cada 10s
  setInterval(mostrarPopup, 10000);
});
