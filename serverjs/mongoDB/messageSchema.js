const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    userName: String,
    messageDetails: [
        {
            message: String,
            timestamp: String,
        }
    ]
});

const saveMessage = mongoose.model('user_messages', messageSchema);
module.exports = saveMessage;




