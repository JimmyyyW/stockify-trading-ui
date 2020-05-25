import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolSelectDialogComponent } from './symbol-select-dialog.component';

describe('SymbolSelectDialogComponent', () => {
  let component: SymbolSelectDialogComponent;
  let fixture: ComponentFixture<SymbolSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
