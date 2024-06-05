import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElementsComponent } from './list-elements.component';

describe('ListElementsComponent', () => {
  let component: ListElementsComponent;
  let fixture: ComponentFixture<ListElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
