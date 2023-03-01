
const addNewStock = {
    tags: ["stock"],
    description: "create stock entry",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "name of product to be recorded"
                        },
                        quantity: {
                            type: "number",
                            description: "product quantity"
                        },
                        supplier: {
                            type: "object",
                            properties: {

                                fullName: {
                                    type: "string",
                                    description: "suppliers full name"

                                },
                                email: {
                                    type: "string",
                                    description: "email of supplier"

                                },
                                mobile: {
                                    type: "number",
                                    description: "supplier mobile number"
                                },
                                address: {
                                    type: "string",
                                    description: "address of supplier"
                                }
                            }


                        },
                        unit_price: {
                            type: "number"

                        },



                        expireDate: {
                            type: "Date",
                        },

                    }
                }
            }
        }
    },
    responses: {
        description: "OK"
    }
}



const stockListByName = {
    tags: ['stock'],
    summary: "find stock by name from query parameter",
    description: "find stock of single stock by name",
    parameters: [

        {
            name: "name",
            in: 'params',
            description: "stock name",
            type: "string",

        }
    ],
    responses: {

        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user: []
                        }
                    }
                }
            }
        }

    }

}


const stockList = {

    tags: ['stock'],
    description: "list of stock in whole",

    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user: []
                        }
                    }
                }
            }
        },
        500: {
            description: "Internal error server"
        },
        400: {
            description: "bad Request"
        }



    }

}



const stockOutStatus = {
    tags: ['stock'],
    description: "daily stock out",

    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            count: 0,
                            user: []
                        }
                    }
                }
            }
        },
        500: {
            description: "Internal server error"
        },
        400: {
            description: "bad Request"
        }



    }

}







const stock_in_status = {
    tags: ['stock'],
    description: "stock-in status",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",

                    }

                }

            }
        },
        500: {
            description: "internal server error"

        }
    }
}

const updateStockByName = {
    tags: ['stock'],
    summary: "stock name",
    description: "find stock of single stock by name",
    parameters: [

        {
            name: "name",
            in: 'query',
            description: "stock name",
            type: "string",

        }
    ],


    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        quantity: "number",
                        unit_price: "number"
                    }

                }
            }
        }

    },

    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",

                    }

                }
            }
        },
        500: {
            description: "internal server error"
        },
        403: {
            description: "bad request"
        }
    }
}




const userSingup = {
    tags: ["login"],
    description: "create new user signup",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        fullName: {
                            type: "string",
                            description: "user fullname "
                        },
                        email: {
                            type: "email",
                            description: "email of user",

                        },
                        mobile: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        }

                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        user: []
                    }
                }
            }
        }
    }
}






const userLogin = {
    tags: ['login'],
    description: "user login here ...",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object"
                }
            }
        }
    },
    responses: {
        200: {
            description: "Ok",
            content: {
                "application/json": {
                    schema: {
                        type: "object"
                    }

                }
            }
        },
        403: {
            description: "forbiden request"
        },
        500: {
            description: "internal server error"
        }
    }
}

const makeOrder = {
    tags: ['order'],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        customerName: {
                            type: "string",
                            description: "customer name"
                        },
                        name: {
                            type: "string"
                        },
                        quantity: {
                            type: "number"
                        }
                    },
                    example: {
                        customerName: "john doe",
                        name: "laptops",
                        quantity: 200,

                    }
                }
            }
        }
    },
    responses:{
        200:{
            description:"Ok",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                        example:{
                            user:[]
                        }
                    }
                }
            }
        },
        400:{
            description:"bad request"
        },
        500:{
            description:"internal server error"
        }
    }
}


const cancelOrder={
    tags:["stock"],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string",
                            quantity:"number"

                        }
                    }
                }
            }
        }
    }
}





const stock = {
    '/stock/list': {
        get: stockList
    },
    '/stock/list/:name': {
        get: stockListByName

    },

    '/stock/add-stock': {
        post: addNewStock
    },
    '/stock/stock-in': {
        get: stock_in_status
    },
    '/stock/stock-out': {
        get: stockOutStatus
    },
    'stock/edit/name': {
        put: updateStockByName
    },
    '/user-log/signup': {
        post: userSingup
    },
    '/user-log/signin': {
        post: userLogin

    },
    '/order/make-order':{
        post:makeOrder
    },
    '/order/cancel-order':{
        post:cancelOrder
    }


}
module.exports = stock