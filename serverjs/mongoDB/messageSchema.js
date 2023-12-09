const mongoose = require('mongoose')


const messageSchema = mongoose.Schema({
    _id: String,
    userName: String,
    testField: String,
    messageDetails: [
        {
            message: String,
            timestamp: String,
        }
    ]
});


const saveMessage = mongoose.model('messages', messageSchema);


module.exports = saveMessage;




