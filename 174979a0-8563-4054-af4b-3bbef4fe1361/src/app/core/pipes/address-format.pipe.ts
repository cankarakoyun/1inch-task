import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressFormat'
})
export class AddressFormatPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value && value.length > 7) {
      return `${value.substring(0, 3)}…${value.substring(value.length - 4)}`
    } else {
      return value
    }
  }
}
