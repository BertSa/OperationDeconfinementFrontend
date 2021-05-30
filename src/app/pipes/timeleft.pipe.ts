import {Pipe, PipeTransform} from '@angular/core';
import {License, TypeLicense} from '../models/license';

@Pipe({
  name: 'timeleft'
})
export class TimeleftPipe implements PipeTransform {

  transform(value: License, ...args: unknown[]): string {
    if (value===null)
      return "Unknown"
    if (value?.type === TypeLicense.VACCINE) {
      return 'Permanent';
    }
    let difference = (new Date(value?.dateExpire).getTime() - new Date(Date.now()).getTime());
    let number = Math.ceil(difference / (1000 * 3600 * 24));
    if (number <= 0) {
      return 'Expired';
    }
    return number + ((number > 1) ? ' days left' : ' day left');
  }

}
