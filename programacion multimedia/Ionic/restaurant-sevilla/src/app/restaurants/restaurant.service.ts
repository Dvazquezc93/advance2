import { Injectable } from '@angular/core';
import { CartaBasica, restaurant } from './restaurant.model';


@Injectable({
    providedIn:'root'
})
export class RestaurantService {
    private restaurants:restaurant[]=[
    
  {
    "id": "1",
    "nombre": "Taberna Los Coloniales",
    "direccion": "C. Fernández y González, 36, Casco Antiguo, 41001 Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "954 22 93 81",
    "imageURL": "https://lh3.googleusercontent.com/grass-cs/AABkmLfafxASWaPhKH-RNqlxQcrWNO6N6BiJMylwoiTwnuT_98n8Nxdqa5aJAdzarATvXDoYKb-S6F_79ntXGmfSXmRkmgnaS92_QI3PgrAXCI8sSf3P6nP5p7-sLisHmA1gzVHcKGF8kg=w408-h268-k-no",
    "descripcion": "Clásica taberna de vigas de madera con terraza ubicada en pleno casco antiguo de Sevilla. Es muy popular por ofrecer tapas tradicionales sevillanas y raciones generosas a precios económicos en un ambiente animado y casual.",
    "cartaBasica": {
      "entrantes": [
        "Buñuelos de queso con mermelada de chile dulce",
        "Croquetas de espinacas y champiñones",
        "Berenjenas con salsa de la casa"
      ],
      "platosPrincipales": [
        "Pechugas de pollo con salsa de almendras",
        "Tablas variadas de tapas"
      ],
      "postres": [
        "Tarta de queso estilo español"
      ]
    },
    "comments": [
      "Los mejores buñuelos de queso del mundo.",
      "Las mejores pechugas con salsa de almendras y tablas de tapas del centro.",
      "Raciones muy generosas a precios increíbles, aunque siempre toca esperar mesa."
    ]
  },
  {
    "id": "2",
    "nombre": "Taberna La Niña de Enrique",
    "direccion": "C. Tharsis, 5, 41008 Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "955 54 39 78",
    "imageURL": "https://lh3.googleusercontent.com/grass-cs/AABkmLfIGlmJDO_tFGSWrkWRXSzh7V7McPYOgj0YBQujUdpZc7q9Sa06SjlzYmgSwAvyVzOQtuU9Zk_vaSue_QRh5-n70mJdpXIXOfxvhGNl9Y-E_sojrLLCa08qwoPQU0dGQG9Ouo8=w408-h306-k-no",
    "descripcion": "Auténtico bar de barrio en la zona de Arroyo caracterizado por un ambiente familiar, trato cercano, terraza exterior y cerveza muy fría.",
    "cartaBasica": {
      "entrantes": [
        "Chacinas",
        "Aliños tradicionales",
        "Tapas frías de barra"
      ],
      "platosPrincipales": [
        "Montaditos variados",
        "Guisos caseros del día"
      ],
      "postres": [
        "Selección básica de postres caseros"
      ]
    },
    "comments": [
      "Auténtico bar de barrio con montaditos espectaculares y guisos caseros.",
      "Ambiente inmejorable en la zona de Arroyo, cerveza fría de diez y trato cercano."
    ]
  },
  {
    "id": "3",
    "nombre": "Café-Bar El Barrio",
    "direccion": "C. Samaniego, 2, 41008 Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "954 94 36 51",
    "imageURL": "https://lh3.googleusercontent.com/grass-cs/AABkmLfo0pfAZVWeVa6wu_JuDpsdbM5agKX_oNPWHRSK3Ic_p8OQMI2Vbx51R1h4nq5lIe6ZMIIWefi8qidEobSHdyeUUtV8BZOCDQc6Du4ngf-vcs8jgk9L4wgWbWWTOu-bt6sv3YEEcg=w408-h544-k-no",
    "descripcion": "Establecimiento clásico de barrio con terraza y ambiente cofrade que funciona desde primera hora de la mañana para desayunos hasta la noche para el tapeo informal.",
    "cartaBasica": {
      "entrantes": [
        "Tostadas de desayuno",
        "Chacinas",
        "Tapas frías tradicionales"
      ],
      "platosPrincipales": [
        "Tapas calientes sevillanas",
        "Montaditos",
        "Raciones para compartir"
      ],
      "postres": [
        "Dulces y postres tradicionales"
      ]
    },
    "comments": [
      "Punto de encuentro clásico junto a la parroquia, perfecto para terracear.",
      "Tapas tradicionales sevillanas, buen café de desayuno y ambiente cofrade."
    ]
  },
  {
    "id": "4",
    "nombre": "Cervecería Adrián",
    "direccion": "Av. de Llanes, 4, 41008 Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "954 35 12 40",
    "imageURL": "https://lh3.googleusercontent.com/grass-cs/AABkmLeOnYQADtyrwZr0W-9YQsGUIeSjRpfrm1xSdZ9jiQ9t7Ie9M0DMPOoVxMdfEbfg38yp-idITnRq81Vm-fWrJjAMWEzzSaI1CmcQOeUEvBmozOYGd3NSNXEHpaS9NWJtwN634N1p=w408-h305-k-no",
    "descripcion": "Cervecería tradicional muy concurrida y con terraza agradable, reconocida por servir cerveza tirada a punto de nieve y especializarse en productos del mar.",
    "cartaBasica": {
      "entrantes": [
        "Aliños de marisco",
        "Gambas y langostinos",
        "Marisco cocido o a la plancha"
      ],
      "platosPrincipales": [
        "Pescaíto frito variado (chocos, adobo, boquerones, puntillitas)"
      ],
      "postres": [
        "Postres habituales de cervecería"
      ]
    },
    "comments": [
      "El marisco y el pescaíto frito salen siempre en su punto perfecto.",
      "Cerveza tirada impecable a punto de nieve y una terraza muy agradable."
    ]
  },
  {
    "id": "5",
    "nombre": "Shibuya Urban Sushi",
    "direccion": "C. Albareda, 10, Casco Antiguo, 41001 Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "954 03 50 30",
    "imageURL": "https://lh3.googleusercontent.com/grass-cs/AABkmLcCAbo-pyV7Hq_cp1lLZTn8B6Ty0dKSmc5YXvikc9ZN267FNMpEnRmd0dd9jRFti_GpuFtQOvtGqkqo2K0mEHU6XcqpgRt3QO4d0fG4XW-i9GPdyme477jqArUS9E57YqhxXLE=w408-h272-k-no",
    "descripcion": "Restaurante de cocina japonesa contemporánea ubicado en el centro de Sevilla, con decoración de estilo moderno e industrial con detalles en madera y amplia oferta vegetariana y vegana.",
    "cartaBasica": {
      "entrantes": [
        "Edamame",
        "Gyozas",
        "Baos",
        "Ensaladas japonesas"
      ],
      "platosPrincipales": [
        "Sushi rolls (maki flameado)",
        "Nigiris y sashimi",
        "Ramen y platos calientes orientales"
      ],
      "postres": [
        "Tarta de chocolate",
        "Tarta de queso esponjosa estilo japonés"
      ]
    },
    "comments": [
      "Excelente sushi y ramen tradicional en pleno centro de Sevilla.",
      "Local acogedor con ambientación japonesa muy cuidada y trato impecable."
    ]
  },
  {
    "id": "6",
    "nombre": "Danbam Korean bar",
    "direccion": "C. Julio César, 10, Casco Antiguo, 41001 Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "633 46 19 16",
    "imageURL": "https://lh3.googleusercontent.com/grass-cs/AABkmLcuPd3B206AFXNqf7hCBEfZdr8p3ZcB2k3bWQbC61qdJuU0g59uKUWBJ2Cmpw96bJn-9FZJwmTsYgyyimTqMg_LpCcnEJDhMnn-0v6hZNF06FvfPsbYG7Ya--yCueUkSj2kvlJLNA=w408-h725-k-no",
    "descripcion": "Restaurante especializado en gastronomía coreana auténtica situado junto a Plaza de Armas, valorado por sus raciones abundantes y buena relación calidad-precio.",
    "cartaBasica": {
      "entrantes": [
        "Kimchi casero",
        "Entrantes tradicionales coreanos"
      ],
      "platosPrincipales": [
        "Bibimbap",
        "Bulgogi"
      ],
      "postres": [
        "Postres de inspiración asiática"
      ]
    },
    "comments": [
      "Comida coreana 100% auténtica: bibimbap, kimchi casero y bulgogi riquísimos.",
      "Muy cerca de Plaza de Armas, platos abundantes y una relación calidad-precio genial."
    ]
  },
  {
    "id": "7",
    "nombre": "Cocomá Noodle Bar",
    "direccion": "C. Albaicín, 2A, Loc 5, 41930 Bormujos, Sevilla",
    "numeroTenedores": "1 tenedor",
    "telefono": "854 71 00 54",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPXB-o7Y5tzkJ4dLcO-rb7U7A3OKotAzvqkk7UN1WZfg&s=10",
    "descripcion": "Restaurante situado en Bormujos con una propuesta gastronómica moderna y cuidada de fusión asiática y tapas elaboradas, ideal para cenas tranquilas y con opciones vegetarianas y veganas.",
    "cartaBasica": {
      "entrantes": [
        "Tapas elaboradas de inspiración asiática",
        "Entrantes para compartir"
      ],
      "platosPrincipales": [
        "Platos de noodles salteados",
        "Currys y especialidades orientales"
      ],
      "postres": [
        "Postres caseros"
      ]
    },
    "comments": [
      "Propuesta gastronómica moderna y cuidada en Bormujos, ideal para cenas tranquilas.",
      "Gran carta de tapas elaboradas, postres caseros y un servicio atento y rápido."
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
    
    addRestaurant(nombre:string,
       imageURL:string,
        direccion:string, 
        numeroTenedores:string,
      telefono:string,
       descripcion:string,
       cartaBasica:CartaBasica,
    ) {
        this.restaurants.push({
            nombre,
            imageURL,
            direccion,
           numeroTenedores,
            telefono,
            descripcion,
            cartaBasica,
            comments:[],
            id: (this.restaurants.length+1).toString()
        })
    }

    deleteRestaurant(restaurantID :string|undefined) {
        this.restaurants = this.restaurants.filter(r => r.id !== restaurantID);
    }
}
