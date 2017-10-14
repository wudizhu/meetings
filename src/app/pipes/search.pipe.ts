import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'SearchMeeting' })
export class SearchMeetingPipe implements PipeTransform {
  transform(meetings: any[], searchText: any): any {
    if(searchText == null || searchText == "") return meetings;
    return meetings.filter(function(meeting){
      return (meeting.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1) || ((meeting.speaker.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
    })
  }
}
