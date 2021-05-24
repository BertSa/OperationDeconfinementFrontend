import {Address} from './address';
import {License} from './license';


export class Citizen {
  id: number;
  email: string;
  phone: string;
  noAssuranceMaladie: string;
  password: string;
  firstName: string;
  lastName: string;
  address: Address;
  license: License;
  birth: Date;
  sex: Sex;
  profileCompleted: boolean;

  tutor: Citizen | undefined;


  constructor(email: string, phone: string, noAssuranceMaladie: string, password: string, firstName: string, lastName: string, address: Address, license: License, birth: Date, sex: Sex, profileCompleted: boolean, tutor: Citizen) {
    this.email = email;
    this.phone = phone;
    this.noAssuranceMaladie = noAssuranceMaladie;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.license = license;
    this.birth = birth;
    this.sex = sex;
    this.profileCompleted = profileCompleted;
    this.tutor = tutor;
  }

  public getAddress() {
    let address = this.address;
    return address?.street + ((address.apt.length > 0) ? (' Apt: ' + address?.apt) : '') + '\n' + address?.city + '\n' + '(' + address?.province + ') ' + address?.zipCode;
  }

}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}
