const { Router } = require('express');
const { check } = require('express-validator');

const { listRole, createRole } = require('../controllers/rol_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatejwt } = require('../middlewares/validar-jwt');

const router = Router();

router.use( validatejwt );

// Route
// api/rol/

//List User rol
router.get('/',
    listRole);

// Crear User rol
router.post('/',
    [
        check('role','El nombre de Role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createRole);


module.exports = router;