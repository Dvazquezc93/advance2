import { RestarButton } from "../Componentes/RestartButton.js";
export class congratulations extends Phaser.Scene {

    constructor(){
        super({
            key:'congratulations'
        })
         this.restartButton = new RestarButton(this);
    }
    preload(){
        this.load.image('background', 'images/background.png');
        this.load.image('congratulation', 'images/congratulation.png');
        this.restartButton.preload();
    }
    create(){
        // Fondo centrado
        this.add.image(400, 250, 'background');

        // Imagen de felicitación centrada y con escala adecuada
        this.congratsImage = this.add.image(400, 180, 'congratulation').setScale(0.5);

        // Botón de reinicio debajo del cartel
        this.restartButton.create(400, 360);
    }
}