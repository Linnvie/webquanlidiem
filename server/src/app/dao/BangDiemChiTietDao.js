const db = require('../utils/connect');
class BangDiemChiTietDao{
    findAllByMSSVAndHocKi(MSSV,hocKi,nam){
        return new Promise(function(resolve, reject){
            db.query(`SELECT MaMon, TenMon, MaLopTinChi, SoTinChi,
            HeSo1, HeSo2, HeSo3, DiemHe1,DiemHe2,DiemHe3, DiemTrungBinh, KQ
            FROM view_bang_diem_tb
            WHERE MSSV =? AND HocKi=${hocKi} AND Nam=${nam}`,MSSV, function(err, response){
                if(err){
                    console.log(err)
                    return reject(null);  
                }else{  
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(response)));
                    resolve(data);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    findAllByMSSV(MSSV){
        return new Promise(function(resolve, reject){
            db.query(`SELECT MaMon, TenMon, MaLopTinChi, SoTinChi,
            HeSo1, HeSo2, HeSo3, DiemHe1,DiemHe2,DiemHe3, DiemTrungBinh, KQ
            FROM view_bang_diem_tb
            WHERE MSSV =?`,MSSV, function(err, response){
                if(err){
                    console.log(err)
                    return reject(null);  
                }else{  
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(response)));
                    resolve(data);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
        }

    // findAllByMSSV(MSSV,hocKi,nam){
    //     return new Promise(function(resolve, reject){
    //         db.query(`SELECT MaMon, TenMon, MaLopTinChi
    //         HeSo1, HeSo2, HeSo3, DiemHe1,DiemHe2,DiemHe3, DiemTB, Lan
    //         FROM bangdiemchitiet INNER JOIN loptinchi 
    //         ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
    //         WHERE MSSV =? AND HocKi=${hocKi} AND Nam=${nam}`,MSSV, function(err, response){
    //             if(err){
    //                 console.log(err)
    //                 return reject(null);  
    //             }else{  
    //                 const data = 
    //                 response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(response)));
    //                 resolve(data);
    //             }  
    //         });
    //     })
    //     .finally(function(){
    //         db.end;
    //     })
    // }

    findAllHocKiAndNam(){
        return new Promise(function(resolve, reject){
            db.query(`SELECT HocKi,Nam FROM bangdiemchitiet INNER JOIN loptinchi ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
            WHERE MSSV ="N19DCPT033"
            GROUP BY HocKi, Nam
            ORDER BY Nam`, function(err, response){
                if(err){
                    console.log(err)
                    return reject(null);  
                }else{  
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(response)));
                    return resolve(data);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    findAllByMaLTC(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT sinhvien.MSSV,HoLot,Ten, MaMon, MaLTC, DiemHe1,DiemHe2,DiemHe3, DiemTB, Lan
            FROM bangdiemchitiet INNER JOIN loptinchi 
            ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
            INNER JOIN sinhvien ON bangdiemchitiet.MSSV=sinhvien.MSSV
            WHERE bangdiemchitiet.MaLTC=?
            LIMIT ${obj.startLimit},${obj.perPage}`,obj.maLTC, function(err, response){
                if(err){
                    console.log(err)
                    return reject(null);  
                }else{  
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(response)));
                    resolve(data);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }
//ADMIN TÌM CÁC LỚP TÍN CHỈ 
    countAllByMaLTC(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT count(*) AS count 
            FROM bangdiemchitiet INNER JOIN loptinchi 
            ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
            WHERE MaLTC =? `, obj.maLTC,function(err, response){
                if(err){
                    return reject(null);  
                }else{  
                    return resolve(Object.values(JSON.parse(JSON.stringify(response)))[0].count);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    findOneByMSSVAndMaLTC(MSSV, MaLTC){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM bangdiemchitiet WHERE MSSV = ? AND MaLTC=? ",
            [MSSV, MaLTC], function(err, response){
                if(err ){
                    return reject(null);  
                }else{ 
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(response)))[0];
                    return resolve(data);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    save(newDK){
        return new Promise(function(resolve, reject){
            console.log(newSubject)
            db.query("INSERT INTO mbangdiemchitiet SET ? WHERE MSSV=? AND MaLTC=?",
            [newDK, newDK.MSSV, newDK.MaLTC], function(err, response){
                if(err){
                    return reject(null);  
                }else{ 
                    return resolve(esponse);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    update(diemChiTiet){
        return new Promise(function(resolve, reject){
            db.query("UPDATE bangdiemchitiet SET ? WHERE MSSV=? AND MaLTC=?",
             [diemChiTiet, diemChiTiet.MSSV, diemChiTiet.MaLTC], function(err, response){
                if(err){
                    reject(null);  
                }else{ 
                     resolve({MSSV :diemChiTiet.MSSV,
                            MaLTC: diemChiTiet.MaLTC});
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }
}

module.exports = new BangDiemChiTietDao();
// CREATE view_bang_diem_tb1 AS
// SELECT mon.MaMon, mon.TenMon, loptinchi.MaLopTinChi, mon.SoTinChi, mon.HeSo1, mon.HeSo2, mon.HeSo3, bangdiemchitiet.DiemHe1, bangdiemchitiet.DiemHe2, bangdiemchitiet.DiemHe3, fn_tinh_diem_tb(mon.HeSo1, mon.HeSo2, mon.HeSo3, bangdiemchitiet.DiemHe1, bangdiemchitiet.DiemHe2, bangdiemchitiet.DiemHe3) AS DiemTrungBinh, fn_tinh_diem_chu(fn_tinh_diem_tb(mon.HeSo1, mon.HeSo2, mon.HeSo3, bangdiemchitiet.DiemHe1, bangdiemchitiet.DiemHe2, bangdiemchitiet.DiemHe3)) AS KQ
//  FROM bangdiemchitiet INNER JOIN loptinchi
//  ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
//  INNER JOIN mon ON loptinchi.MaMon=mon.MaMon