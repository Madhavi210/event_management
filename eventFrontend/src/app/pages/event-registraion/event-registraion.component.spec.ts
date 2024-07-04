import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistraionComponent } from './event-registraion.component';

describe('EventRegistraionComponent', () => {
  let component: EventRegistraionComponent;
  let fixture: ComponentFixture<EventRegistraionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventRegistraionComponent]
    });
    fixture = TestBed.createComponent(EventRegistraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
