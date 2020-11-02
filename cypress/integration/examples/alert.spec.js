/// <reference types="cypress" />

describe('Work with alerts', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => {
        
        cy.clickAlert('#alert', 'Alert Simples')

    })

    it('Alert com mock', () => {
        
        const stub = cy.stub().as('alerta')
        //trabalhando com alert mock
        cy.on('window:alert', stub)

        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
            
    })

    it('Confirm', () => {
        
        cy.get('#confirm')
            .click()

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })

    })

    it('Deny', () => {
        
        cy.get('#confirm')
            .click()

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })

    })

    it('Prompt', () => {
        
        cy.window().then(win => {
            cy.stub(win, 'prompt')
                .returns('50')
        })

        cy.get('#prompt')
            .click()

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 50?')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

    })

    it('Validando mensagens', () => {
        
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)

        cy.get('#formCadastrar')
            .click()
            .then(() => expect(stub.getCall(0))
            .to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome')
            .type('Luan')
        cy.get('#formCadastrar')
            .click()
            .then(() => expect(stub.getCall(1))
            .to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('#formSobrenome')
            .type('Alves')
        cy.get('#formCadastrar')
            .click()
            .then(() => expect(stub.getCall(2))
            .to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc')
            .click()

        cy.get('#formCadastrar')
            .click()

        cy.get('#resultado')
            .should('contain', 'Cadastrado!')

    })
})