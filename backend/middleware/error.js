const { json } = require("body-parser");
const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) =>{

let error = {...err};
error.message = err.message;

if (err.name === "castError"){
        const message = 'Ressource not found$(err.value)';
        error = new errorResponse(message,404);
}
if (err.code === 11000){
    const message = 'Duplicate value  entered';
    error = new errorResponse(message,404);
}
if (err.name === "validaton"){
    const message = Object.values(err.errors).map (val => '' +val.message);
    error = new errorResponse(message,404);
}

res.status(error.codestatus || 500).json(
{

    success:false,
    error:error.message || "server error"

}

)
}

module.exports = errorResponse;