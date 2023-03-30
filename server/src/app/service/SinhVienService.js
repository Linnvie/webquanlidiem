const sinhVienDao = require('../dao/SinhVienDao');
const pag = require('../utils/paginate');
class SinhVienService{
    async findAll(){
        return await SinhVienDao.findAll();
    }

    async save(newStudent){
        if (await sinhVienDao.findOneByMaSV(newStudent.MSSV) === 2){
            return await sinhVienDao.save(newStudent);
        }
        return 2;
    }

    async findOneByMSSV(mssv){
        return await sinhVienDao.findOneByMaSV(mssv);
    }

    async update(newStudent){
        if (await sinhVienDao.findOneByMSSV(newStudent.MSSV) === 2){
            return 2;
        }
        return await sinhVienDao.update(newStudent);
    }

    async findAllByMaLop(obj){
        const total = await sinhVienDao.countAllLop(obj.maLop);
        if(total===0){
            return 2;
        }
        if(total>0){
            //console.log("vào khôg", await pag.paginate(obj, total, sinhVienDao.findAllByMaLop))
            //return 2
            return await pag.paginate(obj, total, sinhVienDao.findAllByMaLop);
        }
        return null;     
    }

    async findAllByMaLTC(obj){
        const total = await sinhVienDao.countAllLTC(obj.maLTC);
        if(total===0){
            return 2;
        }
        if(total>0){
            return await pag.paginate(obj, total, sinhVienDao.findAllByMaLTC);
        }
        return null;     
    }
}

module.exports = new SinhVienService();