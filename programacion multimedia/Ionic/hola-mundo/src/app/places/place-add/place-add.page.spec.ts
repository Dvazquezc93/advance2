import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceAddPage } from './place-add.page';

describe('PlaceAddPage', () => {
  let component: PlaceAddPage;
  let fixture: ComponentFixture<PlaceAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
