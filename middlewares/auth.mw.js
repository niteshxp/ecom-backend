const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")
/**
 * Create a mw will check if the request body is proper and correct
 */

const verifySignUpBody = async (req, res, next) => {

    try {

        //Check for the name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Name was not provied in request body"
            })
        }

        //check for the email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed ! Email was not provied in request body"
            })
        }
        //check for the userId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed ! userId was not provied in request body"
            })
        }

        //Check if the user with the same userId is already present
        const user = await user_model.findOne({ userId: req.body.userId })

        if (user) {
            return res.status(400).send({
                message: "Failed ! user with same userId is already present"
            })
        }

        next()

    } catch (err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}


const verifySignInBody = async (req, res, next) => {

    try {
        //check for the userId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed ! userId was not provied"
            })
        }
        //check for the password
        if (!req.body.password) {
            return res.status(400).send({
                message: "Failed ! password was not provied"
            })
        }

        next()

    } catch (err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }

}

const verifyToken = (req, res, next) => {
    //get the token from the header
    const token = req.headers["x-access-token"];

    //check if the token is present
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    //verify the token
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        const user = await user_model.findOne({ userId: decoded.id })

        if (!user) {
            return res.status(401).send({
                message: "Unauthorized, this user for this token doesnot exist"
            })
        }
        //set the user info in the req body
        req.user = user;
        next()
    })
}

const isAdminCheck = (req, res, next) => {
    const user = req.user;
    if (user && user.userType === "ADMIN") {
        next()
    } else {
        return res.status(403).send({
            message: "Unauthorized, only admin can perform this operation"
        })
    }
}


module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdminCheck: isAdminCheck
}