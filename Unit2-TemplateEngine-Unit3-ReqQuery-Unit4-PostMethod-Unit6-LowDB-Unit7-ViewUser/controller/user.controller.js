//low db
const db = require('../db')

//shortid
const shortid = require('shortid')

//md5
const md5 = require('md5')

//mongodb
const ListUser = require('../model/listUser')

module.exports = {
    listUser: async (req, res) => {
        // console.log(req.cookies) // cookies
        let listUser = await ListUser.find()
        res.render('users/users', {
            // users: db.get('users').value()
            users: listUser
        })
    },

    searchUser: async (req, res) => {
        var dataSearch = req.query.name ? req.query.name : ''
        console.log('dataSearch', dataSearch)
        // var userChosed = []
        let findUser
        if (dataSearch) {
        //     userChosed = db.get('users').value().filter(user => {
        //         return user.name.toLowerCase().includes(dataSearch.toLowerCase())
        //     })
            findUser = await ListUser.find({username: dataSearch})
        }
        res.render('users/users', {users: findUser, dataSearch: dataSearch})
    },

    goToPageCreate: (req, res) => {
        res.render('users/create')
    },

    createUser: async (req, res) => {
        req.body.password = md5(req.body.password)
        const user = new ListUser({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            fullname: req.body.fullname,
            birthday: req.body.birthday
        })
        await user.save()
        res.redirect('/users')
    },

    viewUser: async (req, res) => {
        var userId = req.params.id
        // console.log('aaaaaa', userId)
        // var user = db.get('users').find({ id: userId }).value() // methods find cua lowdb
        // console.log(user)
        let user = await ListUser.findById(userId)
        res.render('users/view', {user: user})
    },

    deleteUser: async (req, res) => {
        var userId = req.params.id
        const user = await ListUser.deleteOne({_id: userId})
        let listUser = await ListUser.find()
        res.render('users/users', {
            users: listUser
        })
    },

    updateUser: async (req, res) => {
        var userId = req.params.id
        let user = await ListUser.findById(userId)
        res.render('users/update', {user: user})
    },

    finallyUpdateUser: async (req, res) => {
        var userId = req.params.id
        console.log('asdasd', userId)
        console.log('addawxdasd', req.body)
        let tempListUser = await ListUser.findByIdAndUpdate(
            userId,
            {
                $set: {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username,
                    fullname: req.body.fullname,
                    birthday: req.body.birthday 
                }
            }
        )
        let listUser = await ListUser.find()
        res.render('users/users', {
            users: listUser
        })
    }
}