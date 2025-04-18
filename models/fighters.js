const mongoose = require('mongoose');

const fighterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
        required: true,
    },
    weight: {
        type: Number,
        min: 0,
        required: true,
    },
    ability: {
        type: String,
        required: true,
    }
})

const Fighter = mongoose.model('Fighter', fighterSchema)

module.exports = Fighter;
