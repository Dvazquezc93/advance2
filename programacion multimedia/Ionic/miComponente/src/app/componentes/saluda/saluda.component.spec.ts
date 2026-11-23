import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/lazy';

import { SaludaComponent } from './saluda.component';

describe('SaludaComponent', () => {
  let component: SaludaComponent;
  let fixture: ComponentFixture<SaludaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaludaComponent],
      imports: [IonicModule.forRoot()],
    });

    fixture = TestBed.createComponent(SaludaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
