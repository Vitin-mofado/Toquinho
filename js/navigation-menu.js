const HOME_LINK = document.querySelector('[data-navigation-menu-link=home]')
const SHOWCASE_LINK = document.querySelector('[data-navigation-menu-link=showcase]')
const CONTACT_LINK = document.querySelector('[data-navigation-menu-link=contact]')

const { pathname } = window.location

/**
 * Marks a link element as active by setting its data-state attribute.
 *
 * @param {HTMLElement} link - The link element to mark as active.
 */
function markAsActive(link) {
  link.setAttribute('data-state', 'active')
}

switch (pathname) {
    case '/':
        markAsActive(HOME_LINK)
        break

    case '/showcase':
        markAsActive(SHOWCASE_LINK)
        break

    case '/contact':
        markAsActive(CONTACT_LINK)
        break
}

const sheetOverlay = document.querySelector('[data-slot=sheet-overlay]')

/**
 * Sets the sheet state.
 *
 * @param {'open' | 'closed'} state - The sheet state.
 */
function setSheetState(state) {
    sheetOverlay?.setAttribute('data-state', state)
}

function setSheetStateToOpen() {
    setSheetState('open')
}

function setSheetStateToClosed() {
    setSheetState('closed')
}
