const { Schema, model } = require('mongoose');

const UsuarioSchema =  Schema({
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    }
  ],
  role: { 
    type: [
      "USER",
      "ADMIN"
    ], 
    default: "USER"
  } 
});

module.exports = model('Usuario', UsuarioSchema);