const accountService = require('../service/AccountService');
const sinhVienService = require('../service/SinhVienService');
const jwt = require('../utils/JWT');
const client = require('../utils/redis');
const _APP = require('../utils/_app');
const {validateAccount} = require('../models/AccountModel');
const {validateAccountSV} = require('../models/SinhVienModel');

class AccountController{
    async findAll(req, res){
        try {
            const response = await accountService.findAll();
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: "Chưa tồn tại tài khoản nào!",
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            }       
        } catch (error) {
            console.log(error)
            return res.status(422).json({message : "Lỗi!"});
        }
    }

    getByUsername(req, res){
        accountService.findOneByUsername(req.params.username, function(response){
            res.send(response);
        })
    }
    
    // async save(req, res){
    //     try {   
    //         const { password,role, ...infor} = req.body;
    //         const newAccount = {
    //             username : req.body.MSSV,
    //             password,
    //             role
    //         } 
    //         var response1 = await accountService.save(newAccount);
    //         var response2 = await sinhVienService.save(infor);
 
    //         if(response1 === 2|| response2 === 2){
    //             return res.status(422).json({message : "Sinh viên đã tồn tại"});
    //         }

    //         const response = {...response1, ...response2}
            // Promise.all([response1, response2])
            // .then(function([result1, result2]){
            //     console.log("pen")
            //     return {...result1, ...result2};
            // })
    //         if(response1 && response2){  
    //             return res.status(200).json({
    //                 message:"ok",
    //                 data:response
    //             });
    //         }else {
    //             return res.status(422).json({message : "Thêm mới thất bại!"});
    //         }
    //     } catch (error) {
    //         return res.status(422).json({message : error});
    //     }
    // }

    async saveStudent(req, res){
        try {   
            const {error} = await validateAccountSV(req.body);
            if (error){
                return res.status(422).json({
                    message: error.details[0].message
                });
            }
            const { password,role, ...infor} = req.body;
            const newAccount = {
                username : req.body.MSSV,
                password,
                role,
                status:1
            } 
            var response = await accountService.saveStudent(newAccount, infor);
            console.log(response)
            if(response){  
                if(response === 2){
                    return res.status(200).json({message : "Sinh viên đã tồn tại"});
                }
                return res.status(200).json({
                    message:"ok",
                    data:response
                });
            }else {
                return res.status(422).json({message : "Thêm mới thất bại!"});
            }
        } catch (error) {
            return res.status(422).json({message : "Lỗi lưu!"});
        }
    }

    async update(req, res){
        try {   
            const { password,role, ...infor} = req.body;
            const newAccount = {
                username : req.body.MSSV,
                password,
                role
            } 
            var response1 = await accountService.update(newAccount);
            var response2 = await sinhVienService.update(infor);
 
            if(response1 === 2|| response2 === 2){
                return res.status(422).json({message : "Sinh viên không tồn tại"});
            }

            const response = {...response1, ...response2}
            if(response1 && response2){  
                return res.status(200).json({
                    message:"ok",
                    data:response
                });
            }else {
                return res.status(422).json({message : "Sửa thông tin thất bại!"});
            }
        } catch (error) {
            return res.status(422).json({message : "Sửa thông tin thất bại"});
        }
    }

     login(req, res){
       try{
            const {error} = validateAccount(req.body);
            if (error){
                return res.status(200).json({
                    message: error.details[0].message
                });
            }
            accountService.findOne(req.body.username,req.body.password, async function(response){
                if(response){
                    var sinhVien = await sinhVienService.findOneByMSSV(response.username)
                    if(response===2){
                        return res.status(200).json({message: `Không tồn tại tài khoản ${req.body.username}`});
                    }
                    if(!response.status){
                        return res.status(200).json({message: `Tài khoản ${req.body.username} đã bị khóa, vui lòng liên hệ admin để giải quyết`});
                    }
                    var infor = {
                        username : response.username,
                        role: response.role
                    }
                    var accessToken = await jwt.createJWT(infor,_APP.ACCESS_TOKEN,_APP.ACCESS_TOKEN_TIME_LIFE);
                    var refreshToken = await jwt.createJWT(infor,_APP.REFRESH_TOKEN,_APP.REFRESH_TOKEN_TIME_LIFE);
                   // res.send({token:token});
                    return res.status(200).json({accessToken,
                        refreshToken,
                        sinhVien
                    })
                }else{
                    return res.status(200).json({message: "Sai thông tin đăng nhập"});
                }
            })
       }catch (err){
            return res.status(422).json({message : err})
       }
    }

    async refresh(req, res){
        const refreshToken = req.body.refreshToken;
        if (refreshToken){
            try{
                const infor = await jwt.checkJWT(refreshToken, _APP.REFRESH_TOKEN);
                var accessToken = await jwt.createJWT(infor.data,_APP.ACCESS_TOKEN,_APP.ACCESS_TOKEN_TIME_LIFE);
                var newRefreshToken = await jwt.createJWT(infor.data,_APP.REFRESH_TOKEN,_APP.REFRESH_TOKEN_TIME_LIFE);
                return res.status(200).json({accessToken,
                    refreshToken: newRefreshToken
                })          
            } catch (err){
                return res.status(422).json({message : "RefreshToken không hợp lệ"})
            }
        }else{
            return res.status(422).json({message : "Không có refreshToken"})
        }
    }

    async logout(req, res){
        try {
            const refreshToken = req.body.refreshToken;
            if(refreshToken){
                const infor = await jwt.checkJWT(refreshToken, _APP.REFRESH_TOKEN);
                await client.del(infor.username.toString(), (err, reply)=>{
                    if(err){
                        return res.status(422).json({message : "Lỗi"})
                    }
                    return res.status(422).json({message : "logout successed"})
                })
            }
        } catch (error) {
            return res.status(422).json({message : "Lỗi"})
        }
    }

    async updatePassword(req, res){
        try {
            const response = await accountService.update(req.body);
            if(response){  
                if(response === 2){
                    return res.status(200).json({message : "Tài khoản không tồn tại"});
                }
                return res.status(200).json({
                    message:"ok",
                    data:response
                });
            }else {
                return res.status(422).json({message : "Sửa thất bại!"});
            }
        } catch (error) {
            return res.status(422).json({message : error});
        }
    }
}

module.exports = new AccountController();