/// <reference types="cypress" />

describe('Esperas...', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponível', () => {
        
        cy.get('#novoCampo')
            .should('not.exist')
        
        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#novoCampo')
            .should('exist')

        cy.get('#novoCampo')
            .type('Funciona')
    })

    it.only('Deve fazer retrys', () => {
        
        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .should('not.exist')

        cy.get('#novoCampo')
            //.should('not.exist') //Não podemos usar pois retorna o mesmo elemento, com isso dá erro
            .should('exist')
            .type('Funciona')
            

    })


})