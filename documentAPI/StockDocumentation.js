const documentdObject=require('./documentedObejct/AddStockDoc')
const stockDocumentedOject={
openapi:"3.0.3",
info:{
    title:"store management API documentation",

},
servers:[
        {url:"https://store-mgt-api.onrender.com",
        description:"render server to store the API"

}
],
tags:[
    {name:"stock"},
    {name:"login"},
    {name:"order"}
],
paths:
    {
        ...documentdObject
}
}
module.exports=stockDocumentedOject