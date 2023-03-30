async function paginate(obj, total, findLimit){
    obj.numOfPages = Math.ceil(total/obj.perPage);
    if(obj.currentPage>obj.numOfPages || obj.currentPage<1){
        obj.currentPage = 1;
    }
    obj.startLimit = (obj.currentPage-1)*obj.perPage;
    const data = await findLimit(obj);
    // obj.start = (curentPage-5) < 1 ? 1 : (curentPage-5);
    // obj.end = (start+9) <= numOfPages ? (start+9) : numOfPages;
    // if(obj.end < (obj.curentPage+4)){
    //     obj.start = obj.start - (curentPage+4) - numOfPages;
    // }

    obj.start = obj.startLimit+1;
    obj.end = (obj.start+10) <= obj.numOfPages ? (obj.start+10) : obj.numOfPages;
    return {list : [...data], ...obj};
}

module.exports = {paginate};