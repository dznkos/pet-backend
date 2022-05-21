const { Router } = require('express');
const { check } = require('express-validator');
const { addFavorite, listFavorite, deleteFavorite } = require('../controllers/favorites_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatejwt } = require('../middlewares/validar-jwt');

const router = Router();

router.use( validatejwt );

// Route
// api/favorites/

//Agregar Pet Favorito
router.post('/pets/:id',
    addFavorite);

//Obtener Todos Favoritos
router.get('/pets',
    listFavorite);   

// Eliminar Pet Favorito
router.delete('/:id',
    deleteFavorite);

module.exports = router;