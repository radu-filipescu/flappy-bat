import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpikesComponent } from './spikes.component';

describe('SpikesComponent', () => {
  let component: SpikesComponent;
  let fixture: ComponentFixture<SpikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
