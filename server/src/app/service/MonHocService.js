const MonHocDao = require('../dao/MonHocDao');
const pag = require('../utils/paginate');
class MonHocService{
    async findAll(){
        return await MonHocDao.findAll();
    }

    async findOneByMaMon(maMon){
        return await MonHocDao.findOneByMaMon(maMon);
    }

    async save(newSubject){
        if (await MonHocDao.findOneByMaMon(newSubject.MaMon)===2){
            return await MonHocDao.save(newSubject);
        }
        return 2;
    }

    async update(newSubject){
        if (await MonHocDao.findOneByMaMon(newSubject.MaMon)===2){
            return 2;
        }
        return await MonHocDao.update(newSubject);
    }

    async findPaginate(obj){
        const total = await MonHocDao.countAll(obj);
        if(total===0){
            return 2;
        }
        if(total>0){
            return await pag.paginate(obj, total, MonHocDao.findPaginate);
        }
        return null;     
    }
}

module.exports = new MonHocService();