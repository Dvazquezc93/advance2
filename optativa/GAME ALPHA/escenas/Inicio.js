import { StartButton } from "../Componentes/StartButton.js";

export class Inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'inicio' });
        this.startButton = new StartButton(this);
    }

    preload() {
        this.load.image('inicioFondo', 'images/inicio.png');
     
    }

    create() {
        // Fondo
        this.add.image(400, 250, 'inicioFondo')

        

        // Botón INICIAR mediante componente
        this.startButton.create();
    }
}
