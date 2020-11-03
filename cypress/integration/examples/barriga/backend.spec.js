/// <reference types="cypress" />

describe('Deve testar a nivel funcional', () => {

    before(() => {
        //cy.login('luan@luan', 'luan')
    })

    beforeEach(() => {
        //cy.get(loc.MENU.HOME).click()
        //cy.resetApp()
    })

    it.only('Deve fazer login', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "luan@luan",
                redirecionar: false,
                senha: "luan"
            }
        }).its('body.token').should('not.be.empty')
    })

    it('Deve criar a conta', () => {

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
