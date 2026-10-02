import { RestarButton } from "./RestartButton"
export class Gameover extends Phaser.Scene {
    
     constructor(){
        super({
            key:'gameover'
        })
        this.restarButtonutton = new RestarButton(this);
    }
}