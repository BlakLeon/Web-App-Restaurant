var mongoose =  require('mongoose')
var Schema =  mongoose.Schema

var bookingSchema = new Schema({
    name:{ type:String, required: true},
    email:{ type: String, required: true},
    phone:{ type: String, required: true},
    date: { type: String, required: true},
    timezone: { type: String, required: true},
    persons: {type: Number, required: true},
    car: {type: String, default: "off"},
    status:{type: Boolean, default: false}
})

module.exports = mongoose.model('Booking', bookingSchema)