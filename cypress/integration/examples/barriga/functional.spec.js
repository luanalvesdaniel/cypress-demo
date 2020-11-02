/// <reference types="cypress" />

describe('Deve testar a nivel funcional', () => {

    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('luan@luan')
        cy.get(':nth-child(2) > .form-control').type('luan')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('...', () => {



    })

})
