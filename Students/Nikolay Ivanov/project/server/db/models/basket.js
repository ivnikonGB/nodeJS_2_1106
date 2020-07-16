const db = require('mongoose');
const Schema = db.Schema;

let basketSchema = new Schema({
    user_id: { type: String, required: true },
    items: { type: Array, required: false, default: [] },
});

module.exports = db.model('BASKET', basketSchema);