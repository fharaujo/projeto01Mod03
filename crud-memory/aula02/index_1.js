const calc = require('./calculadora'); // require importa o módulo

console.log(`Olá, bem-vindio(a) a calculadora ${calc.nome}`);


const prompt = require("prompt-sync")();

number1 = +prompt('Digite 1° número: ');
number2 = +prompt('Digite 2° número: ');

console.log(`
Qual calculo deseja?

    [1] - soma
    [2] - subtração
    [3] - multiplicação
    [4] - divisão

`);

const option = +prompt('Digite sua opção: ');
if (option === 1){
    console.log(`Soma: ${number1} + ${number2} = ${calc.soma(number1, number2)}`);
}else if(option === 2){
    console.log(`Subtração: ${number1} - ${number2} = ${calc.sub(number1, number2)}`);
}else if(option === 3){
    console.log(`Multiplicação: ${number1} * ${number2} = ${calc.mult(number1, number2)}`);
}else if(option === 4){
    console.log(`Divisão: ${number1} / ${number2} = ${calc.div(number1, number2)}`);
}else{
    console.log('Opção inválida.')
};