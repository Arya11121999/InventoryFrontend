import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryPageComponent } from './factory-page.component';

describe('FactoryPageComponent', () => {
  let component: FactoryPageComponent;
  let fixture: ComponentFixture<FactoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
