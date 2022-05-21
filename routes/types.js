const { Router } = require('express');
const { check } = require('express-validator');

const { listPetType, createPetType } = require('../controllers/pets_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatejwt } = require('../middlewares/validar-jwt');

const router = Router();

//router.use( validatejwt );

// Route
// api/types/

//List types
router.get('/',
    listPetType);

// Crear types
router.post('/create',
    [
        check('name','El Type es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createPetType);


module.exports = router;