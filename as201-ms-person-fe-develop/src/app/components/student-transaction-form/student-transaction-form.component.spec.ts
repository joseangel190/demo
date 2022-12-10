import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTransactionFormComponent } from './student-transaction-form.component';

describe('StudentTransactionFormComponent', () => {
  let component: StudentTransactionFormComponent;
  let fixture: ComponentFixture<StudentTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
