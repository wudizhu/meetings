import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    if (!value) {
      return value;
    }
    console.log("value : "+ JSON.stringify(value));
    console.log("type of value "+ typeof(value));

    let keys = [];
    for (let key in value) {
      console.log("key " + JSON.stringify(key));
      keys.push({ gift: key, data: value[key] });
    }

    // for (let key in value[0]) {
    //    console.log(JSON.stringify(key));
    //    console.log(Object.keys(key));
    //   keys.push({ gift: key, value: value[key] });
    // }
    console.log(JSON.stringify(keys));
    return keys;
  }
}
