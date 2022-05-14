const { response } = require('express');

const Rol = require('../models/Role');

const createRole = async (req,res = response) => {
  
    const newRol = new Rol( req.body );
    
    try {        
        const rolCreado = await newRol.save();

        res.json({
            ok: true,
            rolCreado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }
}

const listRole = async (req,res = response) => {

    try {
        const listRole = await Rol.find();

        res.json({
            ok: true,
            listRole
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }    
}
  
  module.exports = {
    listRole,    
    createRole
  }