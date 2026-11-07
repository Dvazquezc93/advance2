import { Injectable, Service } from '@angular/core';
import { restaurant } from './restaurant.model';


@Injectable({
    providedIn:'root'
})
export class RestaurantService {
    private restaurants:restaurant[]=[
  {
    id: '1',
    title: 'Taberna Los Coloniales ',
    imageURL: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfafxASWaPhKH-RNqlxQcrWNO6N6BiJMylwoiTwnuT_98n8Nxdqa5aJAdzarATvXDoYKb-S6F_79ntXGmfSXmRkmgnaS92_QI3PgrAXCI8sSf3P6nP5p7-sLisHmA1gzVHcKGF8kg=w408-h268-k-no',
    comments: [
      'Los mejores buñuelos de queso del mundo.',
      'Las mejores pechugas con salsa de almendras y tablas de tapas del centro.',
      'Raciones muy generosas a precios increíbles, aunque siempre toca esperar mesa.',
      
    ]
  },
  {
    id: '2',
    title: 'Taberna La Niña de Enrique',
    imageURL: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfIGlmJDO_tFGSWrkWRXSzh7V7McPYOgj0YBQujUdpZc7q9Sa06SjlzYmgSwAvyVzOQtuU9Zk_vaSue_QRh5-n70mJdpXIXOfxvhGNl9Y-E_sojrLLCa08qwoPQU0dGQG9Ouo8=w408-h306-k-no',
    comments: [
      'Auténtico bar de barrio con montaditos espectaculares y guisos caseros.',
      'Ambiente inmejorable en la zona de Arroyo, cerveza fría de diez y trato cercano.'
    ]
  },
  {
    id: '3',
    title: 'Café-Bar El Barrio',
    imageURL: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfo0pfAZVWeVa6wu_JuDpsdbM5agKX_oNPWHRSK3Ic_p8OQMI2Vbx51R1h4nq5lIe6ZMIIWefi8qidEobSHdyeUUtV8BZOCDQc6Du4ngf-vcs8jgk9L4wgWbWWTOu-bt6sv3YEEcg=w408-h544-k-no',
    comments: [
      'Punto de encuentro clásico junto a la parroquia, perfecto para terracear.',
      'Tapas tradicionales sevillanas, buen café de desayuno y ambiente cofrade.'
    ]
  },
  {
    id: '4',
    title: 'Cervecería Adrián',
    imageURL: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeOnYQADtyrwZr0W-9YQsGUIeSjRpfrm1xSdZ9jiQ9t7Ie9M0DMPOoVxMdfEbfg38yp-idITnRq81Vm-fWrJjAMWEzzSaI1CmcQOeUEvBmozOYGd3NSNXEHpaS9NWJtwN634N1p=w408-h305-k-no',
    comments: [
      'El marisco y el pescaíto frito salen siempre en su punto perfecto.',
      'Cerveza tirada impecable a punto de nieve y una terraza muy agradable.'
    ]
  },
  {
    id: '5',
    title: 'Shibuya Urban Sushi',
    imageURL: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcCAbo-pyV7Hq_cp1lLZTn8B6Ty0dKSmc5YXvikc9ZN267FNMpEnRmd0dd9jRFti_GpuFtQOvtGqkqo2K0mEHU6XcqpgRt3QO4d0fG4XW-i9GPdyme477jqArUS9E57YqhxXLE=w408-h272-k-no',
    comments: [
      'Excelente sushi y ramen tradicional en pleno centro de Sevilla.',
      'Local acogedor con ambientación japonesa muy cuidada y trato impecable.'
    ]
  },
  {
    id: '6',
    title: 'Danbam Korean bar',
    imageURL: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcuPd3B206AFXNqf7hCBEfZdr8p3ZcB2k3bWQbC61qdJuU0g59uKUWBJ2Cmpw96bJn-9FZJwmTsYgyyimTqMg_LpCcnEJDhMnn-0v6hZNF06FvfPsbYG7Ya--yCueUkSj2kvlJLNA=w408-h725-k-no',
    comments: [
      'Comida coreana 100% auténtica: bibimbap, kimchi casero y bulgogi riquísimos.',
      'Muy cerca de Plaza de Armas, platos abundantes y una relación calidad-precio genial.'
    ]
  },
  {
    id: '7',
    title: 'Cocomá Noodle Bar',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPXB-o7Y5tzkJ4dLcO-rb7U7A3OKotAzvqkk7UN1WZfg&s=10',
    comments: [
      'Propuesta gastronómica moderna y cuidada en Bormujos, ideal para cenas tranquilas.',
      'Gran carta de tapas elaboradas, postres caseros y un servicio atento y rápido.'
    ]
  }

]
    constructor() {}

    getRestaurants() {
        return[...this.restaurants]
    }

    getRestaurant(restaurantID:string|null) {
        return{
            ...this.restaurants.find(r=> r.id===restaurantID)
        }
    }
    
    addRestaurant(title:string, imageURL:string) {
        this.restaurants.push({
            title,
            imageURL,
            comments:[],
            id: (this.restaurants.length+1).toString()
        })
    }

    deleteRestaurant(restaurantID :string|undefined) {
        this.restaurants.filter(r=>{return  r.id!= restaurantID})
    }
}
