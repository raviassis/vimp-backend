var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var tokenH = req.headers['authorization'];

    if (!tokenH) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(tokenH, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        
        req.user = decoded;
        next();
    });
};