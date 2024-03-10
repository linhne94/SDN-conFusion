const Document = require('../Models/Document');


// show the list of documents

const index = (req, res, next) => {
    Document.find().then(response => {
        res.json({
            response
        })
    } )
    .catch(error => {
        res.json({
            message : 'An error Occured!'
        })
    })
}

// Show single document 

const show = (req, res, next) => {
    let docId = req.body.documentID;
    Document.findById(docId).then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : 'An error Occured!'
        })
    })
}

// add document 

const add = (req, res, next) => {
    let document = new Document({
        name: req.body.name,
        description : req.body.description
    })
    document.save().then(response => {
        
        res.json({
            message: 'okeoke '
        })
    })
}

// update document

const update = (req, res ,next ) => {
    let docID = req.body._id;
    console.log(docID)

    let updateData = {
        name: req.body.name,
        description: req.body.description

    }
    Document.findByIdAndUpdate(docID, {$set:updateData})
        .then(() => {
            res.json({
                message: 'Update success full'
            })
        })
        .catch(error => {
            res.json({
                message : error
            })
        })

}



module.exports = {
    index, show, add, update
}