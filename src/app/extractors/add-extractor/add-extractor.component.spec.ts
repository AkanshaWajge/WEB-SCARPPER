import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtractorComponent } from './add-extractor.component';

describe('AddExtractorComponent', () => {
  let component: AddExtractorComponent;
  let fixture: ComponentFixture<AddExtractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExtractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
