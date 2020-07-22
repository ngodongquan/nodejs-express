//low db
const db = require('../db')

// product model from mongodb
const ListUser = require('../model/listUser')

module.exports = {
    listProducts: (req, res, next) => {
        var currentPage = req.query.page ? parseInt(req.query.page) : 1 //n
        var perPage = 10

        var lengthOfPage = Math.ceil(db.get('products').value().length / perPage)
        // console.log(lengthOfPage)

        if (currentPage > lengthOfPage) {
            currentPage = lengthOfPage
        } else if (currentPage < 1 ) {
            currentPage = 1
        }

        var start = (currentPage - 1) *perPage
        var end = currentPage * perPage
        
        res.render('products/products', {
            products: db.get('products').value().slice(start, end),
            lengthOfPage: lengthOfPage,
            currentPage: currentPage
        })
        // })
        // ListUser.find().then(function(ListUsers) {
        //     res.render('products/products', {
        //         products: ListUsers
        //     })
        // })
    }
}