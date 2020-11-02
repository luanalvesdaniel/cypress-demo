/// <reference types="cypress" />

describe('Dinamic tests', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Voltando ao passado', () => {

        cy.get('#buttonNow')
            .click()

        cy.get('#resultado > span')
            .should('contain', '02/11/2020')

        const dt = new Date(2012, 2, 10 ,15, 23, 50)
        cy.clock(dt.getTime())

        cy.get('#buttonNow')
            .click()

        cy.get('#resultado > span')
            .should('contain', '10/03/2012')

    })

    it('Vai para o futuro', () => {

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 15000)

    })

})