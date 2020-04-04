import express = require("express");

import { Mysql } from "../Mysql/mysql";

export class Cookies {
    mysql = new Mysql();
    req: express.Request;
    res: express.Response;
    constructor(req: express.Request, res: express.Response) {
        this.req = req;
        this.res = res;
    }
    verify() {
        let cookies_have: boolean;
        let cookies_name: string;
        let cookies_password: string;
        let cookies_privilege: string;
        const is_admin = this.mysql.is_admin(cookies_privilege);

        if (this.req.cookies.user_data === undefined) {
            cookies_have = false;
        } else {
            cookies_have = Boolean(this.mysql.find_user(cookies_name, cookies_password));
            cookies_name = this.req.cookies.user_data["cookies_name"];
            cookies_password = this.req.cookies.user_data["cookies_password"];
            cookies_privilege = this.req.cookies.user_data["cookies_privilege"];
            if (!(!is_admin || cookies_privilege === "admin")) {
                cookies_privilege === null;
            }
        }
        return {
            cookies_have: cookies_have,
            cookies_name: cookies_name,
            cookies_password: cookies_password,
            cookies_privilege: cookies_privilege,
        };
    }
}
