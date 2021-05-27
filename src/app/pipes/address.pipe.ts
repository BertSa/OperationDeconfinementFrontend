import {Pipe, PipeTransform} from '@angular/core';
import {Address} from '../models/address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(address: Address, ...args: unknown[]): unknown {
    return address?.street + ((address?.apt.length > 0) ? (' Apt: ' + address?.apt) : '') + '\n' + address?.city + '\n' + '(' + address?.province + ') ' + address?.zipCode;

  }

}
