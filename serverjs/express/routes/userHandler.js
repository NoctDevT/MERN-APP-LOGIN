const userSchema = require('../../mongoDB/userSchema');
const tokenSchema = require('../../mongoDB/tokenSchema');

const express = require('express')
const app = express();
const crypto = require("crypto");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')
const { SendRecoveryEmail, sendConfirmationEmail } = require('../email/recoverPassword')

const { registerValidation, loginValidation } = require('../validation/validation');





app.post('/register', async (req, res) => {

    const submitStatus = await registerValidation(req.body).then(status => { return status })
    const { error } = submitStatus

    if (error === true) return res.status(400).json(submitStatus);


    // Do a check to see if the email or email is being used 
    const emailExist = await userSchema.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({ message: 'Email already exists' })

    const usernameExists = await userSchema.findOne({ username: req.body.username })
    if (usernameExists) return res.status(400).json({ message: 'Username already exists' })

    //hash passwords -- research better encryption hashes 
    const salt = await bcrypt.genSalt(10)
    const hashPasword = await bcrypt.hash(req.body.password, salt)

    const user = new userSchema({
        username: req.body.username,
        email: req.body.email,
        password: hashPasword
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({ message: 'Successfully registered', user: user._id, redirectUrl: '/Login', success: true });
    } catch (err) {
        res.status(400).json({ message: err });
    }
})


app.post('/login', async (req, res) => {

    const submitStatus = await loginValidation(req.body).then(status => { return status })
    const { error } = submitStatus


    // console.log(submitStatus)
    if (error === true) return res.status(400).send(submitStatus);
    //if email exists
    const user = await userSchema.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: 'Email is not registered' });
    //Password incorrect
    const isPassValid = await bcrypt.compare(req.body.password, user.password)
    if (!isPassValid) return res.status(400).json({ message: 'invalid password' });


    //JWT token has been assigned 
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: "2h" })


    res.cookie("token", token, {
        httpOnly: true,

    });

    res.status(200).json({ message: 'Logged in', success: true, redirectUrl: '/Home' })
    // res.header('auth-token', token).send(token);
    // res.send('logged in');
})






app.post('/resetPassword', async (req, res) => {
    let resetToken = await tokenSchema.findOne({ email: req.body.email })
    if (!resetToken) return res.status(400).json({ message: 'Invalid or expired token' })

    const isValid = await bcrypt.compare(req.body.token, resetToken.token);
    if (!isValid) return res.status(400).json({ message: 'Invalid or expired token' })


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt);

    await userSchema.updateOne(
        { email: req.body.email },
        { $set: { password: hash } },
        { new: true }
    )

    const user = await userSchema.findOne({ email: req.body.email })

    sendConfirmationEmail(user.email, 'Your password has been changed')

    await resetToken.deleteOne();

    return res.status(200).json({ message: 'Password has successfully been changed' })


    // if (!req.body.email) return res.status(400).json({ message: 'Please provide your email' })

    // recoverPassword(email )
})




app.post('/sendResetEmail', async (req, res) => {
    if (!req.body.email) return res.status(400).json({ message: 'Please provide your email' })

    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: 'No account is registered to this email' })

    let token = await tokenSchema.findOne({ email: req.body.email });

    if (token) await token.deleteOne()

    let resetToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(resetToken, Number(salt))

    await new tokenSchema({
        email: user.email,
        token: hash,
        createdAt: Date.now()
    }).save();

    //Change in development
    let clientURL = 'http://localhost:3000'
    const link = `${clientURL}/resetPassword?token=${resetToken}&email=${user.email}`

    SendRecoveryEmail(user.email, link)
    res.status(200).json({ message: 'Email has been sent' })

})













// Only works if the web token acquired is sent as a header

app.get('/account/info', verify, (req, res) => {

    const userID = req.user._id

    var userData = 0;

    const data = userSchema.findById(userID)
        .exec((err, data) => {

            if (err) res.status(400).send('Something went wrong, please try again')

            res.send({
                id: data._id,
                username: data.username,
                email: data.email,
                date: data.date,

            })
        })



});

app.get('/account/signedin', verify, (req, res) => {

    const userID = req.user._id;

    const userSearch = userSchema.findById(userID)
        .exec((err, data) => {

            if (err) res.status(400).json({ message: 'User has not been found', loggedIn: false })

            res.status(200).json({
                message: 'User is logged in',
                loggedIn: true,
                redirectUrl: '/Home'

            })
        })

})















module.exports = app