const express = require("express"); // importa o módulo express do node_modules
const app = express(); // cria o nosso objeto, que vai utilizar tudo o que o express possui

app.use(express.json()); // Converter requisição para JavaScript Object Notation (JSON)
const port = 3000; // const da porta do servidor

// lista de objetos
const filmes = [
  {
    id: 1,
    nome: "Capitão America",
    duracao: 160,
  },
  {
    id: 2,
    nome: "Capitã Marvel",
    duracao: 140,
  },

  {
    id: 3,
    nome: "Pantera Negra",
    duracao: 160,
  },
];

// função responsável por filtrar se apenas os filmes que tem valores não null
const getFilmesValidos = () => filmes.filter(Boolean);

// criando as funções responsáveis para pegar id e index dos filmesd
const getFilmeById = id => getFilmesValidos().find(filme => filme.id === id);
const getFilmeIndex = id => getFilmesValidos().findIndex(filme => filme.id === id);



// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

// GET / - home
app.get("/", (req, res) => {
  // rota de GET, recebe o nome da rota e uma função de callback com requisição ao servidor e resposta do servidor.
  res.status(200).send({ hello: "Hello World Express" }); // Responde o status  na tela e um texto.
});

// GET /filmes - Retornar a lista de filmes
app.get("/filmes", (req, res) => {
  res.send({ listaDeFilmes: filmes }); // construindo e passando para resposta um arquivo json
});

// GET /filmes/{id} - Retornar a lista de filmes pelo ID
app.get("/filmes/:id", (req, res) => {
  // rota recebe o parametro {}:id}
  const id = +req.params.id; // pegando apenas parametro id
  const filme = getFilmeById(id); // buscando o valor id com find ou undefined

  !filme
    ? res.status(404).send({ error: "Filme não existe" })
    : res.send(filme);
});

// POST - /filmes - Criar um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body; // pegando o json inteiro do body para inserir no objeto filmes

  if (!filme || !filme.nome || !filme.duracao) {
    res.status(400).send({ error: "Filme inválido" });

    return;
  }

  // criando o id automatico na mão
  // pegando último elemento da lista filme
  const ultimoFilme = filmes[filmes.length - 1];

  // testar se a lista não está vazia
  if (filmes.length) {
    // pegando o valor do ultimo id disponivel e soma + 1
    filme.id = ultimoFilme.id + 1;
    filmes.push(filme);
  } else {
    // caso lista vazia o valor de id na lista é igual a 1
    filme.id = 1;
    filmes.push(filme);
  }

  res.status(201).send({message: "Filme criado com sucesso." });
});

// PUT - /filmes/{id} - Altera um filme pelo ID
app.put("/filmes/:id", (req, res) => {
  const id = +req.params.id;
  const filmeIndex = getFilmeIndex(id);
  
  if (filmeIndex < 0) {
    res.status(404).send({ error: "Jogo não existe." });
    return;
  }
  // pegando o json enviado no body da requisição
  const novoFilme = req.body;
  
  if (!novoFilme || !novoFilme.nome || !novoFilme.duracao) {
    res.status(400).send({ error: "Jogo inválido" });
    return;
  }
  
  const filme = getFilmeById(id);

  novoFilme.id = filme.id;
  filmes[filmeIndex] = novoFilme;

  res.send({ mesagem: "Filme alterado com sucesso!" });
});

// Delete - filmes/{id} - apagar um filme pelo ID
app.delete("/filmes/:id", (req, res) => {
  const id = +req.params.id;
  const filmeIndex = getFilmeIndex(id);

  if (filmeIndex < 1) {
    res.status(404).send({ error: "Falha na exclusão" });
  }

  // splice crud em memoria
  // apaga recebe dois parametros a ser apagada e quantos quantos valores quero apagar.
  filmes.splice(filmeIndex, 1);
  res.send({ sucess: "deletado com sucesso" });
});

/* função listen do objeto app fica servindo nosso back-end, 
*escutando a porta e mostrando caminho com a função de callback

Obrigatória estar sempre no final do código.
*/
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
