const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

//Bài 2: Template Engine
app.get('/', function (req, res) {
    res.render('index', {
        name: 'Coders Tokyo',
        born: '2018'
    }) // hai params đó là tên đường dẫn và params truyền xuống
  })
app.get('/users', (req, res) => {
    res.render('./users/users', {
        users: [
            {name: 'Quan', born: '2/10/1998'}, 
            {name: 'You', born: '30/1/1998'}
        ]
    })
})

//Bài 3: ReqQuery
var listUsers = [
    {name: 'Quan', born: '2/10/1998'}, 
    {name: 'You', born: '30/1/1998'}
]
app.get('/users/search', (req, res) => {
    console.log(req.query.name)
    var dataSearch = req.query.name ? req.query.name : ''
    var userChosed = []
    if (dataSearch) {
        userChosed = listUsers.filter(user => {
            return user.name.toLowerCase().includes(dataSearch.toLowerCase())
        })
    }
    console.log(userChosed)
    res.render('users/users', {users: userChosed, dataSearch: dataSearch})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))