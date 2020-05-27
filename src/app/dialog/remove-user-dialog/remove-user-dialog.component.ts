import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-user-dialog',
  templateUrl: './remove-user-dialog.component.html',
  styleUrls: ['./remove-user-dialog.component.scss']
})
export class RemoveUserDialogComponent implements OnInit {


  id: string;

  constructor(
    public dialogRef: MatDialogRef<RemoveUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
   this.id = data.id;
   }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  yes: string,
  no: string,
  id: string
}