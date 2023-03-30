class SiteController{
    //get/account
    index(req, res){
        res.send('trang chủ');
    }

}

module.exports = new SiteController;