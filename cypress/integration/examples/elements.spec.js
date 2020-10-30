/// <reference types="cypress" />

describe('Work with basic elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('body')
            .should('contain', 'Cuidado onde clica, muitas armadilhas...')
        cy.get('span')
            .should('contain', 'Cuidado onde clica, muitas armadilhas...')
        cy.get('.facilAchar')
            .should('contain', 'Cuidado onde clica, muitas armadilhas...')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {

        cy.get('[href="#"]')
            .click()
        cy.get('#resultado')
            .should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado')
        .should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado')
            .should('have.text', 'Voltou!')
    })
})
