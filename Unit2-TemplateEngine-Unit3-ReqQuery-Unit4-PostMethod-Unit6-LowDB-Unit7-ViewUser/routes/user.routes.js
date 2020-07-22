const express = require('express')
var router = express.Router()


//controller
const controller = require('../controller/user.controller')

//validata
const validate = require('../validation/users.validation')


//Bài 2: Template Engine
router.get('', controller.listUser)

//Bài 3: ReqQuery
router.get('/search', controller.searchUser)

//Bài 4: Post Method
router.get('/create', controller.goToPageCreate)

router.post('/create', validate.validataUserCreate,  controller.createUser)

router.get('/update/:id',  controller.updateUser)

router.post('/finallyUpdate/:id', controller.finallyUpdateUser)
//Bài 7: View User
router.get('/view/:id', controller.viewUser)

// Delete User
router.get('/delete/:id', controller.deleteUser)

module.exports = router

//Bài 13: Middleware

function Middleware1 (req, res, next) {
    console.log('a')
    next() // nếu như k có next nó sẽ k chạy qua Middleware2
}
function Middleware2 (req, res, next) {
    console.log('b')
    res.send('Hello middlewere2')
}
router.get('/test', Middleware1, Middleware2)

//Bài 14: Cookie
router.get('/cookie', function(req, res) {
    res.cookie('user-id', '12345')
    res.send('')
})

router.get('/testcookie', function(req, res) {
    res.cookie('user-name', 'quan')
    res.send('')
})

router.get('/testcookie12', function(req, res) {
    res.cookie('user-phone', 'quan')
    res.send('')
})



