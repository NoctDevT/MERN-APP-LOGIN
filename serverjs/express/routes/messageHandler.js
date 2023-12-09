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

app.get('/check', verify, (req, res) => {
    res.json({
        posts: {
            title: "User Data",
            description: "This data you should not be able to see without being logged in.",
            user: req.user,
        }
    });
});

app.post("/new/message", (req, res) => {
  const newMessage = req.body;

  mongoData.findOneAndDelete({ userName: req.query.username }, (err, data) => {
    if (err) {
      console.log("Error finding/deleting message..." + "\n", err);
      res.status(500).send(err);
    } else {
      const messageToInsert = {
        ...newMessage,
      };
      mongoData.create(
        { userName: req.query.username, messageDetails: messageToInsert },
        (err, newData) => {
          if (err) {
            console.log("Error saving new message..." + "\n", err);
            res.status(500).send(err);
          } else {
            res.status(201).send(newData);
          }
        }
      );
    }
  });
});


app.get('/delete/message', (req, res) => {
    const username = req.query.username;
    mongoData.findOneAndDelete({ userName: req.query.username }, (err, data) => {
        if(err) res.status(500).send(err)
        res.status(200).send({message: `Successfully deleted message from ${username}`})
    })
})

app.get('/get/messages',  verify, (req, res) => {
    const username = req.query.username
    mongoData.find({ userID: username }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
})

app.get('/get/userList', verify, (req, res) => {
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