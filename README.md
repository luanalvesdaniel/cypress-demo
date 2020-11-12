# cypress

__1. Programas necessários:__
- node.js
- vscode

__2. Preparando e instalando Cypress:__

* Criando o arquivo de configuração:
```
npm init -y
```

* Baixando os arquivos necessários para iniciar o cypress:
```
npm install cypress
```

__3. Abrindo cypress:__

* Editar arquivo __package.json__, inserindo em __scripts__ o comando abaixo:
```
"open": "cypress open"
```

* Executar no __console/git bash__:
```
npm run open
```

__4. Instalando plugin locator via xpath:__

* Executar comando:
```
npm install -D cypress-xpath
```

* Incluir o comando abaixo no arquivo __cypress/support/index.js__:
```
require('cypress-xpath')
```

* Como usar:
```javascript
    it('finds list items', () => {
        cy.xpath('//ul[@class="todo-list"]//li')
            .should('have.length', 3)
    })
```

__5. Linha de comando:__

* No arquivo __cypress.json__ em __scripts__:

```
"run": "cypress run"
```

* No console:
```
comando: npm run run
```

* Somente algum teste:
```
npm run run -- --spec cypress/integration/examples/time.spec.js
```

* Para ver a execução via console:
```
npm run run -- --spec cypress/integration/examples/time.spec.js --headed --no-exit
```

* Escolhendo o browser:
```
npm run run -- --spec cypress/integration/examples/time.spec.js --browser chrome
```

* Executando uma pasta de testes completa:
```
node_modules/.bin/cypress run --spec cypress/integration/barriga/**/*
```
