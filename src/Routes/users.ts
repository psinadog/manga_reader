import express = require("express");

import { MongoDB } from "../MongoDB/mongo";

const User = require("../MongoDB/Schema/users");
const router = express.Router();
const mongo = new MongoDB();

let cookies_data: boolean;
let cookies_name: string;
let cookies_password: string;

router.use(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if ((await req.cookies.user_data) === undefined) {
      cookies_data = false;
    } else {
      cookies_data = true;
      cookies_name = req.cookies.user_data[0]["name"];
      cookies_password = req.cookies.user_data[0]["password"];
    }
    next();
  }
);

router.get(
  "/",
  mongo.paginated_results(User),
  async (req: express.Request, res: express.Response | any) => {
    const next = await res.paginatedResults.next.page;
    const previous = await res.paginatedResults.previous.page;
    res.render("content", {
      paginated_results: JSON.stringify(res.paginatedResults),
      next: next,
      previous: previous,
      data: { cookies_data, cookies_name, cookies_password }
    });
  }
);

export default router;
