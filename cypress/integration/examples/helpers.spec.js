/// <reference types="cypress" />

//const { reject } = require("cypress/types/bluebird")

//const { expect } = require("chai")

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
})