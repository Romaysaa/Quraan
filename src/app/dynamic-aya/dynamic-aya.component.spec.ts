import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicAyaComponent } from './dynamic-aya.component';

describe('DynamicAyaComponent', () => {
  let component: DynamicAyaComponent;
  let fixture: ComponentFixture<DynamicAyaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
