export class User {
  mail: string;
   firstname: string;
   lastname: string;
   password: string | null;
   birthday: string;
   mobilephone: string | null;
   photo: string;
   licence: boolean | null;
   smocker: boolean;
   language: string[] | null;

     constructor(
    mail: string,
    firstname: string,
    lastname: string,
    password: string,
    birthday: string,
    mobilephone: string | null,
    photo: string,
    licence: boolean,
    smocker: boolean,
    language: string[],
  ) {
    this.mail = mail;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.birthday = birthday;
    this.mobilephone = mobilephone;
    this.photo = photo;
    this.licence = licence;
    this.smocker = smocker;
    this.language = language;
  }
  setBirthday(birthday: Date):  string {

    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (birthday <= eighteenYearsAgo) {
    this.birthday = birthday.toISOString().slice(0, 10); // Beispiel: "2023-06-23"
      return this.birthday;
    } else {
      throw new Error('Du musst mindestens 18 Jahre alt sein, um diese Aktion ausführen zu dürfen.');
    }
  }

}
