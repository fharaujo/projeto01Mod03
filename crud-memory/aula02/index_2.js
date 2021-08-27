const htttp = require('http'); // importando o módulo na mão

// instanciando um servidor e criando um function de callback para  resquisições
htttp.createServer((req, res) => {
    res.end('Hello, Fábio Araujo!!'); // enviando uma resposta 
}).listen(3000); // a porta

console.log('Servidor rodando em http://localhost:3000');