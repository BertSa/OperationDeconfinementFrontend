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
