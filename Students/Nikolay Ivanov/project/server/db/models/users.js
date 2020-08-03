const db = require('mongoose');
const Schema = db.Schema;

const userSchema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false },
    basket: { type: String, required: false, default: '' },
});

module.exports = db.model('USERS', userSchema);