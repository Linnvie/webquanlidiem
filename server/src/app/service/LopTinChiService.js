const LopTinChiDao = require('../dao/LopTinChiDao');
const pag = require('../utils/paginate');
class LopTinChiService{
    async findAll(){
        return await LopTinChi.findAll();
    }

    async findOneByMaLTC(maLTC){
        return await LopTinChiDaoDao.findOneByMaLTC(maLTC);
    }

    async findAllByMaMon(maMon){
        return await LopTinChiDaoDao.findAllByMaMon(maMon);
    }

    async save(newLTC){
        console.log(await LopTinChiDao.findOneByMaLTC)
        if (await LopTinChiDao.findOneByMaLTC(newLTC.MaLopTinChi) === 2){
            return await LopTinChiDao.save(newLTC);
        }
        return 2;
    }

    async update(newLTC){
        if (await LopTinChiDao.findOneByMaLTC(newLTC.MaLopTinChi)===2){
            return 2;
        }
        return await LopTinChiDao.update(newLTC);
    }

    async findPaginate(obj){
        const total = await LopTinChiDao.countAll(obj);
        if(total===0){
            return 2;
        }
        if(total>0){
            return pag.paginate(obj, total, LopTinChiDao.findPaginate);
        }
        return null;     
    }
}

module.exports = new LopTinChiService();