const _APP = require('./_app');
let isAuth = async function (req, res, next){
    
    var jwr = require('./JWT');
    var token = req.headers.authorization;
    if (token){
        try{
            infor = await jwr.checkJWT(token, _APP.ACCESS_TOKEN);
            req.auth = infor;
            console.log(infor.data.role);
            req.role = infor.data.role;
            next()
            // if(infor.data.role=="admin"){
            //     next();
            // }else if(infor.data.role=="student"){
            //     return res.send("Bạn không có quyền admin");
            // }        
        } catch(err){
            return res.send({data:"Mã token không hợp lệ!"});
        }
    }else {
        return res.send({data:"Bạn chưa truyền mã token"});
    }
}

var isAdmin = function(req, res, next){
    if(req.role=="admin"){
        next();
    }else{
        return res.send("Bạn không có quyền admin");
    }
}

var isStudent = function(req, res, next){
    if(req.role=="student"){
        next();
    }else{
        return res.send("Vui lòng đăng nhập bằng tài khoản sinh viên");
    }
}

module.exports = {isAuth, isAdmin}