const category_controller = require("../controllers/category.controller")
const auth_mw = require("../middlewares/auth.mw")

module.exports = (app) => {
    app.post("/ecom/api/v1/category", [auth_mw.verifyToken, auth_mw.isAdminCheck], category_controller.createCategory)
}