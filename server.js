const express = require('express');
const mongoose = require('mongoose');
const server_config = require("./configs/server.config");
const app = express();
const PORT = server_config.PORT;

app.listen(PORT, () => { console.log(`Server started at ${PORT}`) });