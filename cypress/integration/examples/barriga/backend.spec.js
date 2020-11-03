/// <reference types="cypress" />

describe('Deve testar a nivel funcional', () => {


    let token
    before(() => {
        cy.getToken('luan@luan', 'luan')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(() => {
        //cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })

    it.only('Deve criar a conta', () => {

        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: "Conta via rest3"
            }
        }).as('response')
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest3')
        })

    })

    it('Deve alterar a conta', () => {

    })

    it('Não deve inserir conta com mesmo nome', () => {

    })

    it('Deve criar uma movimentacao', () => {


    })

    it('Deve pegar o saldo', () => {

    })

    it('Deve remover movimentacao', () => {

    })

})

