const QUESTIONS = [
  {
    text: 'Selecione a banana',
    options: [
      { icon: '' },
      { icon: '' },
      { icon: '' },
      { icon: '' },
    ],
    correct: 3
  },
  {
    text: 'Selecione a uva',
    options: [
      { icon: '' },
      { icon: '' },
      { icon: '' },
      { icon: '' },
    ],
    correct: 3
  },
]

let question = 0
let selected = null

function start() {
  const meta = QUESTIONS[question]
  document.querySelector('.question-text').textContent = meta.text
}

/**
 * Selects an answer option in the quiz and updates the UI state
 *
 * @param {number} index - The index of the selected option.
 *
 * @returns {void}
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
function check() {
  if (!selected) {
    return
  }

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
