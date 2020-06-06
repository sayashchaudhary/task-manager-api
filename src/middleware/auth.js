const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, 'taskmanagerapi');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            res.status(400).send('User not found')
        } else {
            req.user = user
            next()
        }
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth;
