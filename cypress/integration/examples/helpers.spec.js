/// <reference types="cypress" />

describe('Helpers...', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Wrap', () => {

        const obj = {nome: 'User', idade: 28}
        expect(obj).to.have.property('nome')

        cy.wrap(obj).should('have.property', 'nome')

        cy.get('#formNome')
            .then($el => {
                cy.wrap($el).type('Funciona??')
            })
            //.type('Funciona')

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })
        
        cy.get('#buttonSimple')
            .then(() => console.log('Encontrei o primeiro botao'))

        //promise.then(num => console.log(10))
        cy.wrap(promise).then(ret => console.log(ret))

        cy.get('#buttonList')
            .then(() => console.log('Encontrei o segundo botao'))

    })

    it.only('Its...', () => {

        const obj = {nome: 'User', idade: 28}
        cy.wrap(obj).
            should('have.property', 'nome', 'User')

        cy.wrap(obj).its('nome')
            .should('be.equal', 'User')

        const obj2 = {nome: 'User', idade: 28, endereco: { rua: 'dos bobos'}}
        cy.wrap(obj2).its('endereco')
            .should('have.property', 'rua')
        cy.wrap(obj2).its('endereco.rua')
            .should('contain', 'bobos')

        cy.title().its('length')
            .should('be.equal', 20)

    })
})