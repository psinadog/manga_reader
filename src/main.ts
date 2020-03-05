import express = require("express");
import bodyParser = require("body-parser");
import cookie = require("cookie-parser");
import engine = require('ejs-mate');


import routes from "./Routes/routes";
import users from "./Routes/users";

const app = express();
const PORT = process.env.PORT || 80;

app.engine('ejs', engine);
app.use(cookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../public"));
app.use("/", routes);
app.use("/users", users);

app.set("view engine", "ejs");

app.listen(PORT, () => {

    console.log(`Listening on port: ${PORT}`);

});

