import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonModalFormComponent } from './pokemon-modal-form.component';

describe('PokemonModalFormComponent', () => {
  let component: PokemonModalFormComponent;
  let fixture: ComponentFixture<PokemonModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
