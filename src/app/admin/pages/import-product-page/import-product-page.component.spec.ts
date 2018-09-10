import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProductPageComponent } from './import-product-page.component';

describe('ImportProductPageComponent', () => {
  let component: ImportProductPageComponent;
  let fixture: ComponentFixture<ImportProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
