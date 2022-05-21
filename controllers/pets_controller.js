const { response } = require('express');

const Pet = require('../models/Pet');
const PetType = require('../models/PetTypes');
const Usuario = require('../models/Usuario');

const listPet = async (req, res = response) => {

    const idPet = req.params.id;
    const uid = req.uid;

    try {
        const pets = [];
        const { favorites } = await Usuario.findById(uid);

        Pet.find()
            .select('-user')
            .lean()
            .exec( function (err, allpets) {
                    console.log(allpets)
                    // JSON.parse(JSON.stringify(rs));                    
                    
                    allpets.map( (p) => {
                        const isFav = favorites.includes( p._id )
                        
                        pets.push( isFav 
                            ? { ...p, tagFav: isFav } 
                            : { ...p, tagFav: isFav }  
                        );                                               
                    })                     

                    res.json({
                        ok: true,
                        pets
                    })  
                }
            )   
               
              
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }

}

const getPet = async (req, res = response) => {

    const petId = req.params.id;
    const uid = req.uid;

    try {
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                ok:false,
                msg:'Pet no existe en Base de datos'
            })
        }
    
        res.json({
            ok: true,
            pet
        }) 
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }    
}

const createPet = async (req, res = response) => {

    const pet = new Pet( req.body );

    try {
        pet.user = req.uid;
        const uid = req.uid;

        const { role } = await Usuario.findById(uid)

        if ( role != 'ADMIN') {
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegios para esta accion"
            })
        }

        const petSaved =  await pet.save();

        res.json({
            ok: true,
            pet: petSaved
        })

    } catch (error) {        
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }   
}

const updatePet = async (req, res = response) => {

    const petId = req.params.id;
    const uid = req.uid;

    try {
        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                ok:false,
                msg:'El Pet no existe en Base de datos'
            })
        }

        if ( pet.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegios para esta accion"
            })
        }

        const newPet = {
            ...req.body,
            user: uid
        }

        const petActualizado = await Pet.findByIdAndUpdate( petId, newPet, { new: true });

        res.json({
            ok: true,
            pet: petActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }

    
}

const deletePet = async (req, res = response) => {

    const petId = req.params.id;
    const uid = req.uid;

    try {

        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                ok:false,
                msg:'Pet no existe en Base de datos'
            })
        }

        if ( pet.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:"No tiene privilegios para esta accion"
            })
        }

        await Pet.findByIdAndDelete( petId );

        res.json({
            ok: true,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }
}

const listPetType = async ( req, res = response ) => {

    try {
        const petsTypes = await PetType.find();
    
        res.json({
            ok: true,
            petsTypes
        })        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }
}

const createPetType = async ( req, res = response ) => {

    const petType = new PetType( req.body );

    try {
        petType.user = req.uid;
                
        const newType =  await petType.save();

        res.json({
            ok: true,
            petType: newType
        })

    } catch (error) {        
        console.log(error);

        if(error.code = 11000){
            return res.status(500).json({
                ok:false,
                msg: 'El tipo de pet ya existe.'
            })
        }
        res.status(500).json({
            ok: false,
            msg:'Porfavor comuniquese al adm',
            err: error
        })
    }   
}

module.exports = {
    listPet,
    getPet,
    createPet,
    updatePet,
    deletePet,
    listPetType,
    createPetType
}