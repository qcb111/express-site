import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateWelcomeComponent } from './private-welcome.component';

describe('PrivateWelcomeComponent', () => {
  let component: PrivateWelcomeComponent;
  let fixture: ComponentFixture<PrivateWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
