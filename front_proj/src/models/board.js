export default class Board {
  constructor(title, body, email, phone, files = null) {
    this.title = title;
    this.body = body;
    this.email = email;
    this.phone = phone;
    this.files = files;
  }
}
