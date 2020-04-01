import mysql = require("mysql");
import knex = require("knex");

export class Mysql {
    knex = require("knex")({
        client: "mysql",
        connection: {
            host: "bi2jnwdmlse79o7fxemx-mysql.services.clever-cloud.com",
            user: "u3iyfoj9l0m1qcmx",
            password: "VKYmppnmFQrZSLBbDfCk",
            database: "bi2jnwdmlse79o7fxemx"
        },
        useNullAsDefault: true
    });
    constructor() {}
    save_user(name: string, password: string, email: string) {
        const d = [
            {
                name: name,
                password: password,
                mail: email
            }
        ];
        this.knex("USER").insert(d);
    }
    async find_one(name: string) {
        let search_result;
        await this.knex("USER")
            .select("*")
            .where("NAME", name)
            .orWhere("MAIL", name)
            .then(user => {
                search_result = user;
            });

        if (search_result.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    async find_user(name: string, password: string) {
        if (name === undefined || password === undefined) {
            return true;
        }
        let search_result;
        await this.knex("USER")
            .where("NAME", name)
            .andWhere("PASSWORD", password)
            .then(user => {
                search_result = user;
            });

        if (search_result.length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
