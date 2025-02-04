import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InflowComponent } from './inflow.component';

describe('InflowComponent', () => {
  let component: InflowComponent;
  let fixture: ComponentFixture<InflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
