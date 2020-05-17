import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyShareDialogComponent } from './buy-share-dialog.component';

describe('BuyShareDialogComponent', () => {
  let component: BuyShareDialogComponent;
  let fixture: ComponentFixture<BuyShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
