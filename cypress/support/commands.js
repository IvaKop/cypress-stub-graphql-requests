import { responseStub } from './utils'

Cypress.Commands.add('start', (fixtureObject, operations) => {
    if (Cypress.env('MODE') === 'record') {
        cy.server({
            onResponse: response => {
                const operationName = response.request.body.operationName

                fixtureObject[operationName] = fixtureObject[operationName]
                    ? [...fixtureObject[operationName], response.response.body]
                    : [response.response.body]
            },
        })
        cy.route({
            method: 'POST',
            url: '*',
        }).as('graphql')

        cy.visitRoute(`/`)
    } else if (Cypress.env('MODE') === 'replay') {
        cy.visitRoute('/', operations)
    }
})

Cypress.Commands.add('visitRoute', (url, operations = {}) => {
    const operationIndices = {}
    const serverStub = (_, req) => {
        const { operationName } = JSON.parse(req.body)

        if (operationIndices[operationName] !== undefined) {
            operationIndices[operationName] += 1
        } else {
            operationIndices[operationName] = 0
        }

        const operationIndex = operationIndices[operationName]

        const resultStub = operations[operationName][operationIndex]

        if (resultStub) {
            return Promise.resolve(responseStub(resultStub))
        } else {
            throw new Error('Unhandled fetch request that needs to be stubbed.')
        }
    }

    const visitOptions =
        Cypress.env('MODE') === 'replay'
            ? {
                  onBeforeLoad: win => {
                      cy.stub(win, 'fetch')
                          .callsFake(serverStub)
                          .as('fetch stub')
                  },
              }
            : {}

    cy.visit(url, visitOptions)
})

Cypress.Commands.add('waitForResponse', alias => {
    if (Cypress.env('MODE') === 'record') {
        cy.wait(alias)
    }
})

Cypress.Commands.add('recordFixtures', (path, data) => {
    if (Cypress.env('MODE') === 'record') {
        cy.writeFile(path, data)
    }
})

Cypress.Commands.add('loadFixtures', (path, callback) => {
    if (Cypress.env('MODE') === 'replay') {
        cy.readFile(path).then(data => callback(data))
    }
})
