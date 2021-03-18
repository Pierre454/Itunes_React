const db = require('../schema/models')
const _ = require('lodash')
const routes = require('../routes')

const ignoredPaths = [routes.signup, routes.signin]

const verifyUser = async (userInformation) => {
    if (_.isEmpty(userInformation)) throw 'Unauthorized access'
}

module.exports = async (req, res, next) => {
    try {
        if (!_.isEmpty(_.filter(ignoredPaths, (p) => p === req.originalUrl))) {
            return next()
        }

        const { token } = req.headers

        const userInformation = await db.user.find({ token })

        await verifyUser(userInformation)
        console.log(userInformation)
        console.log('User ' + userInformation[0].username + ' logged in!')
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({ error: 401, message: 'Unauthorized access' })
    }
}
