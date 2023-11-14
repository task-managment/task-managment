const userController = require('../controllers/userController');
const express = require('express');
const app = express();
const router = express.Router();



router.post('/register', userController.register);
router.post('/login', userController.login);



module.exports = router;








