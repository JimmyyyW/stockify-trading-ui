import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-symbol-select-dialog',
  templateUrl: './symbol-select-dialog.component.html',
  styleUrls: ['./symbol-select-dialog.component.scss']
})
export class SymbolSelectDialogComponent implements OnInit {

  symbols: string[];
  chosen: string[] = [];
  final: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<SymbolSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSymbols) {
   }

  ngOnInit(): void {
    this.data.stockSymbols.subscribe(data => this.symbols = data);
  
  }

  clicked(symbol: string) {
    this.chosen.push(symbol);
  }
  
  submit() { 
    let final = (arr: string[]) => arr.filter((v, i) => arr.indexOf(v) === i);
    this.dialogRef.close({ data: final(this.chosen) });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
 
}

export interface DialogSymbols {
  stockSymbols: Observable<string[]>;
}
