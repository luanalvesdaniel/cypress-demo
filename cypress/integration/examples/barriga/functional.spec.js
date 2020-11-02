/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'

describe('Deve testar a nivel funcional', () => {

    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.login('luan@luan', 'luan')
        cy.resetApp()
    })

    it('Deve criar a conta', () => {

        cy.acessarMenuConta()
        cy.inserirConta('Conta nova')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })

    it('Deve alterar a conta', () => {

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta nova')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')

    })

    it('Não deve inserir conta com mesmo nome', () => {

        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('Deve criar uma movimentacao', () => {

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')

    })

    it('Deve pegar o saldo', () => {

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', '123,00')

    })
})
