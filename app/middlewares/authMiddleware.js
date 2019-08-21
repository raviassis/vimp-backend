var jwt = require('jsonwebtoken');

exports.verifyJwt = (req, res, next) => {
    var tokenH = req.headers['x-access-token'];

    if (!tokenH) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(tokenH, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        
        req.user = decoded;
        next();
    });
};