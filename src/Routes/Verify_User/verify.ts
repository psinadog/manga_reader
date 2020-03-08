export class Verify {
    name: string;
    password: string;
    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }

    is_login(req: Express.Request | any) {
        if (req.cookies === undefined) return false;
    }
}