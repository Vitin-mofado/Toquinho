const QUESTIONS = [
  {
    text: 'Selecione a banana',
    options: [
      { icon: '🍎' }, // Índice 0
      { icon: '🍌' }, // Índice 1 (Correto)
      { icon: '🍇' }, // Índice 2
      { icon: '🍓' }, // Índice 3
    ],
    correct: 1 // Ajustado para o índice exato da banana
  },
  {
    text: 'Selecione a uva',
    options: [
      { icon: '🍎' },
      { icon: '🍌' },
      { icon: '🍇' }, // Índice 2 (Correto)
      { icon: '🍓' },
    ],
    correct: 2 // Ajustado para o índice exato da uva
  },
]

const main = document.querySelector('main')
const footer = document.querySelector('footer')
const finished = document.querySelector('finished')


let question = 0
let selected = null
let checked = false // Unificado o nome da variável de controle

function start() {
  const meta = QUESTIONS[question]

  // Define o texto principal do enunciado
  document.querySelector('.question-text').textContent = meta.text

  checked = false
  selected = null
  
  // Renderiza os dados nas caixas preservando a estrutura
  renderOptions(meta.options)
}

function renderOptions(options) {
  const optionElements = document.querySelectorAll('.question-option')

  optionElements.forEach((optionElement, index) => {
    // Redefine dinamicamente os cliques garantindo o índice puro (0, 1, 2, 3)
    optionElement.onclick = () => select(index)
    
    // Injeta o emoji apenas dentro do container interno do ícone
    const iconContainer = optionElement.querySelector('.question-option-icon')
    if (iconContainer) {
      iconContainer.textContent = options[index].icon
    }
    
    // Reseta estados visuais antigos
    optionElement.removeAttribute('data-state')
  })
}

/** */
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
  const btnCheck = document.querySelector('.btn-check')
  const btnContinue = document.querySelector('.btn-continue')

  if (selected === meta.correct) {
    footer.setAttribute('data-state', 'success')
    options[selected].setAttribute('data-state', 'correct')
  } else {
    footer.setAttribute('data-state', 'error')
    options[selected].setAttribute('data-state', 'wrong')
    
    // Mostra visualmente onde estava a resposta correta
    options[meta.correct].setAttribute('data-state', 'correct')
  }

  // Alterna a exibição dos botões no footer para prosseguir
  if (btnCheck && btnContinue) {
    btnCheck.style.display = 'none'
    btnContinue.style.display = 'block'
  }
}

function _continue() {
  // Fim do Quiz
  if (question === QUESTIONS.length - 1) {
    main.setAttribute('data-state', 'finished')
    footer.setAttribute('data-state', 'finished')
    return
  }

  // Animação de Saída suave (Fade-out)
  main.style.transition = 'opacity 0.25s ease'
  main.style.opacity = '0'

  setTimeout(() => {
    question++
    
    // Executa as limpezas de estado e troca as perguntas
    start()
    
    // Reseta o comportamento dos botões do rodapé
    const btnCheck = document.querySelector('.btn-check')
    const btnContinue = document.querySelector('.btn-continue')
    if (btnCheck && btnContinue) {
      btnCheck.style.display = 'block'
      btnContinue.style.display = 'none'
    }

    footer.setAttribute('data-state', 'normal')

    // Animação de Entrada suave (Fade-in)
    main.style.opacity = '1'
  }, 250)
}

// Inicialização segura
main.style.opacity = '1'
start()