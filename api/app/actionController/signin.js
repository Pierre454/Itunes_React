const db = require('../schema/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

module.exports = async (req, res) => {
    const { username, password } = req.body
    const username_lower = _.toLower(username)

    try {
        const hash = (await db.user.findOne({ username_lower })).password

        bcrypt.compare(password, hash, async (err, result) => {
            if (result) {
                const { username, token, role } = await db.user.findOne({
                    username_lower,
                })

                if (!!token) {
                    await jwt.verify(token, 'shhhhh', async (err, decoded) => {
                        if (decoded) {
                            res.json({
                                message: `Hello, ${username}, you are logged in!`,
                                token,
                            })
                        }
                        if (err) {
                            const token = await jwt.sign(
                                {
                                    role,
                                },
                                'shhhhh'
                            )

                            console.log(token)
                            await db.user.updateOne({ username }, { token })

                            res.json({
                                message: `Hello, ${username}, you are logged in!`,
                                token,
                            })
                        }
                    })
                } else {
                    const token = await jwt.sign(
                        {
                            role,
                        },
                        'shhhhh'
                    )

                    console.log(token)
                    await db.user.updateOne({ username }, { token })

                    res.json({
                        message: `Hello, ${username}, you are logged in!`,
                        token,
                    })
                }
            } else {
                res.status(401)
            }
        })
    } catch (e) {
        res.status(401)
    }
}
