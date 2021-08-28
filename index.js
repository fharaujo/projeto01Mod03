// Import modules
const express = require("express");
const gameSchema = require("./models/game");
const mongoose = require("./database");

const app = express();
const port = 3000;
app.use(express.json());

// criando funções para mapeamento do código e boas práticas
const isValidId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Id inválido." });
    return;
  }
};

const gameExist = (game) => {
  if (!game) {
    res.status(404).send({ error: "Jogo não encontrado." });
    return;
  }
};

// GET "/" respondendo as boas vindas do projeto
app.get("/", (req, res) => {
  res.send(
    "Hello, Project 01 CRUD API NodeJS - Blue Editech Course - Module 03"
  );
});

// GET "/games" respondendo status com todos jogos criados
app.get("/games", async (req, res) => {
  const games = await gameSchema.find();
  res.status(200).send(games);
});

// GET "/games/:{ID}" respondendo status com jogo pelo ID
app.get("/games/:id", async (req, res) => {
  const id = req.params.id;
  const game = await gameSchema.findById(id);
  // chamada das funções de mapeamento do código
  isValidId(id);
  gameExist(game);

  res.send({ game });
});

// POST "/games" respondendo status com todos jogo criado
app.post("/games", async (req, res) => {
  const game = req.body;

  if (
    !game ||
    !game.title ||
    !game.imgURL ||
    !game.genre ||
    !game.console ||
    !game.yearPublished
  ) {
    res.status(400).send({ error: "Game inválido" });

    return;
  }

  const newGame = await new gameSchema(game).save();

  res.status(201).send({ newGame });
});

// PUT "/games" respondendo status com o jogo atualizado
app.put("/games/:id", async (req, res) => {
  const id = req.params.id; // recebendo ID da requisição
  isValidId(id);

  const game = req.body; // recebendo o game da requisição
  if (
    !game ||
    !game.title ||
    !game.imgURL ||
    !game.genre ||
    !game.console ||
    !game.yearPublished
  ) {
    // teste game do body
    res.status(400).send({ error: "Game inválido" });
    return;
  }

  await gameSchema.findByIdAndUpdate({ _id: id }, game); // update
  const gameUpdate = await gameSchema.findById(id);
  res.send({ gameUpdate });
});

// DELETE "/games/:{ID}" respondendo status com o jogo deletado por ID
app.delete("/games/:id", async (req, res) => {
  const id = req.params.id;
  // buscar o objeto id do banco e vendo se é válido com o da requisição
  isValidId(id);

  const game = await gameSchema.findById(id);
  gameExist(game);

  await gameSchema.findByIdAndDelete(id);
  res.send({ message: "Game Excluido com sucesso." });
});

// "Escutando a porta do servidor e seu caminho"
app.listen(port, () => {
  console.log(`Servidor rodando na porta em: http://localhost:${port}`);
});
