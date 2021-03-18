const db = require('../schema/models')
const _ = require('lodash')

module.exports = async (req, res, next) => {
    const { username } = req.body
    const username_lower = _.toLower(username)

    const userExists = !!(await db.user.find({ username_lower })).length

    if (userExists) {
        next()
    } else {
        console.log("Username doesn't exists")
        res.json({
            Error: 400,
            message: 'User does not exists or password is wrong',
        })
    }
}
