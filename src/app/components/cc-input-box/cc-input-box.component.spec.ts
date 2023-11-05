import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcInputBoxComponent } from './cc-input-box.component';

describe('CcInputBoxComponent', () => {
  let component: CcInputBoxComponent;
  let fixture: ComponentFixture<CcInputBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CcInputBoxComponent]
    });
    fixture = TestBed.createComponent(CcInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
