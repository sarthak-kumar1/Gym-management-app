const mongoose = require('mongoose');

const fileMetaSchema = new mongoose.Schema({
fileName: String,
key: String,
type: { type: String }, // "profileImage" or "certificates"
contentType: String,
uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FileMeta', fileMetaSchema);