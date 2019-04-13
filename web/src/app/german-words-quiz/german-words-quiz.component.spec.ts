import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GermanWordsQuizComponent } from './german-words-quiz.component';

describe('GermanWordsQuizComponent', () => {
  let component: GermanWordsQuizComponent;
  let fixture: ComponentFixture<GermanWordsQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GermanWordsQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GermanWordsQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
