const connection = require("./connection.jsx");
const { logError } = require("./logError.jsx");

exports.db = connection;
exports.logError = logError;

exports.toInt = () =>{
    return true;
};

exports.isArray = (data) =>{
    return true;
};

exports.isEmpty = (data) =>{
    return true;
}

exports.isEmail = (data) =>{
    return true;
};

exports.fromartDataServer = (data) =>{
    return true;
}