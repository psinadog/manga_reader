import mongoose = require("mongoose");
import express = require("express");
import { resolve } from "dns";
import { rejects } from "assert";

const User = require("./Schema/users");

export class MongoDB {

    temp!: boolean;

    db: mongoose.Connection = mongoose.connection;
    constructor() {
        mongoose.connect('mongodb+srv://gokutok:111111ab@cluster0-pu7z4.azure.mongodb.net/test?retryWrites=true&w=majority');
    }


    async save_user(name: string, password: string) {
        if (User.countDocuments().exec() > 0) return
        Promise.all([
            User.create({ name: name, password: password })
        ]).then(() => console.log('Added Users'))
    }

    async find_user_name(name: string) {
        return User.find({ name: name }, (error: Error, users_name: {}) => {
            this.is_exists_set(users_name);
        })
    }


    find_user_mark(name: string, password: string) {
        return User.find({ name: name, password: password }, (error: Error, users_name: {}) => {
            this.is_exists_set(users_name);
        })
    }

    is_exists_set(val: any) {
        if (Object.keys(val).length === 0) {
            this.temp = false
        } else {
            this.temp = true;
        }
    }

    boolean_value_get() {
        return this.temp;
    }

    paginated_results(model: any) {
        return async (req: express.Request, res: express.Response | any, next: express.NextFunction) => {
            const results = {
                next: {},
                previous: {},
                results: ""
            }
            const page = parseInt(req.query.page)
            const limit = 5

            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            if (endIndex < await model.countDocuments().exec()) {
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            try {
                results.results = await model.find().limit(limit).skip(startIndex).exec()
                res.paginatedResults = results
                next()
            } catch (e) {
                res.status(500).json({ message: e.message })
            }
        }

    }
}