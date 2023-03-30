const express = require('express');
const router = express.Router();

const bangDiemChiTietController = require('../app/controllers/BangDiemChiTietController');

router.get('/', bangDiemChiTietController.findAll);
// router.put('/doi-mk', accountController.update);
// router.post('/them-ltc', lopTinChiController.save);
 router.put('/nhapdiem', bangDiemChiTietController.nhapDiem);
 router.get('/ltc', bangDiemChiTietController.findAllByMaLTC);

module.exports = router;