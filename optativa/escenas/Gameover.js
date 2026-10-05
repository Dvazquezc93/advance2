import { RestarButton } from "../Componentes/RestartButton"
export class Gameover extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameover'
        })
        this.restarButtonutton = new RestarButton(this);
    }
    preload() {
        this.load.image('gameover', 'images/gameover.png');
        //precargamos restrarbutton
        this.restarButton.preload();
    }
}