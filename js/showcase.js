const QUESTIONS = [
  {
    category: 'Frutas',
    text: 'Selecione a banana',
    options: [
      { icon: '🍎' }, // Índice 0
      { icon: '🍌' }, // Índice 1 (Correto)
      { icon: '🍇' }, // Índice 2
      { icon: '🍓' }, // Índice 3
    ],
    correct: 1
  },
  {
    category: 'Cores',
    text: 'Selecione a cor verde',
    options: [
      { icon: '🔴' },
      { icon: '🟡' },
      { icon: '🔵' },
      { icon: '🟢' }, // Índice 3 (Correto)
    ],
    correct: 3
  },
  {
    category: 'numeros',
    text: 'Selecione o número 3',
    options: [
      { icon: '1️⃣' },
      { icon: '2️⃣' },
      { icon: '3️⃣' }, // Índice 2 (Correto)
      { icon: '4️⃣' },
    ],
    correct: 2
  },
  {
    category: 'estações',
    text: 'Qual símbolo representa o Inverno?',
    options: [
      { icon: '☀️' },
      { icon: '🍁' },
      { icon: '🌸' },
      { icon: '❄️' }, // Índice 3 (Correto)
    ],
    correct: 3
  }
]

const main = document.querySelector('main')
const footer = document.querySelector('footer')

let question = 0
let selected = null
let checked = false 

// Configuração da música de fundo (suave para TEA) - Caminho corrigido com ./
const bgMusic = new Audio('./assets/sounds/Deltarune.mp3'); 
bgMusic.loop = true;
bgMusic.volume = 0.80; // Volume bem baixinho para não dar sobrecarga sensorial


function start() {
  const meta = QUESTIONS[question]

  // Define o texto principal do enunciado
  document.querySelector('.question-text').textContent = meta.text

  checked = false
  selected = null

  // Atualiza a barra de progresso baseada na pergunta atual
  updateProgressBar();
  
  // Renderiza os dados nas caixas preservando a estrutura
  renderOptions(meta.options)

  // Reseta o footer para o estado padrão de seleção com o botão "Checar"
  footer.setAttribute('data-state', 'normal');
  footer.innerHTML = `<button class="btn-check" onclick="check()">Checar</button>`;
}

// Atualiza a barra de progresso (Muda a largura da barra de dentro)
function updateProgressBar() {
  const progressBarInner = document.querySelector('.progress-bar-inner')
  if (progressBarInner) {
    const progress = (question / QUESTIONS.length) * 100
    progressBarInner.style.width = `${progress}%`
  }
}

function renderOptions(options) {
  const optionElements = document.querySelectorAll('.question-option')

  optionElements.forEach((optionElement, index) => {
    // Redefine dinamicamente os cliques garantindo o índice puro (0, 1, 2, 3)
    optionElement.onclick = () => {
      // CORRIGIDO: Removido o ponto e vírgula que travava a música e ajustado o teste de reprodução
      if (bgMusic.paused) { 
        bgMusic.play().catch((err) => console.log("Aguardando interação para tocar áudio:", err));
      }
      select(index);
    }
    
    // Injeta o emoji apenas dentro do container interno do ícone sem destruir o botão
    const iconContainer = optionElement.querySelector('.question-option-icon')
    if (iconContainer) {
      iconContainer.textContent = options[index].icon
    }
    
    // Reseta estados visuais antigos
    optionElement.removeAttribute('data-state')
  });
}

function select(index) {
  // Impede seleção se a pergunta já foi respondida/verificada
  if (checked) return

  selected = index

  const options = document.querySelectorAll('.question-option')

  // Aplica o atributo selecionado apenas ao botão correspondente
  options.forEach((elm, idx) => {
    if (idx === index) {
      elm.setAttribute('data-state', 'selected')
    } else {
      elm.removeAttribute('data-state')
    }
  })
}

function check() {  
  // Evita checagem se nada foi selecionado ou se já checou
  if (selected === null || checked) return
  
  checked = true

  const meta = QUESTIONS[question]
  const options = document.querySelectorAll('.question-option')

  if (selected === meta.correct) {
    // Cenário de Acerto: Altera o rodapé e pinta o card de verde
    footer.setAttribute('data-state', 'success')
    options[selected].setAttribute('data-state', 'correct')
    
    footer.innerHTML = `
      <div class="feedback-container">
        <p class="feedback-text text-success">✨ Muito bem! Você acertou!</p>
        <button class="btn-continue" onclick="_continue()">Continuar</button>
      </div>
    `
  } else {
    // Cenário de Erro: Pinta o clicado de vermelho E o correto de verde ao mesmo tempo
    footer.setAttribute('data-state', 'error')
    options[selected].setAttribute('data-state', 'wrong')
    options[meta.correct].setAttribute('data-state', 'correct')
    
    footer.innerHTML = `
      <div class="feedback-container">
        <p class="feedback-text text-error">❌ Quase lá! Vamos tentar a próxima?</p>
        <button class="btn-continue" onclick="_continue()">Continuar</button>
      </div>
    `
  }
}

function _continue() {
  // Fim do Quiz
  if (question === QUESTIONS.length - 1) {
    // Preenche 100% da barra no final
    const progressBarInner = document.querySelector('.progress-bar-inner')
    if (progressBarInner) progressBarInner.style.width = '100%'

    main.setAttribute('data-state', 'finished')
    footer.setAttribute('data-state', 'finished')
    
    // Mensagem de fim de jogo com botão para voltar para a Home
    footer.innerHTML = `
      <div class="feedback-container">
        <p class="feedback-text text-success">🎉 Parabéns! Você concluiu todos os níveis!</p>
        <button class="btn-check" onclick="window.location.href='/'">Voltar ao Início</button>
      </div>
    `
    return
  }

  // Animação de Saída suave (Fade-out)
  main.style.transition = 'opacity 0.25s ease'
  main.style.opacity = '0'

  setTimeout(() => {
    question++
    
    // Executa as limpezas de estado e troca as perguntas
    start()

    // Animação de Entrada suave (Fade-in)
    main.style.opacity = '1'
  }, 250)
}

// Lógica para clicar no botão "X" e voltar para a Home do Toquinho
const closeButton = document.querySelector('.lucide-x');
if (closeButton) {
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = () => {
    bgMusic.pause(); // Pausa a música antes de sair
    window.location.href = '/'; // Caminho da sua página inicial
  };
}

// Inicialização segura
main.style.opacity = '1'
start()