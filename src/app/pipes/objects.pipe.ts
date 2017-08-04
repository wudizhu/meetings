import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    if (!value) {
      return value;
    }
    let keys = [];
    for (let key in value) {
      keys.push({ gift: key, data: value[key] });
    }
    return keys;
  }
}
