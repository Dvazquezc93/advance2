import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/lazy';
import { restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
  standalone: false,
})
export class RestaurantPage implements OnInit {
  titulo = "Restaurantes de Sevilla";
  restaurants: restaurant[] = [];
  filteredRestaurants: restaurant[] = [];
  searchTerm: string = '';
  isDarkMode: boolean = false;

  constructor(
    private restaurantsService: RestaurantService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.checkInitialTheme();
    this.loadRestaurants();
  }

  ionViewWillEnter() {
    this.loadRestaurants();
  }

  checkInitialTheme() {
    const savedTheme = localStorage.getItem('theme-dark');
    if (savedTheme === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('ion-palette-dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
    localStorage.setItem('theme-dark', this.isDarkMode ? 'true' : 'false');
  }

  loadRestaurants() {
    this.restaurants = this.restaurantsService.getRestaurants();
    this.applyFilter();
  }

  filterRestaurants(event: any) {
    this.searchTerm = event.detail.value || '';
    this.applyFilter();
  }

  applyFilter() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredRestaurants = [...this.restaurants];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredRestaurants = this.restaurants.filter(r =>
        r.nombre?.toLowerCase().includes(term)
      );
    }
  }

  newRestaurant() {
    this.router.navigate(['/restaurants/restaurant-add']);
  }

  async deleteRestaurant(restaurant: restaurant, event: Event) {
    event.stopPropagation();
    const alert = await this.alertCtrl.create({
      header: '¿Eliminar restaurante?',
      message: `¿Estás seguro de que deseas eliminar "${restaurant.nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (restaurant.id) {
              this.restaurantsService.deleteRestaurant(restaurant.id);
              this.loadRestaurants();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
