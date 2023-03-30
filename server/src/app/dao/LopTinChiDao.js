const db = require('../utils/connect');
class LopTinChiDao{
    findPaginate(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM loptinchi WHERE MaLopTinChi LIKE '%${obj.keyWord}%' LIMIT ${obj.startLimit},${obj.perPage} `, function(err, response){
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

    // findAll(maMon,tenMon){
    //     return new Promise(function(resolve, reject){
    //         db.query(`SELECT * FROM mon  WHERE MaMon LIKE '%${maMon}%' OR TenMon LIKE '%${tenMon}%' `, function(err, subjects){
    //             if(err){
    //                 console.log(err)
    //                 return reject(null);  
    //             }else{  
    //                 console.log(subjects)
    //                 const data = 
    //                 subjects.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(subjects)));
    //                 return resolve(data);
    //             }  
    //         });
    //     })
    //     .finally(function(){
    //         db.end;
    //     })
    // }

    countAll(){
        return new Promise(function(resolve, reject){
            db.query(`SELECT count(*) AS count FROM loptinchi WHERE MaLopTinChi LIKE '%${obj.keyWord}%'`, function(err, response){
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

    findOneByMaLTC(maLTC){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM loptinchi WHERE MaLopTinChi = ?", maLTC, function(err, response){
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

    findAllByMaMon(maMon){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM loptinchi WHERE MaMon = ?", maMon, function(err, response){
                if(err ){
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

    save(newLTC){
        return new Promise(function(resolve, reject){
            db.query("INSERT INTO loptinchi SET ?",newLTC, function(err, response){
                if(err){
                    return reject(null);  
                }else{ 
                    return resolve(newLTC.MaLopTinChi);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    update(newLTC){
        return new Promise(function(resolve, reject){
            db.query("UPDATE loptinchi SET ? WHERE MaLopTinChi=?", [newLTC, newLTC.MaLopTinChi], function(err, response){
                if(err){
                    reject(null);  
                }else{ 
                     resolve({MaLopTinChi :newLTC.MaLopTinChi});
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }
}

module.exports = new LopTinChiDao();