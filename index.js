const express = require("express");
const filmeSchema = require("./models/filme");
const moongose = require("mongoose");

const app = express();
const port = 3000;
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, MongoDB");
});

app.get("/filmes", async (req, res) => {
  const filmes = await filmeSchema.find();
  res.send(filmes);
});

app.get("/filmes/:_id", async (req, res) => {
  const { _id } = req.params;
  const filme = await filmeSchema.findById({ _id });
  console.log(filme);

  if (!filme || !filme.nome || !filme.duracao) {
    res.status().send({ mensage: "Filme não existe." });
  }

  res.send(filme);
});

app.post("/filmes", async (req, res) => {
  const filme = req.body;

  if (!filme || !filme.nome || !filme.duracao) {
    res.status(400).send({ error: "Filme inválido" });

    return;
  }

  let data = {
    nome: filme.nome,
    duracao: filme.duracao,
  };

  const newFilme = await filmeSchema.create(data);

  res.send(newFilme);
});

app.put("/filmes/:_id", async (req, res) => {
  const { _id } = req.params; // esse é que vem do requerimento
  const filme = req.body; // esse vem do body requerimento
  const isValid = await moongose.Types.ObjectId.isValid(_id); // buscar o filme

  if (!isValid) {
    // testando o id
    res.status(400).send({ error: "Filme não existe" });
    return;
  }

  if (!filme || !filme.nome || !filme.duracao) {
    // teste filme do body
    res.status(400).send({ error: "Filme inválido" });

    return;
  }

  let data = {
    nome: filme.nome,
    duracao: filme.duracao,
  };

  const newFilme = await filmeSchema.findByIdAndUpdate({ _id }, data, {
    new: true,
  }); // update
  res.send(newFilme);
});

app.delete("/filmes/:_id", async (req, res) => {
  const { _id } = req.params;
  const isValid = await moongose.Types.ObjectId.isValid(_id); // buscar o filme

  if (!isValid) {
    // testando o id
    res.status(400).send({ error: "Filme não existe" });
    return;
  }

  const filme = await filmeSchema.findByIdAndDelete({ _id });
  res.send(filme);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta em: http://localhost:${port}`);
});
