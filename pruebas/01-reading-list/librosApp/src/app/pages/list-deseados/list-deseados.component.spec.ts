import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeseadosComponent } from './list-deseados.component';

describe('ListDeseadosComponent', () => {
  let component: ListDeseadosComponent;
  let fixture: ComponentFixture<ListDeseadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeseadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeseadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
