import {Address} from './address';
import {License} from './license';


export class Citizen {
  id: number;
  email: string;
  phone: string;
  noAssuranceMaladie: string;
  password: string;
  firstname: string;
  lastname: string;
  address: Address;
  license: License;
  birth: Date;
  sex: Sex;
  profileCompleted: boolean;

  tutor: Citizen | undefined;


  constructor(email: string, phone: string, noAssuranceMaladie: string, password: string, firstname: string, lastname: string, address: Address, license: License, birth: Date, sex: Sex, profileCompleted: boolean, tutor: Citizen) {
    this.email = email;
    this.phone = phone;
    this.noAssuranceMaladie = noAssuranceMaladie;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.license = license;
    this.birth = birth;
    this.sex = sex;
    this.profileCompleted = profileCompleted;
    this.tutor = tutor;
  }

  getLastNumberOrNassm() {
    return '**** **** *' + this.noAssuranceMaladie.substring(this.noAssuranceMaladie.length - 3);
  }

  getAddress() {
    let address = this.address;
    return address?.street + ((address.apt.length > 0) ? (' Apt: ' + address?.apt) : '') + '\n' + address?.city + '\n' + '(' + address?.province + ') ' + address?.zipCode;
  }

}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
