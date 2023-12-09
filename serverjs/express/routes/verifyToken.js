const jwt = require('jsonwebtoken');

//middleware function that privates routes unless they have an access
//token that allows them access 

function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Access Denied', loggedin: false })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    } catch (err) {
        res.clearCookie("token")
        res.status(400).send('Invalid Token')
        res.redirect('/Login')

    }
}

module.exports = auth;


