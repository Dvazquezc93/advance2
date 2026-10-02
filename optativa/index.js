import { congratulations } from './Componentes/congratulations.js';
import { Gameover } from './Componentes/Gameover.js';
import {Game} from './game.js'

const config  = {
    type : Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [Game,Gameover,congratulations],
    physics: {
        default :'arcade',
        arcade: {
           // gravity: {y: 40},
            debug: false
        }
    }

}
var game = new Phaser.Game(config);