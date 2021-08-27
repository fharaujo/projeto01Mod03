const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/db_filmes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},  (error) =>{
  if(error){
      console.log(error)
  }else{
      console.log("MongoDB conectado com sucesso.")
  }
});

module.exports = mongoose;
