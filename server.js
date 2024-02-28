const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");

const app = express();
const PORT = server_config.PORT;

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection;

db.on("error", () => { console.log("Error in connecting to database") })

db.once("open", () => {
    console.log("Connected to database")
    init()
})

async function init() {
    var user = await user_model.findOne({ userId: "admin" });

    if (user) {
        console.log("Admin user already exists");
        return;
    }

    try {
        user = await user_model.create({
            name: "Nitesh",
            userId: "admin",
            email: "nkytxp2@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("test123", 8)
        });
        console.log("Admin user created", user);
    } catch (error) {
        console.log("error in admin creation", error);
    }
}



app.listen(PORT, () => { console.log(`Server started at ${PORT}`) });