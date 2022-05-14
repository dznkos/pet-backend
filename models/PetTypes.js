const { Schema, model } = require('mongoose');

const PetTypeSchema = Schema({
        
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    }
});

module.exports = model('PetType', PetTypeSchema);