const buildEnv = () => {

    cy.server()

    cy.route({
        method: 'POST',
        url: '/signin',
        response: 
            { id: 1000, nome: 'usuario falso', token: 'uma string muito grande que nao deveria ser aceito mas que na verdade vai' }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [
            { conta_id: 9999, conta: 'Carteira', saldo: '100.00' },
            { conta_id: 9909, conta: 'Banco', saldo: '10000000.00' }]
    }).as('saldo')

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            { id: 111, nome: 'Carteira', visivel: true, usuario_id: 1000 },
            { id: 112, nome: 'Banco', visivel: true, usuario_id: 1000 }]
    }).as('contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            {"conta":"Conta para movimentacoes","id":288209,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":317576,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":288210,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":317577,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":288211,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":317578,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":288212,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":317578,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":288213,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":317578,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para extrato","id":288214,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-11-03T03:00:00.000Z","data_pagamento":"2020-11-03T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":317579,"usuario_id":12145,"transferencia_id":null,"parcelamento_id":null}]
    })

    cy.route({
        method: 'GET',
        url: '/transacoes/**',
        response: 
            {"conta": "Conta para saldo","id": 288211,"descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2020-11-03T03:00:00.000Z", "data_pagamento": "2020-11-03T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 317578, "usuario_id": 12145, "transferencia_id": null, "parcelamento_id": null }
    })

}

export default buildEnv