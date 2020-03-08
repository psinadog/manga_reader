import express = require("express");


import { MongoDB } from "../MongoDB/mongo";
import { Model } from "./User_Model/user_model";
import { Verify } from "./Verify_User/verify";


const User = require("../MongoDB/Schema/users");
const router = express.Router();

const mongo = new MongoDB;

let cookies_data: boolean;

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.cookies.user_data === undefined) {
        cookies_data = false;
    } else {
        cookies_data = true;
    }
    next();
})

router.get("/", async (req: express.Request, res: express.Response) => {
    if (!cookies_data) res.render("index", { data: { is_login: cookies_data } });
    else {
        await mongo.find_user_mark(req.cookies.user_data[0]["name"], req.cookies.user_data[0]["password"]);
        if (mongo.boolean_value_get()) {
            res.render("index", { data: Model.get(cookies_data, req.cookies.user_data[0]["name"], req.cookies.user_data[0]["password"]) });
        }
    }
});

router.get("/login", (req: express.Request, res: express.Response) => {
    if (!cookies_data) res.render("login");
    else res.send("you're logged in already");
});

router.get("/registration", (req: express.Request, res: express.Response) => {
    if (!cookies_data) res.render("registration");
    else res.send("you're logged in");
})

router.post("/exit", (req: express.Request, res: express.Response) => {
    res.clearCookie("user_data");
    res.redirect("/");
})

router.post("/req-page-progress", mongo.paginated_results(User), async (req: express.Request, res: express.Response | any) => {

    const user = await mongo.find_user_mark(req.body.name, req.body.password);

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

    if (!req.body) return res.sendStatus(400);

    if (mongo.boolean_value_get()) {
        res.json(true);
    } else {
        mongo.save_user(req.body.name, req.body.password);
        res.json(false);
    }

});

export default router;