const { response } = require('express');

const Pet = require('../models/Pet');
const Usuario = require('../models/Usuario');

const addFavorite = async (req, res = response) => {
    
    const idPet = req.params.id;
    const uid = req.uid;

    try {

        const { favorites } = await Usuario.findById(uid);

        const existFav = favorites.includes( idPet )
        
        if (existFav) {
            return res.status(400).json({
                ok: true,
                msg: "Ya existe en favoritos"
            })   
        } else {            
            Usuario.findByIdAndUpdate(
                uid,
                {$addToSet:{favorites: idPet }},
                {safe: true, new:true},(err,res) => {                 
                    console.log(err);
            }); 
            return res.status(200).json({
                ok: true,
                msg: "Se agrego pet a favoritos"
            })   
        }           

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }    
}

const listFavorite = async (req, res = response) => {

    try {
        const { favorites } = await Usuario.findById(req.uid);

        res.json({
            ok: true,
            fav: favorites
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }    

}

const deleteFavorite = (req, res = response) => {

    const idPet = req.params.id;
    const uid = req.uid;

    try {

        Usuario.findByIdAndUpdate(
            uid,
            {$pull: { favorites: idPet } },
            {safe: true, multi: true},(err,res) => {                 
                console.log(err);
        }); 

        res.status(200).json({
            ok: true,
            msg: "Se elimino pet de favoritos"
        })   

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
        })
    } 

}

module.exports = {
    addFavorite,
    listFavorite,
    deleteFavorite
}