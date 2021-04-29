import {Address} from './address';
import {License} from './license';


export class User {
  email: string;
  phone: string;
  NASSM: string;
  password: string;
  firstname: string;
  lastname: string;
  address: Address;
  license: License;
  birth: Date;
  sex: Sex;


  constructor(email: string, phone: string, NASSM: string, password: string, firstname: string, lastname: string, address: Address, license: License, birth: Date, sex: Sex) {
    this.email = email;
    this.phone = phone;
    this.NASSM = NASSM;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.license = license;
    this.birth = birth;
    this.sex = sex;
  }

  getLastNumberOrNassm() {
    return '**** **** *' + this.NASSM.substring(this.NASSM.length - 3);
  }
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
