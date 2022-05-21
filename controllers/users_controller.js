
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

  const { email, password} = req.body;

  try {
    let usuario = await Usuario.findOne({email});

    if ( usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya se encuentra registrado'
      });
    }

    usuario = new Usuario(req.body);

    //encrypt password
    const salt = bcrypt.genSaltSync();
    
    //set password
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    //JWT generate
    const token = await generarJWT(usuario.id, usuario.name);
    
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Porfavor comuniquese al adm',
      error: err
    })
  }
  
}
 
const loginUser = async (req,res = response) => {

  const {email, password} = req.body;

  try {
    const usuario = await Usuario.findOne({email});

    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario/Contraseña son incorrectos'
      });
    }

    //Compare Passwords
    const validPassword = bcrypt.compareSync( password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      })
    }

    //JWT generate
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Porfavor comuniquese al adm'
    })
  }

 
}

const renewToken = async (req,res) => {

  const {uid, name}= req;

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
    uid,
    name
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}