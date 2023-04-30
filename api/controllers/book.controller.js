const { date } = require("joi");
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

        db.books.update({isDelete: 1}, {
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

    addBook_Category : async (req, res) => {
        const book_id = req.params.id;
        const categories = req.body.id;
        let unSuccess = [];

        if (categories.length == 0) {
            return res.status(400).send({
                message: "Categories can not be empty."
            });
        }

        if (!db.books.findOne({where: {id: book_id}})) {
            return res.status(400).send({
                message: "Book not found."
            });
        }

        for (const item of categories) {
            let cate = await db.category.findByPk(item);
            if ( cate != null ) {
                let data = await db.book_category.findOne({where: {book_id: book_id, category_id: item}});
                if (data == null) {
                    await db.book_category.create({book_id: book_id, category_id: item});
                }
                else {
                    unSuccess.push(item);
                }
            }
            else {
                unSuccess.push(item);
            }
        }

        if (unSuccess.length > 0) {
            return await res.status(400).send({
                message: "Categories not found or already exists.",
                data:  unSuccess
            });
        } else {
            await res.status(200).send({
                message: "successfully"
            });
        }

    },

    removeBook_Category : (req, res) => {
        const book_id = req.params.id;
        const categories = req.body.id;

        if (!db.books.findOne({where: {id: book_id}})) {
            return res.status(400).send({
                message: "Book not found."
            });
        }

        categories.forEach(item => {
            db.book_category.destroy({
                where: { book_id: book_id, category_id: item }
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
        let limit = parseInt(req.query.limit);


        author = author ? author : ''
        title = title ? title : ''
        from = from ? from : 0
        to = to ? to : 1000000000 // 1 tỷ =)))
        let yearEnd = 0
        if ( !year || year < 1970) {
            year = 1970
            yearEnd = 3000
        } else {
            yearEnd = parseInt(year) + 1
        }

        if(from > to) {
            let temp = from;
            from = to;
            to = temp;
        }
        if ( !page || page <= 0) page = 1
        if ( !limit || limit <= 0) limit = 10
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
                    },
                    publication_date:{
                        [db.Op.between]: [(new Date(year,0,0)), (new Date(yearEnd,0,0))]
                    }
                },
                offset: (page-1) * limit,
                limit: limit,
                order: [[ sortBy, sortD ]],
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

    findByCategory : (req, res) => {
        let author = req.query.author;
        let title = req.query.title;
        let from = req.query.from;
        let to = req.query.to;
        let year = req.query.year;
        let page = req.query.page;
        let sortD = req.query.sortD;
        let sortBy = req.query.sort;
        let limit = req.query.limit;

        const categories = req.body.categories || [];

        author = author ? author : ''
        title = title ? title : ''
        from = from ? from : 0
        to = to ? to : 1000000000 // 1 tỷ =)))
        let yearEnd = 0
        if ( !year || year < 1970) {
            year = 1970
            yearEnd = 3000
        } else {
            yearEnd = parseInt(year) + 1
        }

        if(from > to) {
            let temp = from;
            from = to;
            to = temp;
        }
        if ( !page || page <= 0) page = 1
        if ( !limit || limit <= 0) limit = 10
        sortD = sortD ? sortD : 'ASC'
        sortBy = sortBy ? sortBy : 'id'

        db.category.findAll(
        {
            where: {
                id: {
                    [db.Op.in]: categories
                }
            },
            offset: (page-1) * limit,
            limit: limit,
            order: [[ sortBy, sortD ]],
            include: [{
                model: db.books,
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
                    },
                    publication_date:{
                        [db.Op.between]: [(new Date(year,0,0)), (new Date(yearEnd,0,0))]
                    }
                }
            }]
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

}
