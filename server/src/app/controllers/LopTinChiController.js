const lopTinChiService = require('../service/LopTinChiService');
//const {validateMon} = require('../models/MonModel');

class LopTinChiController{
    // async findAll(req, res){
    //     try {
    //         const response = await monHocService.findAll();
    //         if(response){
    //             if(response===2){
    //                 return res.status(200).json({
    //                     message: "Chưa tồn tại môn học nào!",
    //                 });
    //             }
    //             return res.status(200).json({
    //                 message: "ok",
    //                 data : response
    //             });
    //         } else{
    //             return res.status(422).json({message : "Lỗi tìm kiếm"});
    //         }      
    //     } catch (error) {
    //         return res.status(422).json({message : "Lỗi"});
    //     }
    // }

    async findAll(req, res){
        try {
            console.log(req.query)
            const obj={
                keyWord : req.query.keyWord || "",
                currentPage: req.query.currentPage || 1,
                perPage: req.query.perPage || 1
            }
            const response = await monHocService.findPaginate(obj);
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: "Chưa tồn tại môn học nào!",
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

    async findOneByMaMon(req, res){
        try {
            const response = await monHocService.findOneByMaMon(req.body.maMon);
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: `Không tồn tại môn học có mã ${req.body.maMon}`,
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            }else{
                return res.status(422).json({message : "Lỗi tìm kiếm"});
            }      
        } catch (error) {
            return res.status(422).json({message : 'Lỗi'});
        }
    }

    async save(req, res){
        try {
            //const {error} = await validateMon(req.body);
            // if (error){
            //     return res.status(422).json({
            //         message: error.details[0].message
            //     });
            // }
            const response = await lopTinChiService.save(req.body);
            if(response){  
                if(response === 2){
                    return res.status(422).json({message : "Mã lớp tín chỉ đã tồn tại"});
                }
                return res.status(200).json({
                    message:"ok",
                    data:response
                });
            }else {
                return res.status(422).json({message : "Thêm thất bại!"});
            }
        } catch (error) {
            return res.status(422).json({message : "Thêm thất bại"});
        }
    }

    async update(req, res){
        try {
            // const {error} = await validateMon(req.body);
            // if (error){
            //     return res.status(422).json({
            //         message: error.details[0].message
            //     });
            // }
            const response = await monHocService.update(req.body);
            if(response){  
                if(response === 2){
                    return res.status(200).json({message : "Môn học không tồn tại"});
                }
                return res.status(200).json({
                    message:"ok",
                    data:response
                });
            }else {
                return res.status(422).json({message : "Sửa thất bại!"});
            }
        } catch (error) {
            return res.status(422).json({message : "Sửa thất bại"});
        }
    }
}

module.exports =  new LopTinChiController();