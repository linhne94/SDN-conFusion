const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Currency = mongoose.SchemaTypes.Decimal128;
// cmmt schema
var commentSchema = new Schema({
        rating:  {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment:  {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
        timestamps: true
    });
    
    
const DishesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
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
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, {
    timestamps: true
})
const Dishes = mongoose.model('Dishes' , DishesSchema )
module.exports = Dishes