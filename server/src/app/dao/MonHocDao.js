const db = require('../utils/connect');
const {Mon} = require('../models/MonModel');
class MonHocDao{
    findPaginate(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM mon 
            WHERE MaMon LIKE '%${obj.keyWord}%' OR TenMon LIKE '%${obj.keyWord}%'
            LIMIT ${obj.startLimit},${obj.perPage} `, function(err, subjects){
                if(err){
                    console.log(err)
                    return reject(null);  
                }else{  
                    const data = 
                    subjects.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(subjects)));
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

    countAll(obj){
        return new Promise(function(resolve, reject){
            db.query(`SELECT count(*) AS count FROM mon WHERE MaMon LIKE '%${obj.keyWord}%' OR TenMon LIKE '%${obj.keyWord}%'`, function(err, response){
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

    findOneByMaMon(maMon){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM mon WHERE MaMon = ?", maMon, function(err, response){
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

    save(newSubject){
        return new Promise(function(resolve, reject){
            console.log(newSubject)
            db.query("INSERT INTO mon SET ?",newSubject, function(err, response){
                if(err){
                    return reject(null);  
                }else{ 
                    return resolve(newSubject);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }

    update(newSubject){
        return new Promise(function(resolve, reject){
            db.query("UPDATE mon SET ? WHERE MaMon=?", [newSubject, newSubject.MaMon], function(err, response){
                if(err){
                    console.log(err)
                    reject(null);  
                }else{ 
                     resolve({MaMon :newSubject.MaMon});
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }
}

module.exports = new MonHocDao();