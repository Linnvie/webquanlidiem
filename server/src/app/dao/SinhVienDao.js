const db = require('../utils/connect');
class SinhVienDao{
    findAll(){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM sinhvien ", function(err, students){
                if(err ){
                    return reject(null);  
                }else{  
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(students)));
                    return resolve(data);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    findAllByMaLop(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM sinhvien WHERE MaLop =? LIMIT ${obj.startLimit},${obj.perPage}`,obj.maLop, function(err, response){
                if(err ){
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

    countAllLop(maLop){
        return new Promise(function(resolve, reject){
            db.query(`SELECT count(*) AS count FROM sinhvien WHERE MaLop = ?`, maLop, function(err, response){
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

    findAllByMaLTC(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT sinhvien.MSSV,HoLot, Ten,GioiTinh,NgaySinh,MaLop,DiemHe1, DiemHe2,DiemHe3,DiemTB,Lan 
            FROM bangdiemchitiet INNER JOIN sinhvien
            ON bangdiemchitiet.MSSV=sinhvien.MSSV
            WHERE MaLTC = ? 
            LIMIT ${obj.startLimit},${obj.perPage}`,obj.maLTC, function(err, response){
                if(err ){
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

    countAllLTC(maLTC){
        return new Promise(function(resolve, reject){
            db.query(`SELECT count(*) AS count FROM bangdiemchitiet WHERE MaLTC = ?`,maLTC, function(err, response){
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


    findOneByMaSV(maSV){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM sinhvien WHERE MSSV = ?", maSV, function(err, response){
                if(err){
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

    save(newStudent){
        return new Promise(function(resolve, reject){
            db.query("INSERT INTO sinhvien SET ?",newStudent, function(err, response){
                if(err){
                   return reject(null);  
                }else{ 
                   return resolve(newStudent);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    update(newStudent){
        return new Promise(function(resolve, reject){
            db.query("UPDATE sinhvien SET ? WHERE MSSV=?", [newStudent, newStudent.MSSV], function(err, response){
                if(err){
                    reject(null);  
                }else{ 
                    resolve({MSSV :newStudent.MSSV});
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }
}

module.exports = new SinhVienDao();