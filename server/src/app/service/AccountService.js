const accountDao = require('../dao/AccountDao');
const bcrypt = require('bcrypt');

class AccountService{
    async findAll(result){
        return await accountDao.findAll(result);
    }

    async findOne(username, password, result){
        var data= await accountDao.findOneByUsername(username);
        if(data === 2){
            return result(2);
        }
            bcrypt
                .compare(password, data.password)
                .then(res => {
                    console.log(res) // return true 
                    if (res){
                        return result(data);
                    }else{
                        return result(null); 
                    }                                  
                })
                .catch(err => console.error(err.message))           
    }

    // async save(newAccount){
    //     var check= await accountDao.findOneByUsername(newAccount.username);
    //     if (check === 2){
    //         return new Promise(function(resolve, reject){
    //             bcrypt.genSalt(10)
    //             .then(salt => {
    //                 return bcrypt.hash(String(newAccount.password), salt);
    //             })
    //             .then(async hash => {
    //                 newAccount.password=hash;
    //                 resolve(await accountDao.save(newAccount));
    //             })
    //             .catch(err => reject(err.message))
    //         })   
    //         .then(function(data){
    //             return data;
    //         })
    //         .catch(function(err){
    //             return err;
    //         })
         
    //     }else{
    //         return 2;
    //     }    
    // }

    async saveStudent(newAccount, newStudent){
        var check= await accountDao.findOneByUsername(newAccount.username);
        console.log(check)
        if (check === 2){
            return new Promise(async function(resolve, reject){
                bcrypt.genSalt(10)
                .then(salt => {
                    return bcrypt.hash(String(newAccount.password), salt);
                })
                .then(async hash => {
                    newAccount.password=hash;
                    console.log(newAccount,newStudent)
                    resolve(await accountDao.saveStudent(newAccount,newStudent));
                })
                .catch(err => reject(err.message))
            })   
            .then(function(data){
                console.log(data)
                return data;
            })
            .catch(function(err){
                return err;
            })        
        }else{
            return 2;
        }    
    }

    async update(newaccount){
        var check= await accountDao.findOneByUsername(newaccount.username);
        if (check !== 2){
            return new Promise(function(resolve, reject){
                bcrypt.genSalt(10)
                    .then(salt => {
                        return bcrypt.hash(String(newaccount.password), salt);
                    })
                    .then(async hash => {
                        newaccount.password = hash;
                        resolve(await accountDao.update(newaccount));
                    })
                    .catch(err => reject(err.message)) 
            })   
            .then(function(data){
                return data;
            })
            .catch(function(err){
                return err;
            })    
        } else{
            return 2;
        }
    }
}

module.exports = new AccountService();