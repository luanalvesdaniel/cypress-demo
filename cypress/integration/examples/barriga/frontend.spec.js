/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'
import buildEnv from '../../../support/buildEnv'

describe('Deve testar a nivel frontend com mock', () => {

    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {

        buildEnv()
        cy.login('luan@luan', 'senha errada')
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })

    it('Deve criar a conta', () => {

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

    it('Deve alterar a conta', () => {
 
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: 
                { id: 111, nome: 'Conta alterada', visivel: true, usuario_id: 1000 }
        })

        cy.acessarMenuConta()
/*
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 111, nome: 'Conta alterada', visivel: true, usuario_id: 1000 },
                { id: 112, nome: 'Banco', visivel: true, usuario_id: 1000 }]
        }).as('contas')
*/
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')

    })

    it('Não deve inserir conta com mesmo nome', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            response: 
                {"error":"Já existe uma conta com esse nome!"},
                status: 400
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('Deve criar uma movimentacao', () => {

        cy.route({
            method: 'POST',
            url: '/transacoes',
            response:
                {"id":288215,"descricao":"fsdfds","envolvido":"sdfsdf","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"2.00","status":true,"conta_id":317574,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')

    })

    it('Deve pegar o saldo', () => {

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: 
                {"conta": "Conta para saldo","id": 288211,"descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2020-11-03T03:00:00.000Z", "data_pagamento": "2020-11-03T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 317578, "usuario_id": 12145, "transferencia_id": null, "parcelamento_id": null }
        })

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        //cy.wait(2000)

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                { conta_id: 9999, conta: 'Carteira', saldo: '4034.00' },
                { conta_id: 9909, conta: 'Banco', saldo: '10000000.00' }]
        }).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Deve remover movimentacao', () => {

        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

    })

})
