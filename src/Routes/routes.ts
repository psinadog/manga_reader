import express = require("express");


import { MongoDB } from "../MongoDB/mongo";
import { Model } from "./User_Model/user_model";


const User = require("../MongoDB/Schema/users");
const router = express.Router();

const mongo = new MongoDB;
const model = new Model;

router.get("/", mongo.paginated_results(User), async (req: express.Request, res: express.Response) => {
    if (req.cookies.user_data === undefined) res.render("index", { data: { is_login: false } });
    else {
        await mongo.find_user_mark(req.cookies.user_data[0]["name"], req.cookies.user_data[0]["password"]);
        if (mongo.boolean_value_get()) {
            res.render("index", { data: Model.get(true, req.cookies.user_data[0]["name"], req.cookies.user_data[0]["password"]) });
        }
        else {
            res.redirect("/login");
        }
    }
});

router.get("/login", mongo.paginated_results(User), (req: express.Request, res: express.Response) => {
    if (req.cookies.user_data === undefined) res.render("login", { is_login: false });
    else res.send("you're logged in already");
});

router.get("/registration", mongo.paginated_results(User), (req: express.Request, res: express.Response) => {
    if (req.cookies.user_data === undefined) res.render("registration");
    else res.send("you're logged in");
})



router.post("/exit", (req: express.Request, res: express.Response) => {
    res.clearCookie("user_data");
    res.redirect("/login");
})

router.post("/req-page-progress", mongo.paginated_results(User), async (req: express.Request, res: express.Response | any) => {

    const user = await mongo.find_user_mark(req.body.name, req.body.password);

    console.log(user);
    if (!req.body) return res.sendStatus(400);

    if (mongo.boolean_value_get()) {
        res.cookie("user_data", user);
        res.redirect("/");
    }

    else {
        res.send("wrong user name or password");
    }

});


router.post("/registration-process", async (req: express.Request, res: express.Response) => {

    const user = await mongo.find_user_name(req.body.name);

    if (!mongo.boolean_value_get()) {
        mongo.save_user(req.body.name, req.body.password);
        res.redirect("/login");
    } else {
        res.send("that user name exist");
    }

});

export default router;