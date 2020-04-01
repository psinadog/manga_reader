import mysql = require("mysql");
import knex = require("knex");
import { callbackify } from "util";

export class Mysql {
    knex = require("knex")({
        client: "mysql",
        connection: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "manga_reader"
        },
        acquireConnectionTimeout: 3000,
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
        this.knex("user")
            .insert(d)
            .then(() => console.log("data inserted"))
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
    async find_one(name: string) {
        let search_result;
        await this.knex("user")
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
        console.log(name);
        await this.knex("user")
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
