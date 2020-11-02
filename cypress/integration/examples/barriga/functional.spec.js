/// <reference types="cypress" />

describe('Deve testar a nivel funcional', () => {

    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('luan@luan')
        cy.get(':nth-child(2) > .form-control').type('luan')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Deve criar a conta', () => {

        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type("Conta nova2")
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')

    })

    it('Deve alterar a conta', () => {

        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()

        cy.xpath("//table//td[contains(.,'Conta nova')]/..//i[@class='far fa-edit']").click()

        cy.get('[data-test=nome]')
            .clear()
            .type('Conta alterada')

        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso')

    })

})
