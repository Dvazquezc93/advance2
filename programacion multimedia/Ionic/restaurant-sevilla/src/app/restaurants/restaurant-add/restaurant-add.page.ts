import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular/lazy';
import { CartaBasica } from '../restaurant.model';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.page.html',
  styleUrls: ['./restaurant-add.page.scss'],
  standalone: false,
})
export class RestaurantAddPage implements OnInit {
  titulo: string = "Añadir restaurante";

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async saveNewRestaurant(
    nombre: IonInput,
    direccion: IonInput,
    tenedor: IonInput,
    telefono: IonInput,
    descripcion: IonInput,
    entrantes: IonInput,
    principales: IonInput,
    postres: IonInput,
    image: IonInput
  ) {
    const nombreVal = (nombre.value as string)?.trim() || '';
    const direccionVal = (direccion.value as string)?.trim() || '';
    const tenedorVal = (tenedor.value as string)?.trim() || '';
    const telefonoVal = (telefono.value as string)?.trim() || '';

    // Validación de campos obligatorios según especificaciones
    if (!nombreVal || !direccionVal || !tenedorVal || !telefonoVal) {
      const alert = await this.alertCtrl.create({
        header: 'Campos requeridos',
        message: 'Por favor, introduce al menos el nombre, la dirección, la categoría de tenedores y el teléfono de contacto.',
        buttons: ['Entendido']
      });
      await alert.present();
      return;
    }

    const cartaBasica: CartaBasica = {
      entrantes: entrantes.value ? [(entrantes.value as string).trim()] : [],
      platosPrincipales: principales.value ? [(principales.value as string).trim()] : [],
      postres: postres.value ? [(postres.value as string).trim()] : []
    };

    const imageVal = (image.value as string)?.trim() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80';

    this.restaurantService.addRestaurant(
      nombreVal,
      imageVal,
      direccionVal,
      tenedorVal,
      telefonoVal,
      (descripcion.value as string)?.trim() || '',
      cartaBasica
    );

    this.router.navigate(['/restaurants']);
  }
}
