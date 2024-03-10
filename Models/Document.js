const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type:String
    }
})

const document = mongoose.model('Document' , documentSchema);
module.exports = document;