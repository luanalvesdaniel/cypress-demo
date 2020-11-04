/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'

describe('Deve testar a nivel frontend com mock', () => {

    after(() => {
        cy.clearLocalStorage()
    })

    before(() => {

        cy.server()

        cy.route({
            method: 'POST',
            url: '/signin',
            response: 
                { id: 1000, nome: 'usuario falso', token: 'uma string muito grande que nao deveria ser aceito mas que na verdade vai' }
        }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                { conta_id: 9999, conta: 'Carteira', saldo: '100.00' },
                { conta_id: 9909, conta: 'Banco', saldo: '10000000.00' }]
        }).as('saldo')

        cy.login('luan@luan', 'senha errada')

    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })

    it('Deve criar a conta', () => {

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 111, nome: 'Carteira', visivel: true, usuario_id: 1000 },
                { id: 112, nome: 'Banco', visivel: true, usuario_id: 1000 }]
        }).as('contas')

        cy.route({
            method: 'POST',
            url: '/contas',
            response: 
                { id: 113, nome: 'Conta nova', visivel: true, usuario_id: 1000 }
        }).as('saveConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 111, nome: 'Carteira', visivel: true, usuario_id: 1000 },
                { id: 112, nome: 'Banco', visivel: true, usuario_id: 1000 },
                { id: 113, nome: 'Conta nova', visivel: true, usuario_id: 1000 }]
        }).as('contasSave')

        cy.inserirConta('Conta nova')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')

    })

    it.only('Deve alterar a conta', () => {

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 111, nome: 'Carteira', visivel: true, usuario_id: 1000 },
                { id: 112, nome: 'Banco', visivel: true, usuario_id: 1000 }]
        }).as('contas')

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: 
                { id: 111, nome: 'Conta alterada', visivel: true, usuario_id: 1000 }
        }).as('contasAlterada')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 111, nome: 'Conta alterada', visivel: true, usuario_id: 1000 },
                { id: 112, nome: 'Banco', visivel: true, usuario_id: 1000 }]
        }).as('contas')

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')

    })

    it('Não deve inserir conta com mesmo nome', () => {

        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('Deve criar uma movimentacao', () => {

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')

    })

    it('Deve pegar o saldo', () => {

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.wait(2000)

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Deve remover movimentacao', () => {

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

    })

})
