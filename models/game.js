const moongose = require("../database/index");

const gameSchema = new moongose.Schema({
  title: {
    type: String,
    require: true,
  },
  imgURL: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  console: {
    type: String,
    require: true,
  },
  yearPublished: {
    type: Number,
    require: true,
  },
});
gameSchema.set("versionKey", false); // tirando __v

const Game = moongose.model("Game", gameSchema);

module.exports = Game;
