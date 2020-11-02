/// <reference types="cypress" />

import loc from '../../../support/locators'

describe('Deve testar a nivel funcional', () => {

    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.login('luan@luan', 'luan')
        cy.resetApp()
    })

    it('Deve criar a conta', () => {

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type("Conta nova2")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })

    it('Deve alterar a conta', () => {

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')

    })

})
