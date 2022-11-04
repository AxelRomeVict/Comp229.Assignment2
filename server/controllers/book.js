let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');


//Create a refernce to the model
let Book = require ('../models/book');

module.exports.displayBooklist = (req, res, next) => {
    Book.find((err, Booklist) => {
        if(err)
            {
                return console.error(err);
            }
        else 
        {
           // console.log(Booklist);
           res.render('book/list', {title: "Books", Booklist: booklist});
        }
    });
}
module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: "Add Book"});
}
module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name":req.body.name,
        "author": req.body.published,
        "published": req.body.publised,
        "description": req.body.description,
        "price":req.body.price
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id= req.params.id;
    Book.findById(id, (err, booktoEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.redirect('book/edit', {title: 'Edit Book', book: booktoEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBook = Book ({
        "_id": id,
        "name":req.body.name,
        "author": req.body.published,
        "published": req.body.publised,
        "description": req.body.description,
        "price":req.body.price
    });
    Book,updateOne({_id:id}, updateBook, (err)=>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refesh book list
            res.redirect('/book-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id =req.params.id;

    Book.remove({_id: id}, (err) =>{
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
} 