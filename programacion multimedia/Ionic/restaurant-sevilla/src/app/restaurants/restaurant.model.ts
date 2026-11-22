export interface CartaBasica {
  entrantes?: string[];
  platosPrincipales?: string[];
  postres?: string[];
}

export interface restaurant {
  id?: string;
  nombre?: string;
  direccion?: string;
  numeroTenedores?: string;
  telefono?: string;
  imageURL?: string;
  descripcion?: string;
  cartaBasica?: CartaBasica;
  comments?: string[];
}