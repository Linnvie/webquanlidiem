const jwt = require('jsonwebtoken');
const _APP = require('./_app');
const client = require('./redis');
let createJWT = function(account, tokenCode, exp){
    return new Promise(function(resolve, reject){
        jwt.sign({data: account}, tokenCode, 
            {
                algorithm : "HS256",
                expiresIn : exp
            },
            async function(err, token){
                if(err){
                    return reject(err);
                }
                if(tokenCode === _APP.REFRESH_TOKEN){
                    await client.set(account.username.toString(), token, "EX", 365*24*60*60, (err, reply) =>{
                        if(err){
                            return reject(err)
                        }
                   })
                }

                return resolve(token);
            })
    });
}

let checkJWT = function(token, tokenCode){
    return new Promise(function(resolve, reject){
        jwt.verify(token, tokenCode, async function(err, data){
            if(err){
                return reject(err);
            }
            if(tokenCode === _APP.REFRESH_TOKEN){
                //await client.connect();
                await client.get(data.data.username, (err, reply) => {
                    if(err){
                        return reject(err);
                    }
                    if(token===reply){
                        return resolve(data);
                    }else{
                        reject("Lỗi")
                    }
                })
                //await client.disconnect();
            }
           // return resolve(data);
        })
    })

}

module.exports = {createJWT, checkJWT}