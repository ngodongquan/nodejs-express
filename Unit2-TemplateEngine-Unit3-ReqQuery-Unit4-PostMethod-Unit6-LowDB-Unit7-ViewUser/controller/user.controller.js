//low db
const db = require('../db')

//shortid
const shortid = require('shortid')

//md5
const md5 = require('md5')

module.exports = {
    listUser: (req, res) => {
        console.log(req.cookies) // cookies
        res.render('users/users', {
            users: db.get('users').value()
        })
    },

    searchUser: (req, res) => {
        var dataSearch = req.query.name ? req.query.name : ''
        var userChosed = []
        if (dataSearch) {
            userChosed = db.get('users').value().filter(user => {
                return user.name.toLowerCase().includes(dataSearch.toLowerCase())
            })
        }
        res.render('users/users', {users: userChosed, dataSearch: dataSearch})
    },

    goToPageCreate: (req, res) => {
        res.render('users/create')
    },

    createUser: (req, res) => {
        console.log(req.body)
        req.body.id = shortid.generate()
        req.body.password = md5(req.body.password)

        console.log(res.locals)

        db.get('users').push(req.body).write()
        res.redirect('/users')
    },

    viewUser: (req, res) => {
        var userId = req.params.id
        console.log('aaaaaa', userId)
        var user = db.get('users').find({ id: userId }).value() // methods find cua lowdb
        console.log(user)
        res.render('users/view', {user: user})
    }
}