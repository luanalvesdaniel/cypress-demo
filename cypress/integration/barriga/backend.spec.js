/// <reference types="cypress" />

describe('Deve testar a nivel backend', () => {

    //let token
    before(() => {
        cy.getToken('luan@luan', 'luan')
            //.then(tkn => {
            //    token = tkn
            //})
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Deve criar a conta', () => {
        const item = {"nome":"Conta via rest"}

        cy.req('POST', '/contas', item)
            .as('response')
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })

    })

    it('Deve alterar a conta', () => {
        
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {

                const item = {"nome":"Conta alterada via rest"}
                cy.req('PUT', `/contas/${contaId}`, item)

            })

        cy.get('@response').its('status').should('be.equal', 200)

    })

    it('Não deve inserir conta com mesmo nome', () => {
        const item = {"nome":"Conta mesmo nome"}
        cy.req('POST', '/contas/', item, '')
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })

    })

    it('Deve criar uma movimentacao', () => {

        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {

                const item = {  
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "desc 222",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "100"}

                cy.req('POST', '/transacoes/', item)
            })

            cy.get('@response').its('status').should('be.equal', 201)
            cy.get('@response').its('body.id').should('exist')

    })

    it('Deve pegar o saldo', () => {

        cy.req('GET', '/saldo')
         .then(res => {

            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo                
            })

            expect(saldoConta).to.be.equal('534.00')

        })

        const q = {descricao: 'Movimentacao 1, calculo saldo'}

        cy.req('GET', '/transacoes', null, q)
            .then(res => {

                const item = {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                    }

                cy.req('PUT', `/transacoes/${res.body[0].id}`, item)
                    .its('status').should('be.equal', 200)
        })

        cy.req('GET', '/saldo')
            .then(res => {
                let saldoConta = null
                res.body.forEach(c => {
                    if(c.conta === 'Conta para saldo') saldoConta = c.saldo                
                })
            expect(saldoConta).to.be.equal('4034.00')
        })
        
    })

    it('Deve remover movimentacao', () => {

        const q = {descricao: 'Movimentacao para exclusao'}

        cy.req('GET', '/transacoes', null, q)
            .then(res => {
                
                cy.req('DELETE', `/transacoes/${res.body[0].id}`)
                    .its('status').should('be.equal', 204)

        })

    })

})
