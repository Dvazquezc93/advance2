import { RestarButton } from "../Componentes/RestartButton.js";
export class congratulations extends Phaser.Scene {

    constructor(){
        super({
            key:'congratulations'
        })
         this.restartButton = new RestarButton(this);
    }
    preload(){
        this.load.image('congratulation', 'images/congratulation.png');
        this.restartButton.preload();
    }
    create(){
        this.add.image(410,250,'background')
        this.restartButton.create();
         this.congratsImage = this.add.image(400,90,'congratulation')
    }
}