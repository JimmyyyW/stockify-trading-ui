import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  
   }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  yes: string,
  no: string
}