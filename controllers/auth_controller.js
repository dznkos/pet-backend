
const { response } = require('express');

const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const createUser = async (req, res = response) => {

  // const {name, email, password} = req.body;

  const usuario = new Usuario(req.body);

  await usuario.save();

  //catch errors
  const errors = validationResult(req);
  if( !errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  res.status(201).json({
    ok: true,
    msg: 'registro',
    name,
    email,
    password
  })
}
 
const loginUser = (req,res = response) => {

  const {email, password} = req.body;

  //catch errors
  const errors = validationResult(req);
  if( !errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  })
}

const renewToken = (req,res) => {

  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}