const joi = require('joi');

class Mon{
    #MaMon;
    #TenMon;
    #SoTinChi;
    #SoTietLiThuyet;
    #SoTietThucHanh;
    #HeSo1;
    #HeSo2;
    #HeSo3;
    constructor(mon) {
        this.#MaMon = mon.MaMon;
        this.#TenMon = mon.TenMon;
        this.#SoTinChi = mon.SoTinChi;
        this.#SoTietLiThuyet = mon.SoTietLiThuyet;
        this.#SoTietThucHanh = mon.SoTietThucHanh;
        this.#HeSo1 = mon.HeSo1;
        this.#HeSo2 = mon.HeSo2;
        this.#HeSo3 = mon.HeSo3;
      }   
}

const validateMon = function(data){
    const model = joi.object({
        MaMon : joi.string().min(6).required(),
        TenMon : joi.string().required(),
        SoTinChi : joi.number().integer().min(1).max(4).required(),
        SoTietLiThuyet : joi.number().integer().min(4).max(100).required(),
        SoTietThucHanh : joi.number().integer().min(0).max(100).required(),
        HeSo1: joi.number().min(0).max(1).precision(2),
        HeSo2: joi.number().min(0).max(1).precision(2),
        HeSo3: joi.number().min(0).max(1).precision(2)
    })
    return model.validate(data);
}

const validateUpdateMon = function(data){
    const model = joi.object({
        MaMon : joi.string().min(6).required(),
        TenMon : joi.string(),
        SoTinChi : joi.number().integer().min(1).max(4),
        SoTietLiThuyet : joi.number().integer().min(4).max(100),
        SoTietThucHanh : joi.number().integer().min(0).max(100),
        HeSo1: joi.number().min(0).max(1).precision(1),
        HeSo2: joi.number().min(0).max(1).precision(2),
        HeSo3: joi.number().min(0).max(1).precision(2)
    })
    return model.validate(data);
}

module.exports ={Mon, validateMon,validateUpdateMon}