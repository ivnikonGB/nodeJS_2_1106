const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const Users = require('../db/models/users');

module.exports = {
    async createAccount(req, res) {
        try {
            const errors = validationResult(req); 
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            const { login, password, basket } = req.body;
            if(await Users.findOne({ login })) {
                return res.status(400).json({ message: 'login occupied'});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newItem = await Users.create({
                login, password: hashedPassword, basket
            });
            res.json( {_id: newItem._id });
        }
        catch(err) {
            console.log('USERCREATE' + err);
            res.json({status:false});
        }
    },
    async login(req, res) {
        try {
            const errors = validationResult(req); 
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            const { login, password } = req.body;
            const users = await Users.find({ login });
            if(users.length) {
                const user = users[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch) {
                    return res.sendStatus(404);    
                }
                const token = jwt.sign(
                    { userId: user._id },
                    config.get('jwtSecret'),
                    { expiresIn: '1h' }
                )
                res.json({
                    _id: user._id,
                    login: user.login,
                    basket: user.basket,
                    admin: user.admin,
                    token: token
                })
            } else {
                res.sendStatus(404);
            }
        }
        catch(err) {
            console.log("USERLOGIN " + err);
            res.json({status:false});
        }
    }
}