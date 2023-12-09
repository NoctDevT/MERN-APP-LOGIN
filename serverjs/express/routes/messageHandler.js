const mongoData = require('../../mongoDB/messageSchema');
const express = require('express')
const userSchema = require('../../mongoDB/userSchema')
const app = express();

const verify = require('./verifyToken')


app.post('/new/user', (req, res) => {
    const dbData = req.body;
    console.log(req.body)
    mongoData.create(dbData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// Private route which you cannot access without auth token 

app.get('/check', verify, (req, res) => {


    res.json({
        posts: {
            title: "User Data",
            description: "This data you should not be able to see without being logged in.",
            user: req.user,
        }
    });
});


app.post('/new/message', (req, res) => {
    const newMessage = req.body;

    if (!req.query.id) return res.status(500).send("No ID specified in Param field")

    mongoData.findOneAndUpdate(
        { _id: req.query.id },
        { $push: { messageDetails: req.body, timestamp: new Date().toISOString() } },
        (err, data) => {
            console.log(req.body)
            if (err) {
                console.log('Error saving message...' + '\n', + err)
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        })
});


app.post('/get/messages', (req, res) => {
    const id = req.query.id

    mongoData.find({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
})




//get point
app.get('/get/userList', (req, res) => {
    mongoData.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let users = [];

            data.map((userData) => {
                console.log(userData)
                const userInfo = {
                    id: userData._id,
                    name: userData.userName
                }
                users.push(userInfo)
            })

            res.status(200).send(users)
        }

    })
})



app.get('/get/test', (req, res) => {

    mongoData.findOne({})
        .sort({ 'messageDetails._id': -1 })
        .unwind({})
        .exec((err, data) => {
            console.log('hello world ')
            res.json(data)
        })

})

app.get('/get/test2', (req, res) => {

    mongoData.findOne({})
        .sort({ 'messageDetails._id': -1 })
        .unwind({})
        .exec((err, data) => {
            console.log('hello world ')
            res.json(data)
        })

})


module.exports = app