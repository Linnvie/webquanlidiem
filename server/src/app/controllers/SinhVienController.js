const sinhVienService = require('../service/SinhVienService');

class SinhVienController{
    async findAllByLop(req, res){
        try {
            const obj={};
            obj.currentPage=req.query.currentPage || 1;
            obj.perPage=req.query.perPage || 1;
            var response={};
            if(req.query.maLop){
                obj.maLop= req.query.maLop || "";
                response = await sinhVienService.findAllByMaLop(obj);
            }
            if(req.query.maLTC){
                obj.maLTC= req.query.maLTC || "";
                response = await sinhVienService.findAllByMaLTC(obj);

            }   
            console.log("com", response)   
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: "Chưa tồn tại sinh viên nào!",
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            } else{
                return res.status(422).json({message : "Lỗi tìm kiếm"});
            }      
        } catch (error) {
            return res.status(422).json({message : "Lỗi"});
        }
    }
}

module.exports =  new SinhVienController();

