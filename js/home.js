// Configuração da música de fundo para a Home
const bgMusicHome = new Audio('./assets/sounds/Deltarune.mp3');
bgMusicHome.loop = true;
bgMusicHome.volume = 0.80; // Usando a configuração de volume testada por vocês

// Inicia a música de forma segura no primeiro clique da página para evitar o bloqueio do navegador
document.addEventListener('click', () => {
  if (bgMusicHome.paused) {
    bgMusicHome.play().catch((err) => console.log("Aguardando interação para áudio:", err));
  }
}, { once: true }); // Executa apenas uma vez no primeiro clique