export class Address {
  zipCode:string;
  street:string;
  city:string;
  province:string;
  apt:string;

  constructor(zipCode: string, street: string, city: string, province: string, apt: string) {
    this.zipCode = zipCode;
    this.street = street;
    this.city = city;
    this.province = province;
    this.apt = apt;
  }
}
