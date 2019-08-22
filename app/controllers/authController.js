const { User } = require('../models');
var jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    const body = req.body;

    User.findOne({
        attributes: ['name', 'email'],
        where: {
            email: body.email,
            password: body.password
        },
    })
    .then((user) => {
        
        if(!user){
            res.status(401).send({message: "Failed to authenticate credentials"});
        }
        else {
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.SECRET, { expiresIn: 30000 });
            user.dataValues.token = token;
            res.status(200).json(user);
        }        
    }).catch((err) => { next(err)});

};