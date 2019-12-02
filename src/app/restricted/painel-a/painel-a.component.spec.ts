import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAComponent } from './painel-a.component';

describe('PainelAComponent', () => {
  let component: PainelAComponent;
  let fixture: ComponentFixture<PainelAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
