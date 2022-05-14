const { Router } = require('express');
const { check } = require('express-validator');
const { listPet, getPet, createPet, updatePet, deletePet } = require('../controllers/pets_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatejwt } = require('../middlewares/validar-jwt');

const router = Router();

router.use( validatejwt );

// Route
// api/pets/

//list Pets
router.get('/',
    listPet);

//Obtener Pet
router.get('/:id',
getPet);   

// Crear Pets
router.post('/create',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('image_url','La imagen es obligatoria').not().isEmpty(),
        check('description','La description es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createPet);

// Actualizar Pet
router.put('/:id',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('age','La edad es obligatoria').not().isEmpty(),
        check('description','La descripcion es obligatoria').not().isEmpty(),
        check('image_url','La imagen es obligatoria').not().isEmpty(),
        validarCampos
    ],
    updatePet);

// Eliminar Pet
router.delete('/:id',
    deletePet);



module.exports = router;