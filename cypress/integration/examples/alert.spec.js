/// <reference types="cypress" />

describe('Work with alerts', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        
        cy.get('#alert')
            .click()
            
        //trabalhando com alert
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })

    })

})