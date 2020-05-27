import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  form: FormGroup;
  username: string;

  constructor(private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private userService:UserService,
    @Inject(MAT_DIALOG_DATA) public userData: UserData
    ) { }

  ngOnInit(): void {
    this.username = this.userData.username;
    this.form = this.formBuilder.group({
      name: [this.userData.name, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      email: [this.userData.email, Validators.required],
      password: [this.userData.password, Validators.required]
    });
  }

  submitUserInformation(): void {
    this.userService.updateUser(
      this.username,
      this.form.get('name').value,
      this.form.get('lastName').value,
      this.form.get('password').value,
      this.form.get('email').value)
        .subscribe((data: any) => {
          if (data instanceof HttpErrorResponse) {
            alert('ther may have been a problem');
            this.dialogRef.close();
          }
          else { 
            this.dialogRef.close(); 
          }
        });
  }


  onCancelClick(): void {
    this.dialogRef.close();
}

}

export interface UserData {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;

}
