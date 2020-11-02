/// <reference types="cypress" />

describe('Dinamic tests', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        
        it(`Cadastro com comida a comida ${food}`, () => {

            cy.get('#formNome')
                .type('Luan')
    
            cy.get('#formSobrenome')
                .type('Alves')
    
            cy.get(`[name=formSexo][value=M]`)
                .click()
    
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`)
                .click()
    
            cy.get('#formEscolaridade')
                .select('Doutorado')
    
            cy.get('#formEsportes')
                .select('Corrida')
                
            cy.get('#formCadastrar')
                .click()
    
            cy.get('#resultado')
                .should('contain', 'Cadastrado!')
    
        })
    })

    

})