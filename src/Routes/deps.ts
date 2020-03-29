import express = require("express");

export class Intermediate {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;

    get_user_data() {
        return [this.req.cookies.user_data[0]["name"], this.req.cookies.user_data[0]["password"]];
    }

    verify_cookies(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;

        if (this.req.cookies.user_data === undefined) {
            return false;
        } else {
            return true;
        }
    }
}
