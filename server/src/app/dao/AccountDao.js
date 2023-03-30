const db = require('../utils/connect');
const svDao = require('./SinhVienDao');
class AccountDao{
    findAll(){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM account", function(err, response){
                if(err){
                    return reject(null); 
                }else{
                    const data = 
                    response.length===0 ? 2 : Object.values(JSON.parse(JSON.stringify(subjects)));
                    return resolve(data);
                }  
            });
        })
    }

    saveStudent(newAccount, newStudent){
        return new Promise(async function(resolve, reject){
            await db.beginTransaction();
            await  db.query("INSERT INTO account SET ?", newAccount, function(err, response){
                    if(err){
                        reject(null);
                    }else{
                        console.log(response)
                        resolve({username : newAccount.username,
                                role: newAccount.role});
                    }  
                });   
        }) 
        .then(async function(data){
            console.log(data)
            const student =  await svDao.save(newStudent); 
            console.log(student)
            return {...data,...student};      
        })
        .catch(function(err){
            db.rollback();
            return null;
        })
        .finally(async function(){
            await db.commit();
            db.end;
        })
    }

    // save(newAccount){
    //     return new Promise(function(resolve, reject){
    //         db.query("INSERT INTO account SET ?", newAccount, function(err, response){
    //             if(err || response.length==0 ){
    //                 return reject(null); 
    //             }else{
    //                 return resolve({username : newAccount.username,
    //                 role: newAccount.role});
    //             }  
    //         });
    //     })
    //     .finally(function(){
    //         db.end;
    //     })
    // }

    findOneByUsername(username){
        return new Promise(function(resolve, reject){
            db.query("SELECT * FROM account WHERE username = ?", username, function(err, response){
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

    update(newaccount){
        return new Promise(function(resolve, reject){
            db.query("UPDATE account SET ? WHERE username=?", [newaccount, newaccount.username], function(err, response){
                if(err){
                    return reject(null); 
                }else{
                    return resolve(newaccount.username);
                }  
            });
        })
        .finally(function(){
            db.end;
        })
    }
}


module.exports = new AccountDao();
