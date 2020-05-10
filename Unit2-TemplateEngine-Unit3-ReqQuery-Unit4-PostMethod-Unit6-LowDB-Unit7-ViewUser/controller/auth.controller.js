//low db
const db = require('../db')

//md 5
const md5 = require('md5')

module.exports = {
    login: function(req, res, next) {
        res.render('auth/login')
    },

    postLogin: function(req, res, next) {
        let email = req.body.email
        let password = req.body.password

        let user = db.get('users')
            .find({ email: email})
            .value()

        console.log(user)

        if (!user) {
            res.render('auth/login', {
                errors: ['User is not exist'],
                value: req.body
            })
            return
        }

        if (user && user.password !== md5(password)) {
            console.log('aaaaaaa')
            res.render('auth/login', {
                errors: ['Wrong Password'],
                value: req.body
            })
            return
        }

        res.cookie('UserID', user.id, {
            signed: true
        }) // set cookies signed
        res.redirect('/users')
        // sau khi set cookies signed chúng ta sẽ set up và khi request trả về req là signed cookies, chứ không còn là cookies nữa
    }
}