import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSearchComponent } from './gift-search.component';

describe('GiftSearchComponent', () => {
  let component: GiftSearchComponent;
  let fixture: ComponentFixture<GiftSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
