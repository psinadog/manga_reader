import express = require("express");
import bodyParser = require("body-parser");
import cookie = require("cookie-parser");
import engine = require("ejs-mate");

import routes from "./Routes/routes";
import users from "./Routes/users";
import add from "./Routes/add";
import manga_list from "./Routes/manga_list";

const app = express();
const PORT = process.env.PORT || 80;

app.engine("ejs", engine);
app.use(cookie());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));
app.use("/v", manga_list);
app.use("/", routes);
app.use("/m", users);
app.use("/a", add);

app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
