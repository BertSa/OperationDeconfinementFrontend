import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hiddenNassm'
})
export class HiddenNassmPipe implements PipeTransform {

  transform(nassm: string): string {
    if (!nassm){
      return '**** **** ****'
    }
    return '**** **** *' + nassm.substring(nassm.length - 3);
  }

}
