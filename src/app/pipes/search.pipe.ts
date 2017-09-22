import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilter implements PipeTransform {
  transform(items: any[], property: any, criteria: any): any {
    console.log("pipe " + items, property, criteria);
    return items.filter(item => {
      console.log("filtering " +  JSON.stringify(item));
      if(item.hasOwnProperty(property)) {
        console.log("filtering Property " +  JSON.stringify(item.property));
        if (item.property == criteria) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log("No criteria hit " +  JSON.stringify(item));
        return true;
      }
    })
  }
}
