// const AccountModel = (sequelize, Sequelize) => {
//     const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
//     const Account = sequelize.define("Account", {
//         username: {
//           type: DataTypes.STRING,
//           allowNull: false
//         },
//         password: {
//           type: DataTypes.STRING,
//           allowNull: false
//         },
//         role: {
//           type: DataTypes.STRING,
//           allowNull: false
//         }
//      });
//     return Account;
// }

// module.exports = AccountModel

const joi = require('joi');
const Account = function(account){
    this.username = account.username;
    this.password = account.password;
    this.role = account.role;
}

// Account.findAll = function(result){
//     db.query("SELECT * FROM account", function(err, account){
//         if(err){
//             result(err);  
//         }else{
//             result(account);
//         }
//     })
// }

// Account.findOneByUsername = function(username, result){ 
//     db.query("SELECT * FROM account WHERE username = ?", username, function(err, account){
//         if(err || account.length==0 ){
//             result(err);  
//         }else{
//             result(account);
//         }
//     })
// }
const validateAccount = function(data){
    const model = joi.object({
        username : joi.string().required(),
        password : joi.string().min(3).max(20).required()
    })
    return model.validate(data);
}

module.exports ={Account, validateAccount} 