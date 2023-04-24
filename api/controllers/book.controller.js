const db = require("../models");

module.exports = {
    create : (req, res) => {
        if (!req.body.title || !req.body.author || !req.body.price || !req.body.description || !req.body.publication_date || !req.body.image) {
            res.status(400).send({
              message: "req.body can not be empty!"
            });
            return;
        }

        // get data from request body

        const categories = req.body.categories || [];

        // save book in the database
        db.books.create(req.body)
        .then(data => {
            categories.forEach(item => {
                db.book_category.create({book_id: data.id, category_id: item}).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Book."
                    });
                });
            })
            res.status(200).send({
                message: "Book was created successfully."

            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
    },

    update : (req, res) => {
        if (!req.body.title || !req.body.author || !req.body.price || !req.body.description || !req.body.publication_date || !req.body.image) {
            res.status(400).send({
                message: "req.body can not be empty!"
            })
        };

        db.books.update(req.body, {
            where: { id: req.params.id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Book with id = ${req.params.id}. Maybe Book was not found !`
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
                    message: `Cannot delete Book with id = ${id}. Maybe Book was not found!`
                });
            }
        })
    },

    addBook_Category : (req, res) => {
        const book_id = req.params.id;
        const categories = req.body.id;

        categories.forEach(item => {
            db.book_category.create({
                book_id: book_id,
                category_id: item
            })
        });

        res.status(200).send({
            message: "successfully."
        });

    },

    removeBook_Category : (req, res) => {
        const book_id = req.params.id;
        const categories = req.body.id;

        categories.forEach(item => {
            db.book_category.destroy({
                where: { book_id: book_id, category_id: item },
                force: true
            })
        });

        res.status(200).send({
            message: "successfully."
        });
    },


    findAll : (req, res) => {
        let author = req.query.author;
        let title = req.query.title;
        let from = req.query.from;
        let to = req.query.to;
        let year = req.query.year;
        let page = req.query.page;
        let sortD = req.query.sortD;
        let sortBy = req.query.sort;

        author = author ? author : ''
        title = title ? title : ''
        from = from ? from : 0
        to = to ? to : 1000000000 // 1 tỷ =)))
        year = year ? year : ''

        if (page == null || page <= 0) page = 1
        sortD = sortD ? sortD : 'ASC'
        sortBy = sortBy ? sortBy : 'id'
        
        db.books.findAll(
            {
                where: 
                { 
                    author: 
                    {
                        [db.Op.substring]: author 
                    },
                    title: 
                    {
                        [db.Op.substring]: title 
                    },
                    price:
                    {
                        [db.Op.between]: [from, to]
                    }
                } 
            },
            {
                atributtes: [ db.sequelize.fn('YEAR', db.sequelize.col('publication_date')),year ]
            },
            { 
                offset: (page-1) * 10,
                limit: 10,
                order: [ sortBy, sortD ]
            })
            .then(data => {
                if (data.length > 0) {
                    res.send(data);
                } else {
                    res.send({
                        message: "No books found !"
                    });
                }
            })
    },
    
    findByid : (req, res) => {
        const id = req.params.id;

        db.books.findByPk(id, 
            { 
                include: 
                {
                    model: db.category
                }
            })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    message: `Cannot find Book with id = ${id}.`
                });
            }
        })
    },

}