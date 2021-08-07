import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenSettingComponent } from './listen-setting.component';

describe('ListenSettingComponent', () => {
  let component: ListenSettingComponent;
  let fixture: ComponentFixture<ListenSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
