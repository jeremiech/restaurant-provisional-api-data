
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
    }

}
module.exports = stock