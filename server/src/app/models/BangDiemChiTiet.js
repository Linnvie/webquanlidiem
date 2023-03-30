const joi = require('joi');

class BangDiemChiTiet{
    #MSSV;
    #MaLTC;
    #DiemHe1;
    #DiemHe2;
    #DiemHe3;
    #DiemTB;
    #Lan;
    constructor(bangDiemCT) {
        this.#MSSV = bangDiemCT.MaMon;
        this.#MaLTC = bangDiemCT.TenMon;
        this.#DiemHe1 = bangDiemCT.DiemHe1;
        this.#DiemHe2 = bangDiemCT.DiemHe2;
        this.#DiemHe3 = bangDiemCT.DiemHe3;
        this.#DiemTB= bangDiemCT.DiemTB;
        this.#Lan =bangDiemCT.Lan;
      }   
}

const validateBangDiemChiTiet = function(data){
    const model = joi.object({
        MSSV : joi.string().min(6).required(),
        MaLTC : joi.string().required(),
        DiemHe1: joi.number().min(0).max(10),
        DiemHe2: joi.number().min(0).max(10),
        DiemHe3: joi.number().min(0).max(10),
        DiemTB : joi.number().min(0).max(10),
        Lan : joi.number().integer().min(0).max(10)
    })
    return model.validate(data);
}

module.exports ={BangDiemChiTiet, validateBangDiemChiTiet}