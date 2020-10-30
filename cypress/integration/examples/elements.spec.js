/// <reference types="cypress" />

describe('Work with basic elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('body')
            .should('contain', 'Cuidado onde clica, muitas armadilhas...')
        cy.get('span')
            .should('contain', 'Cuidado onde clica, muitas armadilhas...')
        cy.get('.facilAchar')
            .should('contain', 'Cuidado onde clica, muitas armadilhas...')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {

        cy.get('[href="#"]')
            .click()
        cy.get('#resultado')
            .should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado')
        .should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado')
            .should('have.text', 'Voltou!')
    })

    it('TextFields', () => {

        cy.get('#formNome')
            .type('Luan')
            .should('have.value', 'Luan')

        cy.get('#elementosForm\\:sugestoes')
            .type('abcdef')
            .should('have.value', 'abcdef')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('blabla')
            .should('have.value', 'blabla')   

        cy.get('#formSobrenome')
            .type('Alves Danielll{backspace}{backspace}')
            .should('have.value', 'Alves Daniel')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto') //{delay: 200}
            .should('have.value', 'acerto')

    })

    it('RadioButton', () => {

        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get("[name=formSexo]")
            .should('have.length', 2)

    })

    it.only('Checkbox', () => {

        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get("[name='formComidaFavorita']")
            .click({multiple: true})

        cy.get('#formComidaPizza')
            .should('not.be.checked')

        cy.get('#formComidaVegetariana')
            .should('be.checked')

    })
})
