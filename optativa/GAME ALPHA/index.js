import { congratulations } from './escenas/Congratulations.js';
import { Gameover } from './escenas/Gameover.js';
import { Game } from './escenas/game.js';
import { Inicio } from './escenas/Inicio.js';
import { PhaseOne } from './escenas/phaseone.js';
import { PhaseTwo } from './escenas/phasetwo.js';
import { PhaseThree } from './escenas/phasethree.js';

const config  = {
    type : Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [Inicio, PhaseOne, PhaseTwo, PhaseThree, Game, congratulations, Gameover],
    physics: {
        default :'arcade',
        arcade: {
           // gravity: {y: 40},
            debug: false
        }
    }

}
var game = new Phaser.Game(config);