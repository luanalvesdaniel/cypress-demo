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


Linha de comando

cypress.json

    "run": "cypress run"

    comando: npm run run

somente algum teste

    npm run run -- --spec cypress/integration/examples/time.spec.js

para ver a execução

    npm run run -- --spec cypress/integration/examples/time.spec.js --headed --no-exit

escolhendo o browser

    npm run run -- --spec cypress/integration/examples/time.spec.js --browser chrome

executando uma pasta de testes inteira

    node_modules/.bin/cypress run --spec cypress/integration/barriga/**/*
