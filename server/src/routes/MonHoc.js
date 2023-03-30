const express = require('express');
const router = express.Router();

const monHocController = require('../app/controllers/MonHocController');

router.get('/', monHocController.findAll);
// router.put('/doi-mk', accountController.update);
router.post('/them-mon', monHocController.save);
router.put('/sua-mon', monHocController.update);

module.exports = router;