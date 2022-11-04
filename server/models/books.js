let mongoose = require("mongoose");

//create a model class
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    description: String,
    price: Number
},
{
    collection:"books"
});

module.exports = mongoose.mongoose.model('Book', bookModel);