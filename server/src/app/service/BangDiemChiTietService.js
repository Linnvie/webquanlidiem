const BangDiemChiTietDao = require('../dao/BangDiemChiTietDao');
const LTCDao = require('../dao/LopTinChiDao');
const pag = require('../utils/paginate');
const doiDiem = require('../utils/doiDiem');
class BangDiemChiTietService{
    async findAll(MSSV){    
        const all= await BangDiemChiTietDao.findAllHocKiAndNam(MSSV);
        if(all===2){
            return 2;
        }
        // var i=0;
        // let key="";
        // return all.reduce( function(acc, currentValue){
        //     console.log("trước",key,i,acc);
        //     key=`${currentValue.Nam}_${currentValue.HocKi}`;
        //     console.log("giũa",key,i,acc)
        //     acc[key]= new Promise((resolve, reject) => {
        //         resolve(BangDiemChiTietDao.findAllByMSSV(MSSV,currentValue.HocKi,currentValue.Nam))
        //     })
        //     i=i+1;
        //     console.log("sau",key, i, acc)
        //     return acc;
        // },{});
        const response={};
        var key="";
        for (const item of all){
            key=`${item.Nam}_${item.HocKi}`;
            const subjects= await BangDiemChiTietDao.findAllByMSSVAndHocKi(MSSV,item.HocKi,item.Nam);
            var tongTinChi=0;
            var tongHe4=0;
            response[key]={
                subjects: subjects,
                TB10: await subjects.reduce(function(acc, currentValue){
                                        tongTinChi+=currentValue.SoTinChi;
                                        tongHe4=tongHe4+doiDiem.ChuSang4(currentValue.KQ)*currentValue.SoTinChi;
                                        return acc+currentValue.DiemTrungBinh*currentValue.SoTinChi;
                                    },0)/tongTinChi,
                TB4:tongHe4/tongTinChi
            }
        }
        return response;      
    }


    async bangDiemTong(MSSV){    
        // const all= await BangDiemChiTietDao.findAllByMSSV(MSSV);
        // if(all===2){
        //     return 2;
        // }
        // const response={};
        // var tongTinChi=0;
        // var tongHe4=0;
        // await subjects.reduce(function(acc, currentValue){
        //     tongTinChi+=currentValue.SoTinChi;
        //     tongHe4=tongHe4+doiDiem.ChuSang4(currentValue.KQ)*currentValue.SoTinChi;
        //     return acc+currentValue.DiemTrungBinh*currentValue.SoTinChi;
        // },0)/tongTinChi,
        // return response;
          
    }

    async update(diemChiTiet){    
        if(await BangDiemChiTietDao.findOneByMSSVAndMaLTC(diemChiTiet.MSSV, diemChiTiet.MaLTC)===2){
            return 2;
        }
        return await BangDiemChiTietDao.update(diemChiTiet);      
    }

    async dangKiLTC(newDK){   
        const check= await LTCDao.findOneByMaLTC(newDK.MaLTC);
        if(check.TrangThai===1 && check.SoLuongDK<check.SoSVToiDa ){
            if(await BangDiemChiTietDao.findOneByMSSVAndMaLTC(newDK.MSSV, newDK.MaLTC)===2){
                return await BangDiemChiTietDao.save(newDK);
            }
            return 2;
        }
        return 3;          
    }

    async findALLByMaLTC(obj){
        const total = await BangDiemChiTietDao.countAllByMaLTC(obj);
        if(total===0){
            return 2;
        }
        if(total>0){
            return await pag.paginate(obj, total, BangDiemChiTietDao.findAllByMaLTC);
        }
        return null;     
    }

}

module.exports = new BangDiemChiTietService();