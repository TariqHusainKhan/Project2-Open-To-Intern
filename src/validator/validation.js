const validator = require("email-validator");
const mongoose = require("mongoose")

const isValid = function (attribute)
 {
    if (typeof attribute === 'undefined' || attribute === null) return false;
    if (typeof attribute === 'string' && attribute.trim().length === 0) return false;
    if (typeof attribute === 'number'  ) return false;
    return true; 
}

const isValidReqBody = function (reqBody)
 {
    return Object.keys(reqBody).length > 0
 }

const isValidName = function (attribute) 
{
    if(!(attribute === attribute.toLowerCase()))
     {
        return false
    }
    return true
}

const isValidMobile = function (attribute) 
{
    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(attribute.trim()))) 
    {
        return false
    }
    return true
}


const isValidEmail = function (attribute) 
{
    if (!(validator.validate(attribute))) 
    {
        return false
    }
    return true
}

const isValidLink = function(attribute)
 {
    if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(attribute.trim()))) 
    {
        return false
    }
    return true
}

const isValidobjectId = function(objectId)
 {
    return mongoose.Types.ObjectId.isValid(objectId)
 }


module.exports.isValid = isValid
module.exports.isValidReqBody = isValidReqBody
module.exports.isValidName = isValidName
module.exports.isValidMobile = isValidMobile
module.exports.isValidEmail = isValidEmail
module.exports.isValidLink = isValidLink
module.exports.isValidobjectId = isValidobjectId