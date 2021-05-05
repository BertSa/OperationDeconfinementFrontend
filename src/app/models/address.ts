export enum Province {
  Quebec = 'Qc',
  Ontario = 'On',
}

export class Address {
  zipCode: string;
  street: string;
  city: string;
  province: Province;
  apt: string;

  constructor(zipCode: string, street: string, city: string, province: Province, apt: string) {
    this.zipCode = zipCode;
    this.street = street;
    this.city = city;
    this.province = province;
    this.apt = apt;
  }
}
