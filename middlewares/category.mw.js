const category_model = require("../models/category.model");

const verifyCategoryBody = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! Name was not provided"
        })
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Failed ! description was not provided"
        })
    }
    next();
}

module.exports = {
    verifyCategoryBody: verifyCategoryBody
}