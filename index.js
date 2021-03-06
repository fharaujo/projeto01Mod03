// Import modules
const express = require("express");
const gameSchema = require("./models/game");
const moongose = require("mongoose");

const app = express();
const port = 3000;
app.use(express.json());

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
  const id = req.params;
  const game = await gameSchema.findById(id);
  const isValid = await moongose.Types.ObjectId.isValid(id); // buscar o id válido

  if (!isValid) {
    // testando o id
    res.status(422).send({ error: "ID inválido." });
    return;
  }

  if (
    !game ||
    !game.title ||
    !game.imgURL ||
    !game.genre ||
    !game.console ||
    !game.yearPublished
  ) {
    res.status(400).send({ mensage: "Jogo não existe." });
    return;
  }

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
    res.status(400).send({ error: "Jogo inválido" });

    return;
  }

  const newGame = await new gameSchema(game).save();

  res.status(201).send({ newGame });
});

// PUT "/games" respondendo status com o jogo atualizado
app.put("/games/:id", async (req, res) => {
  const id = req.params.id; // esse é que vem do requerimento
  const isValid = await moongose.Types.ObjectId.isValid(id); // buscar o game

  if (!isValid) {
    // testando o id
    res.status(400).send({ error: "Jogo não existe" });
    return;
  }
  const gameExist = await gameSchema.findById(id);
  if (!gameExist) {
    res.status(404).send({ error: "Jogo não encontrado." });
    return;
  }

  const game = req.body; // esse vem do body requerimento
  if (
    !game ||
    !game.title ||
    !game.imgURL ||
    !game.genre ||
    !game.console ||
    !game.yearPublished
  ) {
    // teste game do body
    res.status(400).send({ error: "Jogo inválido" });
    return;
  }

  await gameSchema.findByIdAndUpdate({ _id: id }, game); // update
  const gameUpdate = await gameSchema.findById(id);
  res.send({gameUpdate});
});

app.delete("/games/:id", async (req, res) => {
  const id = req.params.id;
  // buscar o objeto id do banco e vendo se é válido com o da requisição
  const isValid = await moongose.Types.ObjectId.isValid(id);

  if (!isValid) {
    // testando o id
    res.status(400).send({ error: "Jogo não existe" });
    return;
  }

  const game = await gameSchema.findByIdAndDelete(id);
  res.send({ game });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta em: http://localhost:${port}`);
});
