import express = require("express");
import mongoose = require("mongoose");
import { MongoDB } from "../MongoDB/mongo";

const User = require("../MongoDB/Schema/users");
const Manga = require("../MongoDB/Schema/manga");

const router = express.Router();
const mongo = new MongoDB();

let cookies_data: boolean;
let cookies_name: string;
let cookies_password: string;

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.cookies.user_data === undefined) {
        cookies_data = false;
    } else {
        cookies_data = true;
        cookies_name = req.cookies.user_data[0]["name"];
        cookies_password = req.cookies.user_data[0]["password"];
    }
    next();
});

router.get("/", mongo.paginated_results(User), async (req: express.Request, res: express.Response | any) => {
    const next = await res.paginatedResults.next.page;
    const previous = await res.paginatedResults.previous.page;
    res.render("content", {
        paginated_results: JSON.stringify(res.paginatedResults),
        next: next,
        previous: previous,
        data: {
            is_login: cookies_data,
            name: cookies_name,
            password: cookies_password
        }
    });
});

router.get("/upload", (req: express.Request, res: express.Response) => {
    Manga.find({ _id: "5e8333f949ea8b0ad4f6c960" }, (err, content) => {
        res.render("upload", { content: content });
    });
});

router.get("/:id", (req: express.Request, res: express.Response) => {
    console.log(req.params.id);
    Manga.find({ _id: req.params.id }, (err, content) => {
        res.render("upload", { content: content });
    });
});

router.post("/upload", (req: express.Request, res: express.Response) => {
    Promise.all([Manga.create({ folder_name: req.body.folder_name, folder_content: req.body.folder_content })]).then(() => console.log("Added Manga"));
});

export default router;
