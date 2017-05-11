import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftesComponent } from './gifts.component';

describe('GiftesComponent', () => {
  let component: GiftesComponent;
  let fixture: ComponentFixture<GiftesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
