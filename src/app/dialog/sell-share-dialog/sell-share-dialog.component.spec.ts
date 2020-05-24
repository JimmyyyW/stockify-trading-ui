import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellShareDialogComponent } from './sell-share-dialog.component';

describe('SellShareDialogComponent', () => {
  let component: SellShareDialogComponent;
  let fixture: ComponentFixture<SellShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
