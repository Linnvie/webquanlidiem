import axios from '../axios';

const handleLoginApi = (username, password) => {
    console.log(username,password)
    //  return new Promise((resolve, reject) => {
        
    //  })
    return axios.post("/account/login", {username, password})
    
}

const getApi = (maLTC) => {
    console.log("vaof")
    //  return new Promise((resolve, reject) => {
        
    //  })
    const a=axios.get(`/diem/ltc?maLTC=${maLTC}`);
    console.log("dfg",a)
    return a
    
}

export {handleLoginApi, getApi}