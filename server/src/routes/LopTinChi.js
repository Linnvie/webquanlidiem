const express = require('express');
const router = express.Router();

const lopTinChiController = require('../app/controllers/LopTinChiController');

router.get('/', lopTinChiController.findAll);
// router.put('/doi-mk', accountController.update);
router.post('/them-ltc', lopTinChiController.save);
router.put('/sua-ltc', lopTinChiController.update);

module.exports = router;