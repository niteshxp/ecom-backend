const product_controller = require("../controllers/product.controller")
const auth_mw = require("../middlewares/auth.mw")

module.exports = (app) => {
    app.post("/ecom/api/v1/product", [auth_mw.verifyToken, auth_mw.isAdminCheck], product_controller.createProducts)

    app.get("/ecom/api/v1/allproduct", [auth_mw.verifyToken, auth_mw.isAdminCheck], product_controller.displayAllProducts)

    app.put("/ecom/api/v1/updateproduct", [auth_mw.verifyToken, auth_mw.isAdminCheck], product_controller.updateProducts)

    app.delete("/ecom/api/v1/product", [auth_mw.verifyToken, auth_mw.isAdminCheck], product_controller.deleteProduct)

}