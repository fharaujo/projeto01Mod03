const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:/db_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},  (error) =>{
  if(error){
      console.log(error)
  }else{
      console.log("... MongoDB conectado com sucesso.")
  }
});

module.exports = mongoose;
