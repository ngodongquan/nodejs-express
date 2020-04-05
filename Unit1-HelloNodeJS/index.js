const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('<h1>Hello Coders Tokyo</h1>')
})

app.get('/users', (request, response) => {
    response.send('<h1>Users List</h1>')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))