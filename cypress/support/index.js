import './commands'

if (Cypress.env('MODE') === 'record') {
    import('@rckeller/cypress-unfetch')
}

Cypress.on('uncaught:exception', () => {
    return false
})
