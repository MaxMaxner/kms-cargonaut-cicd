export class User {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  password:string;
  geburtstag: string;
  handynummer: string;

  constructor(id: string, vorname: string,nachname: string,email: string, password: string,geburtstag: string, handynummer: string) {
    this.id = id;
    this.vorname = vorname;
    this.nachname = nachname;
    this.email = email;
    this.password = password;
    this.geburtstag = geburtstag;
    this.handynummer = handynummer;

  }
}
