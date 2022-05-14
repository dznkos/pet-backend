const { Schema, model } = require('mongoose');

const RoleSchema =  Schema({
    
    role: {
        type: String, 
        unique: true,
        required: true,
        uppercase: true
    }  
});

module.exports = model('Role', RoleSchema);