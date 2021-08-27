const moongose = require("../database/index");

const filmeSchema = new moongose.Schema({
  nome: {
    type: String,
    require: true,
  },
  duracao: {
    type: Number,
    require: true,
  },
});
filmeSchema.set("versionKey", false); // tirando __v
const Filme = moongose.model("Filme", filmeSchema);

module.exports = Filme;
