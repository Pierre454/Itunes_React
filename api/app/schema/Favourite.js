const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Favourite = new Schema({
    username: {
        type: String,
        required: true,
    },
    music: [],
    token: {
        type: String,
    },
})

module.exports = mongoose.model('favourite', Favourite)
