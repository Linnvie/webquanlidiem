const BangDiemChiTietService = require('../service/BangDiemChiTietService');
const {validateBangDiemChiTiet} = require('../models/BangDiemChiTiet');

class BangDiemChiTietController{
    async findAll(req, res){
        try {
            const response = await BangDiemChiTietService.findAll(req.query.MSSV);
            //console.log("con", response)
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: "Bạn chưa đăng kí môn ở học kì nào",
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            }else{
                return res.status(422).json({message : "Lỗi tìm kiếm!"});
            }    
        } catch (error) {
            console.log(error)
            return res.status(422).json({message : "Lỗi!"});
        }
    } 

    async findAllByMaLTC(req, res){
        try {
            console.log(req.query)
            const obj={
                maLTC : req.query.maLTC,
                currentPage: req.query.currentPage || 1,
                perPage: req.query.perPage || 1
            }
            const response = await BangDiemChiTietService.findALLByMaLTC(obj);
            //console.log("con", response)
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: "Không tồn tại lớp tín chỉ nào ",
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            }else{
                return res.status(422).json({message : "Lỗi tìm kiếm!"});
            }    
        } catch (error) {
            console.log("loi",error)
            return res.status(422).json({message : "Lỗi!"});
        }
    } 
    
    async nhapDiem(req, res){
        try {
            const {error} = await validateBangDiemChiTiet(req.body);
            if (error){
                return res.status(422).json({
                    message: error.details[0].message
                });
            }
            const response = await BangDiemChiTietService.update(req.body);
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: `Không tồn tại sinh viên ${req.body.MSSV} trong lớp học phần ${req.body.MaLTC}`,
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            }else{
                return res.status(422).json({message : "Lỗi tìm kiếm!"});
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json({message : "Lỗi!"});
        }
    }


    async dkLTC(req, res){
        try {
            const response = await BangDiemChiTietService.dkLTC(req.body);
            if(response){
                if(response===2){
                    return res.status(200).json({
                        message: `Sinh viên ${req.body.MSSV} đã đăng kí lớp học phần ${req.body.MaLTC}`,
                    });
                }
                if(response===3){
                    return res.status(200).json({
                        message: `Lớp học phần ${req.body.MaLTC} đã đủ số lượng sinh viên`,
                    });
                }
                return res.status(200).json({
                    message: "ok",
                    data : response
                });
            }else{
                return res.status(422).json({message : "Lỗi tìm kiếm!"});
            }
        } catch (error) {
            console.log(error)
            return res.status(422).json({message : "Lỗi!"});
        }
}
}
module.exports = new BangDiemChiTietController();


// SELECT mon.HeSo1, mon.HeSo2, mon.HeSo3, 	bangdiemchitiet.DiemHe1,bangdiemchitiet.DiemHe2,bangdiemchitiet.DiemHe3,
// ROUND((mon.HeSo1*bangdiemchitiet.DiemHe1+mon.HeSo2*bangdiemchitiet.DiemHe2+ mon.HeSo3*bangdiemchitiet.DiemHe3),2) as diemTB
//             FROM bangdiemchitiet INNER JOIN loptinchi 
//             ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
//             INNER JOIN mon ON loptinchi.MaMon=mon.MaMon

// SELECT 
// ROUND((mon.HeSo1*bangdiemchitiet.DiemHe1+mon.HeSo2*bangdiemchitiet.DiemHe2+
//      mon.HeSo3*bangdiemchitiet.DiemHe3),2) 
// AS DIEM FROM bangdiemchitiet INNER JOIN loptinchi
// ON bangdiemchitiet.MaLTC =loptinchi.MaLopTinChi
// INNER JOIN mon ON loptinchi.MaMon=mon.MaMon
// WHERE bangdiemchitiet.MSSV="N19DCPT033" 
// AND bangdiemchitiet.MaLTC="MCKD224";

// BEGIN
// (SELECT HeSo1, HeSo2,HeSo3,DiemHe1,DiemHe2,DiemHe3 FROM view_bang_diem_tb
// WHERE MSSV=NEW.MSSV
// AND MaLlopTinChi=NEW.MaLTC) AS a;
// UPDATE bangdiemchitiet SET DiemTB= fn_tinh_diem_tb(a.HeSo1, a.HeSo2,a.HeSo3,a.DiemHe1,a.DiemHe2,a.DiemHe3)
// WHERE MSSV=NEW.MSSV
// AND MaLTC=NEW.MaLTC
// END


// UPDATE bangdiemchitiet SET DiemTB= fn_tinh_diem_tb((SELECT HeSo1, HeSo2,HeSo3,DiemHe1,DiemHe2,DiemHe3
//     FROM view_bang_diem_tb
//     WHERE MSSV=NEW.MSSV
//     AND MaLlopTinChi=NEW.MaLTC))
    
//     UPDATE bangdiemchitiet SET bangdiemchitiet.DiemTB=(SELECT fn_tinh_diem_tb(HeSo1,HeSo2,HeSo3,DiemHe1,DiemHe2,DiemHe3) as diemtb
//     FROM view_bang_diem_tb
//     WHERE MSSV="N19DCPT033"
//     AND MaLopTinChi="mckd221") 