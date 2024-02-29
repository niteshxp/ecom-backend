const bcrypt = require('bcrypt');
const user_model = require("../models/user.model");

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