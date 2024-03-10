const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Currency = mongoose.SchemaTypes.Decimal128;
const PromotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min : 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },

})
const Promotions = mongoose.model('Promotions' , PromotionSchema)
module.exports = Promotions