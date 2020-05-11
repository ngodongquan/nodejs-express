const express = require('express')
var router = express.Router()

// controller
const controller = require('../controller/products.controller')

// get all products
router.get('/products', controller.listProducts)

module.exports = router