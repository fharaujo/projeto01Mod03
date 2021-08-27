const moongose = require("../database/index");

const gameSchema = new moongose.Schema({
  title: {
    type: String,
    require: true,
  },
  imgURL: {
    type: Number,
  },
  genre: {
    type: String,
  },
  console: {
    type: String,
  },
  yearPublished: {
    type: Number,
  },
});
gameSchema.set("versionKey", false); // tirando __v
const Game = moongose.model("Game", gameSchema);

module.exports = Game;
