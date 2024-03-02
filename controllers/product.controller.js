const product_model = require("../models/product.model")

exports.createProducts = async (req, res) => {
    //read res data
    const pro_data = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    try {
        // insert into mongodb
        const product = await product_model.create(pro_data);
        //return the response of the created product
        return res.status(201).send(product);
    } catch (err) {
        res.status(500).send({
            message: "no product created due to some error"
        });
    }
}


exports.displayAllProducts = async (req, res) => {
    //display all product data from database
    try {
        const products = await product_model.find({});
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({
            message: "no product found due to some error"
        });
    }
}

exports.updateProducts = async (req, res) => {
    try {
        //update product data
        const product = await product_model.findOneAndUpdate({ name: req.body.name }, {
            $set: {
                description: req.body.description,
                price: req.body.price
            }
        }, { new: true });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({
            message: "no product found due to some error"
        });
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        //delete product data
        const product = await product_model.findOneAndDelete({ name: req.body.name });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({
            message: "no product found due to some error"
        });
    }
}