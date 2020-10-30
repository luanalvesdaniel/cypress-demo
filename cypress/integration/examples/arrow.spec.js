/// <reference types="cypress" />
it('nada agora', function(){})

//Função padrão
//function soma(a, b){
//    return a + b
//}

//Função oculta
//const soma = function (a, b){
//    return a + b
//}

//Arrow Function
//const soma = (a, b) => {
//    return a + b
//}

//Arrow function mais simples
const soma = (a, b) => a + b
console.log(soma(1,2))

it('a function test...', function(){
    console.log('Function', this)
})

it('an arrow test...', () => {
    console.log('Arrow', this)
})