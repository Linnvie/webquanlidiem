const ChuSang4= function(diemChu){
    if(diemChu==="D"){
        return 1.0;
    }
    if(diemChu==="D+"){
        return 1.5;
    }
    if(diemChu==="C"){
        return 2.0;
    }
    if(diemChu==="C+"){
        return 2.5;
    }
    if(diemChu==="B"){
        return 3.0;
    }
    if(diemChu==="B+"){
        return 3.5;
    }
    if(diemChu==="A"){
        return 3.7;
    }
    if(diemChu==="A+"){
        return 4;
    }
    return 0;
}

module.exports={ChuSang4};