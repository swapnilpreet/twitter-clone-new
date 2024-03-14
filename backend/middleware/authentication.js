const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req,res,next) => {
    try {
        const token = req.header('authorization').split(' ')[1];
        const decryptedToken = jwt.verify(token,process.env.TOKEN_SECRET);
        req.body.userId = decryptedToken.userId;
        next();
    } catch (error) {
        res.send({
            success:false,
            message:"Authentication" + error.message,
        })
    }
}