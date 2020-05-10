const express = require('express')
var router = express.Router()

//controller
const controller = require('../controller/auth.controller')

//login
router.get('/login', controller.login)

//post login
router.post('/login', controller.postLogin)

module.exports = router