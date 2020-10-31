# cypress

- node.js
- vscode

npm init
npm install cypress

abrindo cypress
cria-se um script no package.json
"open": "cypress open"
comando: npm run open

plugin locator:

página cypress / plugins / cypress-xpath

    npm install -D cypress-xpath

Then include in your project's cypress/support/index.js

    require('cypress-xpath')

Como usar

    it('finds list items', () => {
        cy.xpath('//ul[@class="todo-list"]//li')
            .should('have.length', 3)
    })