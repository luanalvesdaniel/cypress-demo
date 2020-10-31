/// <reference types="cypress" />

describe('Locators', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Using jquery selector...', () => {

        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
            .click()

        cy.get('table#tabelaUsuarios tbody > tr:eq(0) :nth-child(3) > [type="button"]')
            .click()

        cy.get('[onclick*="Francisco"]')
            .click()

        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
            .type('jquery')

        cy.get('#tabelaUsuarios tr:contains("Mestrado"):eq(0) td:eq(6) input')
            .type('jquery2')
    })

    it('using xpath cypress', () => {
        
        cy.xpath("//input[contains(@onclick, 'Francisco')]")
            .click()
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
            .click()

        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
            .type("funciona")
           
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']")
            .type('funciona')

    })
})