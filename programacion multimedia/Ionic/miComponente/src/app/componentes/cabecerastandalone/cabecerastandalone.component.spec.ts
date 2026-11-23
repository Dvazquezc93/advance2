import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/lazy';

import { CabecerastandaloneComponent } from './cabecerastandalone.component';

describe('CabecerastandaloneComponent', () => {
  let component: CabecerastandaloneComponent;
  let fixture: ComponentFixture<CabecerastandaloneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerastandaloneComponent],
      imports: [IonicModule.forRoot()],
    });

    fixture = TestBed.createComponent(CabecerastandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
