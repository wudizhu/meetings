export class Meeting {
  key: string;
  time: string;
  description: string;
  speaker: string;
  speakerPictureURL: string;
  speakerlink: string;
  status: string;

  constructor(
    key: string = "key",
    time: string = "",
    description: string = "",
    speaker: string = "" ,
    speakerPictureURL: string = "",
    speakerlink: string = "",
    status: string = "") {
    this.key = key;
    this.time = time;
    this.description = description;
    this.speakerPictureURL = !speakerPictureURL ? "assets/images/placeholder.png" : speakerPictureURL;
    this.speaker = speaker;
    this.speakerlink = speakerlink;
    this.status = status;
  }



}
