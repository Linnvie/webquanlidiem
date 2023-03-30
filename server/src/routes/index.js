const accountRoute = require('./account');
const siteRoute = require('./site');
const monHocRoute = require('./MonHoc');
const sinhVienRoute = require('./SinhVien');
const lopTCRoute = require('./LopTinChi');
const bangDiemChiTietRoute = require('./BangDiemChiTiet');
const authMiddleWare = require('../app/utils/_AuthMiddleWare');

function route(app){
    app.use('/account', accountRoute);
    app.use('/subject', monHocRoute);
    app.use('/student', sinhVienRoute);
    app.use('/ltc', lopTCRoute);
    app.use('/diem', bangDiemChiTietRoute);
    
    
    app.use(authMiddleWare.isAuth);
    app.use('/', authMiddleWare.isAdmin,siteRoute);
    //app.get('/', (req, res) => res.send('hello world'))
}

module.exports = route;