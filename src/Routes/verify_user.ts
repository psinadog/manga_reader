export class Verify {
  user: { name: string; password: string; email: string };
  verify_user: any = {
    name: true,
    password: true,
    email: true
  };
  constructor(user: { name: string; password: string; email: string }) {
    this.user = user;
  }

  verify() {
    if (this.user.name.length < 4) this.verify_user.name = false;

    if (this.user.password.length < 8) this.verify_user.password = false;

    if (
      this.user.email.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
      ) === null
    )
      this.verify_user.email = false;

    return this.verify_user;
  }

  is_empty(user: { name: string; password: string; email: string }) {
    for (let key in user) {
      if (user[key] === "") {
        this.verify_user[key] = null;
      }
    }
    return this.verify_user;
  }
}
