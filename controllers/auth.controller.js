const bcrypt = require('bcrypt');
const user_model = require("../models/user.model");
const jwt = require('jsonwebtoken');
const secret = require('../configs/auth.config');


exports.signup = async (req, res) => {
    /***
     * 1.read request body
     * 2.insert the data in the user collection mongodb
     * 3.returns the response back to server
     */

    const request_body = req.body;
    const userObject = {
        name: request_body.name,
        email: request_body.email,
        userId: request_body.userId,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await user_model.create(userObject);
        res.status(201).send(user_created);
    } catch (error) {
        console.log("error while registering the user", error);
        res.status(500).send({ message: "Error while registering the user" });
    }
}


exports.signin = async (req, res) => {

    //check if the userId is present in the system or not
    const user = await user_model.findOne({ userId: req.body.userId })

    if (user === null) {
        return res.status(404).send({
            message: "User not found"
        });
    }


    //password is correct or not
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid Password"
        });
    }

    // uisng jwt we will create access token with a given TTL and return

    if (passwordIsValid) {
        const token = jwt.sign({ id: user.userId }, secret.secret, { expiresIn: 120 }); // 120 secs
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            accessToken: token
        })

    } else {
        return res.status(401).send({
            message: "No token && Invalid Password"
        });
    }



}