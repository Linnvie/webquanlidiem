const express = require('express');
const router = express.Router();

const sinhVienController = require('../app/controllers/SinhVienController');

router.get('/',sinhVienController.findAllByLop );
// router.put('/doi-mk', accountController.update);
// router.post('/them-mon', monHocController.save);
// router.put('/sua-mon', monHocController.update);

module.exports = router;