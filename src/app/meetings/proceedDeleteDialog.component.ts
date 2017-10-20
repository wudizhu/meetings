import {Component} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'proceedDelete',
  template: '<button md-raised-button class="action-button" (click)="openDialog()">Delete</button>'
})
export class ProceedDelete {
  constructor(public dialog: MdDialog) {}
  result: any;

  openDialog() {
    let dialogRef = this.dialog.open(ProceedDeleteDialog, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      console.log(`Dialog result:` + this.result);
    });
  }
}

@Component({
  selector: 'proceedDeleteDialog',
  templateUrl: 'dialog.html'
})
export class ProceedDeleteDialog {
  constructor (public dialogRef: MdDialogRef<ProceedDeleteDialog>){}

    onYesClick() : void {
      this.dialogRef.close(true);
    }

    onNoClick(): void {
    this.dialogRef.close(false);
  }
}
