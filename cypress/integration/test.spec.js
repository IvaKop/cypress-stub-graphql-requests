let requests = {}
const operations = {}
const path = './cypress/fixtures/test.json'

before(() => {
    cy.loadFixtures(path, data => (requests = data))
})

after(() => {
    cy.recordFixtures(path, operations)
})

it('tests mutations', () => {
    cy.start(operations, requests)
    cy.waitForResponse('@graphql') // wait for query
    cy.get('[data-cy=post]').should('have.length', 25)

    // // Test update post mutation
    cy.get('[data-cy=post-title]').first().click().type(' 2')
    cy.get('[data-cy=post]').first().click(0, 0) // Click away to blur editable title
    cy.waitForResponse('@graphql') // wait for mutation
    cy.waitForResponse('@graphql') // wait for refetch
    cy.get('[data-cy=post-title]')
        .first()
        .should('have.text', 'A day on the beach 2')

    // Test delete mutation
    cy.get('[data-cy=post-button]').first().click()
    cy.waitForResponse('@graphql') // wait for mutation
    cy.waitForResponse('@graphql') // wait for refetch
    cy.get('[data-cy=post-title]')
        .first()
        .should(
            'have.text',
            'In his own words: "The cows could be said to resemble boundless nectarines!',
        )
})
