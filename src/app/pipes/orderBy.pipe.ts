import { NumberFormatStyle } from "@angular/common/src/pipes/intl";
import { forEach } from "@angular/router/src/utils/collection";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "orderBy" })
export class OrderrByPipe implements PipeTransform {
  transform(meetings: Array<any>, args?: any): any {
    if (!meetings) return meetings;
    return meetings.sort(function(a, b) {
      let timeA: number[] = a[args.property].split("/");
      let timeB:number[] = b[args.property].split("/");

      for (var i = timeA.length - 1; i >= 0; i--) {
        if (Number(timeA[i]) < Number(timeB[i])) {
          return -1 * args.direction;
        } else if (Number(timeA[i]) > Number(timeB[i])) {
          return 1 * args.direction;
        }
      }
      return 0;
    });
  }
}
