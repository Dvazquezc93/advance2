import { congratulations } from './escenas/Congratulations.js';
import { Gameover } from './escenas/Gameover.js';
import {Game} from './escenas/game.js'

const config  = {
    type : Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [Game,congratulations,Gameover],
    physics: {
        default :'arcade',
        arcade: {
           // gravity: {y: 40},
            debug: false
        }
    }

}
var game = new Phaser.Game(config);