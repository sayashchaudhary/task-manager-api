const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            res.status(401).send('Invalid Token')
        }

        const tokenDecode = jwt.decode(token, "taskmanagaerapi");
        const user = await User.findOne({ _id: tokenDecode._id, 'tokens.token': token });

        if (!user) {
            res.status(400).send('User not found')
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate!' })
    }
}

module.exports = auth;
