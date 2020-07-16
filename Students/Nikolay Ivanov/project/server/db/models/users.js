const db = require('mongoose');
const Schema = db.Schema;

let userSchema = new Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
    basket: { type: String, required: false, default: '' },
});

module.exports = db.model('USERS', userSchema);