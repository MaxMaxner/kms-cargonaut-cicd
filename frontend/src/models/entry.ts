export class Entry {
  static readonly entryID: number;
  private readonly usermail: string;
  entrytype: string;
  startlocation: string;
  destination: string;
  stops: string | null;
  seats: number;
  maxtranspweight: number;
  price: number;
  startdate: string;
  starttime: string;

  constructor(
    entryID: number,
    usermail: string,
    entrytype: string,
    startlocation: string,
    destination: string,
    stops: string | null,
    seats: number,
    maxtranspweight: number,
    price: number,
    startdate: string,
    starttime: string
  ) {

    this.usermail = usermail;
    this.entrytype = entrytype;
    this.startlocation = startlocation;
    this.destination = destination;
    this.stops = stops;
    this.seats = seats;
    this.maxtranspweight = maxtranspweight;
    this.price = price;
    this.startdate = startdate;
    this.starttime = starttime;
  }

  getUsermail(): string {
    return this.usermail;
  }

}
