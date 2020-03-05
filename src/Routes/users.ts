import express = require("express");

import { MongoDB } from "../MongoDB/mongo";

const User = require("../MongoDB/Schema/users");
const router = express.Router();
const mongo = new MongoDB;

router.get("/", mongo.paginated_results(User), async (req: express.Request, res: express.Response | any) => {
    const next = await JSON.stringify(res.paginatedResults.next.page);
    const previous = await JSON.stringify(res.paginatedResults.previous.page);
    res.render("content", {
        paginated_results: JSON.stringify(res.paginatedResults),
        next: next,
        previous: previous
    });
});



export default router;