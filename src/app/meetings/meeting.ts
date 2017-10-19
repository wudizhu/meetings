export class Meeting {
  time: string;
  description: string;
  speaker: string;
  speakerPictureURL: string;
  speakerlink: string;
  status: string;

  constructor(
    time: string = "",
    description: string = "",
    speaker: string = "" ,
    speakerPictureURL: string = "",
    speakerlink: string = "",
    status: string = "Ongoing") {
    this.time = time;
    this.description = description;
    this.speakerPictureURL = !speakerPictureURL ? "assets/images/placeholder.png" : speakerPictureURL;
    this.speaker = speaker;
    this.speakerlink = speakerlink;
    this.status = status;
  }



}
