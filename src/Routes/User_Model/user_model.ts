export class Model {
    static get(is_login: boolean, name: string, password: string) {
        return {
            is_login: is_login,
            name: name,
            password: password
        }
    }
}