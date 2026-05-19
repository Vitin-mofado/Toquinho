const HOME_LINK = document.querySelector('[data-navigation-menu-link=home]')
const DEMO_LINK = document.querySelector('[data-navigation-menu-link=demonstration]')
const CONTACT_LINK = document.querySelector('[data-navigation-menu-link=contact]')

const { pathname } = window.location

function markAsActive(link) {
  link.setAttribute('data-state', 'active')
}

switch (pathname) {
    case '/':
        markAsActive(HOME_LINK)
        break

    case '/demonstration':
        markAsActive(DEMO_LINK)
        break

    case '/contact':
        markAsActive(CONTACT_LINK)
        break
} 
