import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantAddPage } from './restaurant-add.page';

describe('RestaurantAddPage', () => {
  let component: RestaurantAddPage;
  let fixture: ComponentFixture<RestaurantAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
