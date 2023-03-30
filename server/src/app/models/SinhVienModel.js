const joi = require('joi');
const validateAccountSV = function(data){
    const model = joi.object({
        // username : joi.string().required(),
        password : joi.string().min(3).max(20).required(),
        role : joi.string().min(3).max(50).required(),
        MSSV : joi.string().min(3).max(50).required(),
        HoLot : joi.string().min(3).max(80).required(),
        Ten : joi.string().min(3).max(20).required(),
        GioiTinh : joi.boolean().required(),
        NgaySinh : joi.date(),
        MaKhoa : joi.string().min(3).max(50).required(),
        MaLop : joi.string().min(3).max(50).required(),
        NienKhoa : joi.string().min(3).max(20).required(),
        HeHoc : joi.string().min(3).max(50).required(),
    })
    return model.validate(data);
}

module.exports ={validateAccountSV} 