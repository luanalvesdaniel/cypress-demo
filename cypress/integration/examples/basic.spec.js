/// <reference types="cypress" />

//const { describe } = require("mocha");

describe('Cypress basics', () => {
    
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        //cy.pause()

        cy.title().should('be.equal', 'Campo de Treinamento')
        
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        let syncTitle

        cy.title().then(title => { //ou should
            console.log(title)

            cy.get('#formNome')
                .type(title)

            syncTitle = title
        })

        cy.get('#formSobrenome')
            .then($el => {
                $el.val(syncTitle)
            })

        cy.get('#elementosForm\\:sugestoes')
            .then($el => {
                cy.wrap($el)
                    .type(syncTitle)
            })

    })
    
    it('Should find and interact with an elemente', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')

    })
})