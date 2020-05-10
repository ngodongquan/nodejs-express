var db = require('../db')

module.exports = {
    requireAuth: function (req, res, next) {
        console.log('req', req.signedCookies)
        if (!req.signedCookies.UserID) {
            res.redirect('/auth/login')
            return
        }
        
        var user = db.get('users')
            .find({
                id: req.signedCookies.UserID
            })
            .value()
        
        if (!user) {
            res.redirect('/auth/login')
            return
        }

        res.locals.user = user  // tồn tại trong vòng đời của request response trong cùng request đấy thôi
        res.cookie('test middleware', 'abc')
        next()
    }
}