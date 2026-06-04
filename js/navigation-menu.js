// Seleção dos links de navegação
const HOME_LINK = document.querySelector('[data-navigation-menu-link=home]');
const SHOWCASE_LINK = document.querySelector('[data-navigation-menu-link=showcase]');
const CONTACT_LINK = document.querySelector('[data-navigation-menu-link=contact]');

const { pathname } = window.location;

/**
 * Marks a link element as active by setting its data-state attribute.
 *
 * @param {HTMLElement} link - The link element to mark as active.
 */
function markAsActive(link) {
  if (link) {
    link.setAttribute('data-state', 'active');
  }
}

// CORREÇÃO: Verificação ajustada para aceitar os arquivos .html e o nome correto "contato"
if (pathname === '/' || pathname === '/index.html') {
    markAsActive(HOME_LINK);
} else if (pathname.includes('showcase')) {
    markAsActive(SHOWCASE_LINK);
} else if (pathname.includes('contato')) {
    markAsActive(CONTACT_LINK);
}

// SELEÇÃO DO MENU: Agora pegando tanto o fundo escuro quanto o conteúdo do menu
const sheetOverlay = document.querySelector('[data-slot=sheet-overlay]');
const sheetContent = document.querySelector('[data-slot=sheet-content]'); // <-- Adicionado

/**
 * Sets the sheet state.
 *
 * @param {'open' | 'closed'} state - The sheet state.
 */
function setSheetState(state) {
    // CORREÇÃO: Atualiza o estado de ambos os elementos para o CSS poder agir
    sheetOverlay?.setAttribute('data-state', state);
    sheetContent?.setAttribute('data-state', state); // <-- Adicionado
}

// Funções chamadas pelo 'onclick' do seu HTML
function setSheetStateToOpen() {
    console.log("Menu aberto");
    setSheetState('open');
}

function setSheetStateToClosed() {
    console.log("Menu fechado");
    setSheetState('closed');
}