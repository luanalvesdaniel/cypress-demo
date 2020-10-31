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

    it('Deve fazer retrys', () => {
        
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

    it('Uso do find', () => {
        //cy.get('#buttonList')
        //    .click()

        cy.get('#buttonListDOM')
            .click()

    //cuidado com o que busca, as vezes usa-se o find as vezes não
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        /*
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 2')
        */
        
        cy.get('#lista li span')
            .should('contain', 'Item 2')
        
    })

})