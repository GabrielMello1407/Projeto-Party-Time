const mongoose = require("mongoose")

async function main() {
  
  try {

    mongoose.set("strictQuery", true)

    await mongoose.connect("mongodb+srv://gabrielmellomoraes1407:1Wt1PeYnAIy4TJQ0@cluster0.6qep9ky.mongodb.net/?retryWrites=true&w=majority")

    console.log("Conectado ao banco!")
    
  } catch (error) {
    console.log(`Erro:${error}`)
  }

}

module.exports = main