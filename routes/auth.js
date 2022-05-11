

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, loginUser, renewToken } = require('../controllers/auth_controller');

const router = Router();

router.post(
  '/new', 
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password debe tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
  ], 
  createUser);

router.post(
  '/', 
  [
    check('email','El email no es valido').isEmail(),
    check('password','El password debe tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
  ], 
 loginUser);

router.get('/renew', renewToken);



module.exports = router;