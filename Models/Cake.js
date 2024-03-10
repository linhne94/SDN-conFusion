const mongoose = require('mongoose');
const Currency = mongoose.SchemaTypes.Decimal128;
const Schema = mongoose.Schema
const toppingSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
    price_Extra: {
        type: Number,
        
    }
})
// const Topping = mongoose.model('Topping', toppingSchema);

const cakeSchema = new Schema({
    type: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    topping: [toppingSchema]
},{
    timestamps: true
})

const Cake = mongoose.model('Cakes', cakeSchema)
module.exports = Cake