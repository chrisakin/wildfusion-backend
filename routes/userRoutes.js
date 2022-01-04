const router = require('express').Router();
const userController = require('../controller/users')
const checkJWT = require('../middleware/check-jwt');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/oneuser',checkJWT, userController.getoneProfile);

module.exports = router;