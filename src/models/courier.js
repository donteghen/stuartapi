const {Schema, model} = require('mongoose')

const courierSchema = new Schema({
    max_capacity: {
        type: Number,
        required:true
    },
    curr_capacity: {
        type: Number,
        required:true
    },
    available_capacity: {
        type: Number,
        required:true
    }
})

const Courier = model('Courier', courierSchema)

module.exports = Courier