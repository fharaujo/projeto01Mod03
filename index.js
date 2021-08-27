const express = require("express");
const gameSchema = require("./models/filme");
const moongose = require("mongoose");

const app = express();
const port = 3000;
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, MongoDB");
});

app.get("/games", async (req, res) => {
  const games = await gameSchema.find();
  res.status(200).send(games);
});

app.get("/games/:_id", async (req, res) => {
  const { _id } = req.params;
  const game = await gameSchema.findById({ _id });
  console.log(game);

  if (
    !game ||
    !game.title ||
    !game.imgURL ||
    !game.genre ||
    !game.console ||
    !game.yearPublished
  ) {
    res.status().send({ mensage: "Filme não existe." });
  }

  res.send(game);
});

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
    res.status(400).send({ error: "Filme inválido" });

    return;
  }

  let data = {
    nome: game.nome,
    duracao: game.duracao,
  };

  const newGame = await gameSchema.create(data);

  res.send(newGame);
});

app.put("/games/:_id", async (req, res) => {
  const { _id } = req.params; // esse é que vem do requerimento
  const game = req.body; // esse vem do body requerimento
  const isValid = await moongose.Types.ObjectId.isValid(_id); // buscar o filme

  if (!isValid) {
    // testando o id
    res.status(400).send({ error: "Filme não existe" });
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
    // teste game do body
    res.status(400).send({ error: "Filme inválido" });

    return;
  }

  let data = {
    nome: game.nome,
    duracao: game.duracao,
  };

  const newGame = await gameSchema.findByIdAndUpdate({ _id }, data, {
    new: true,
  }); // update
  res.send(newGame);
});

app.delete("/games/:_id", async (req, res) => {
  const { _id } = req.params;
  const isValid = await moongose.Types.ObjectId.isValid(_id); // buscar o filme

  if (!isValid) {
    // testando o id
    res.status(400).send({ error: "Filme não existe" });
    return;
  }

  const game = await gameSchema.findByIdAndDelete({ _id });
  res.send(game);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta em: http://localhost:${port}`);
});
