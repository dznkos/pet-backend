const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, loginUser, renewToken } = require('../controllers/users_controller');
const { validatejwt } = require('../middlewares/validar-jwt');

const router = Router();

// Route
// api/users/

// Crear Usuario
router.post(
  '/create', 
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password debe tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
  ], 
  createUser);

// Login Usuario
router.post(
  '/login', 
  [
    check('email','El email no es valido').isEmail(),
    check('password','El password debe tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
  ], 
 loginUser);

// Revalidar Token
router.get('/renew', validatejwt, renewToken);

module.exports = router;