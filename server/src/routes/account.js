const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');
router.post('/login', accountController.login);
router.post('/refresh-token', accountController.refresh);
router.get('/:username', accountController.getByUsername);
router.put('/doi-mk', accountController.updatePassword);
router.post('/them-tk-sv', accountController.saveStudent);
router.delete('/logout', accountController.logout);

module.exports = router;