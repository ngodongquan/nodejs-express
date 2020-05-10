module.exports = {
    validataUserCreate: function(req, res, next)  {
        var errorsList = []
        if (!req.body.email) {
            errorsList.push('Email should be required')
        }
        if (!req.body.password) {
            errorsList.push('Password should be required')
        }
        if (errorsList.length) {
            res.render('users/create', {
                errors: errorsList,
                value: req.body
            })
            return
        }
        res.locals.success = true
        next()
    }
}