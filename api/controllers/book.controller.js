const db = require("../models");

module.exports = {
    create : (req, res) => {
        if (!req.body.title && !req.body.author && !req.body.price && !req.body.description && !req.body.publication_date) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const book = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            publication_date: req.body.publication_date
        };

        // save book in the database
        db.books.create(book)
        .then(data => {
            res.send(data);
        })
    },

    update : (req, res) => {
        const id = req.params.id;

        db.books.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
    },

    delete : (req, res) => {
        const id = req.params.id;

        db.books.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            }
        })
    },


    findAll : async (req, res) => {
        let page = req.query.page;
        if (page == null || page <= 0) page = 1
        
        await db.books.findAll({ offset: (page-1) * 10, limit: 10 })
        .then(data => {
            res.send(data);
        })
    },
    
    findByid : (req, res) => {
        const id = req.params.id;
        if (id == null){
            res.status(400).send({
                message: "ID can not be empty!"
            });
            return;
        }

        db.books.findByPk(id)
        .then(data => {
            res.send(data);
        })
    },

    findByAuthor : (req, res) => {
        const author = req.query.author;
        if (author == ""){
            res.status(400).send({
                message: "Author can not be empty!"
            })
            return;
        }
        let page = req.query.page;
        if (page == null || page <= 0) page = 1;

        db.books.findAll(
            { 
                where: 
                { 
                    author: 
                    {
                        [db.Op.substring]: author 
                    }
                } 
            }, 
            { offset: (page-1) * 10, limit: 10 })
        .then(data => {
            res.send(data);
        })
    },

    findByTitle : (req, res) => {
        const title = req.query.title;
        if (title == null){
            res.status(400).send({
                message: "Title can not be empty!"
            });
            return;
        }
        let page = req.query.page;
        if (page == null || page <= 0) page = 1;

        db.books.findAll(
            { 
                where: { 
                    title: 
                    {
                        [db.Op.substring]: title 
                    } 
                }
            }, 
            { offset: (page-1) * 10, limit: 10 })
        .then(data => {
            res.send(data);
        })
    },

    findByPrice : (req, res) => {
        let from = req.query.from;
        let to = req.query.to;
        if (from == null || from <= 0) from = 0;
        if (to == null || to <= 0) to = 1000000000; // 1 tỷ =)))

        let page = req.query.page;
        let sort = req.query.sort;
        if (page == null || page <= 0) page = 1;
        if (sort != 'ASC' || sort != 'DESC') sort = 'ASC';

        db.books.findAll(
            { 
                where: 
                { 
                    price:{
                        [db.Op.or] : [ { [db.Op.gte] : from}, {[db.Op.lte] : to } ]
                    } 
                }
            }, 
            { offset: (page-1) * 10, limit: 10, order: [['price', sort]]}
            )
        .then(data => {
            res.send(data);
        })
    },

    findByYear : (req, res) => {
        const year = req.query.year;
        let page = req.query.page;
        let sort = req.query.sort;
        if (page == null || page <= 0) page = 1;
        if (sort != 'ASC' || sort != 'DESC') sort = 'ASC';

        if (year == null) {
            db.books.findAll({ offset: (page-1) * 10, limit: 10, order: [['publication_date', sort]]})
            .then(data => {
                res.send(data);
            })
        }
        else{
            db.books.findAll(
                { 
                    where : db.sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('publication_date')), year)  
                },
                { 
                    offset: (page-1) * 10, limit: 10, 
                    order: [['publication_date', sort]]
                }
            )
            .then(data => {
                res.send(data);
            })
        }        
    },
}