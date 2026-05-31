const QUESTIONS = [
  {
    text: 'Selecione a banana',
    options: [
      { icon: '🍎' },
      { icon: '🍌' },
      { icon: '🍇' },
      { icon: '🍓' },
    ],
    correct: 3
  },
  {
    text: 'Selecione a uva',
    options: [
      { icon: '🍎' },
      { icon: '🍌' },
      { icon: '🍇' },
      { icon: '🍓' },
    ],
    correct: 3
  },
  
]

let question = 0
let selected = null
let hasChecked = false

function start() {
  const meta = QUESTIONS[question]

  document.querySelector('.question-text').textContent = meta.text

  let index = 0
  
  while (index <= 3) {
    const option = document.querySelector(`.question-option:nth-child(${index + 1})`  )
    const content = meta.options[index].icon

    option.innerHTML = content    

    index += 1
  }  hasChecked = false
  renderOptions(meta.options)
}

// renderizar ou mapeia dinâmicamente as opções de resposta

function renderOptions(options) {
  const optionElements = document.querySelectorAll('.question-option')

  optionElements.forEach((optionElement, index) => {
    optionElement.onclick = () => select(index + 1)
    optionElement.textContent = options[index].icon
  })

/**
 * @returns {void}
 * Selects an answer option in the quiz and updates the UI state
 *
 * @param {number} index - The index of the selected option.
 *
 *
 * @example
 * select(2)
 */
function select(index) {
  // TODO: set `data-state="selected"` for the given option
}

/**
 * Checks whether the currently selected option is correct and updates
 * the UI state to either success or error.
 *
 * If no option is currently selected, the function does nothing.
 * 
 * @returns {void}
 *
 * @example
 * select(3)
 * check()
 */



  const footer = document.querySelector('footer')

  const meta = QUESTIONS[question]

  if (selected === meta.correct) {
    footer.setAttribute('data-state', 'success')
  } else {
    footer.setAttribute('data-state', 'error')

  }

  // TODO: compare `selected` with correct option and update UI state
}

function _continue() {
  if (question === QUESTIONS.length  -1) {
    document.querySelector('main'). setAttribute('data-state', 'finished')
    document.querySelector('footer'). setAttribute('data-state', 'finished')
    
    return
  }

  question++
  selected = null

  const options = document.querySelectorAll('.question-option[data-state=selected]')

  for (const option of options) {
    option.removeAttribute('data-state')
  }

  const footer = document.querySelector('footer')

  footer.setAttribute('data-state', 'normal')
  document.querySelector('.question-text').textContent = QUESTIONS[question].text
}

start()
