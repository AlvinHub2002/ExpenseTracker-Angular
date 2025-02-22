import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModelComponent } from './transaction-model.component';

describe('TransactionModelComponent', () => {
  let component: TransactionModelComponent;
  let fixture: ComponentFixture<TransactionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
