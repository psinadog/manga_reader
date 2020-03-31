import mongoose = require("mongoose");
import express = require("express");

const User = require("./Schema/users");

export class MongoDB {
    db: mongoose.Connection = mongoose.connection;
    constructor() {
        mongoose.connect("mongodb+srv://gokutok:111111ab@cluster0-pu7z4.azure.mongodb.net/mangaDB?retryWrites=true&w=majority");
    }

    async save_user(name: string, password: string, email: string) {
        if (User.countDocuments().exec() > 0) return;
        Promise.all([User.create({ name: name, password: password, email: email })]).then(() => console.log("Added Users"));
    }

    async find_one(name: string) {
        let search_result;

        await User.find({ name: name }, (err, users) => {
            search_result = users;
        });

        if (search_result.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    async find_user(name: string, password: string) {
        let search_result;

        await User.find({ name: name, password: password }, (err, users) => {
            search_result = users;
        });

        if (search_result === undefined) {
            return true;
        } else {
            return false;
        }
    }
    paginated_results(model: any) {
        return async (req: express.Request, res: express.Response | any, next: express.NextFunction) => {
            const results = {
                next: {},
                previous: {},
                results: ""
            };
            const page = parseInt(req.query.page);
            const limit = 5;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            if (endIndex < (await model.countDocuments().exec())) {
                results.next = {
                    page: page + 1,
                    limit: limit
                };
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                };
            }
            try {
                results.results = await model
                    .find()
                    .limit(limit)
                    .skip(startIndex)
                    .exec();
                res.paginatedResults = results;
                next();
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        };
    }
}
