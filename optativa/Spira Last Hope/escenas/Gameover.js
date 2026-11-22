import { RestarButton } from "../Componentes/RestartButton.js";
export class Gameover extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameover' })
            this.restartButton = new RestarButton(this);
    }
    preload() {
        this.load.image('gameover', 'images/gameover.png');
        //precargamos restrartbutton
        this.restartButton.preload();
    }
     create() {
        this.add.image(400, 250, 'background'); 
        this.GameoverImage = this.add.image(400, 190, 'gameover').setScale(0.5);
        this.restartButton.create();
    }
}