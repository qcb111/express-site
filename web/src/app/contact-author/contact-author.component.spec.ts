import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAuthorComponent } from './contact-author.component';

describe('ContactAuthorComponent', () => {
  let component: ContactAuthorComponent;
  let fixture: ComponentFixture<ContactAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
