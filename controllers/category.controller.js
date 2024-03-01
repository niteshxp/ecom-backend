const category_model = require("../models/category.model")

/***
 * controller for creating category
 */
exports.createCategory = async (req, res) => {
    //read the res body
    //create the category
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    try {
        // insert into mongodb
        const category = await category_model.create(cat_data);
        //return the response of the created category
        return res.status(201).send(category);
    } catch (err) {
        res.status(500).send({
            message: "no category created due to some error"
        });
    }

}