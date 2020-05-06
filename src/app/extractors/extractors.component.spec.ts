import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractorsComponent } from './extractors.component';

describe('ExtractorsComponent', () => {
  let component: ExtractorsComponent;
  let fixture: ComponentFixture<ExtractorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
