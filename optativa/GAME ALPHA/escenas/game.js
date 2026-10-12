import { Scoreboard } from "../Componentes/Scoreboard.js"
import { RestarButton } from "../Componentes/RestartButton.js";
import { Gameover } from "../escenas/Gameover.js";

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    init() {
        this.scoreboard = new Scoreboard(this);
    
    }
    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('vida', 'images/vida.png.png');
        this.load.image('flyship', 'images/flyship.png.png');
        this.load.image('ball', 'images/ball.png');
       
    
       
       
    }


    create() {
        //imagenes de fondo
        this.add.image(400, 250, 'background');
      
       
        // Barco volador (a la mitad del lado izquierdo y con escala ajustada)
        this.flyShip = this.physics.add.image(100, 250, 'flyship').setScale(0.04);
        this.flyShip.body.setSize(this.flyShip.displayWidth, this.flyShip.displayHeight, true);
        this.flyShip.body.allowGravity = false;
        this.flyShip.setCollideWorldBounds(true);

        // Cursores
        this.cursors = this.input.keyboard.createCursorKeys();

        // Grupo de proyectiles (bolas)
        this.balls = this.physics.add.group();

        // Disparo continuo y repetido (cada 400 ms)
        this.time.addEvent({
            delay: 400,
            callback: this.shootBall,
            callbackScope: this,
            loop: true
        });
    }
    
    


    update() {
        

        // Movimiento horizontal
        if (this.cursors.left.isDown) {
            this.flyShip.setVelocityX(-350);
        } else if (this.cursors.right.isDown) {
            this.flyShip.setVelocityX(350);
        } else {
            this.flyShip.setVelocityX(0);
        }

        // Movimiento vertical (Y negativo hacia arriba, Y positivo hacia abajo)
        if (this.cursors.up.isDown) {
            this.flyShip.setVelocityY(-350);
        } else if (this.cursors.down.isDown) {
            this.flyShip.setVelocityY(350);
        } else {
            this.flyShip.setVelocityY(0);
        }
        // Eliminar las bolas que salgan de la pantalla por la derecha
        this.balls.getChildren().forEach((ball) => {
            if (ball && ball.x > 850) {
                ball.destroy();
            }
        });
    }

    shootBall() {
        if (!this.flyShip || !this.flyShip.active) return;

        // Sale desde el lado derecho del barco
        const spawnX = this.flyShip.x + (this.flyShip.displayWidth / 2);
        const spawnY = this.flyShip.y;

        const ball = this.balls.create(spawnX, spawnY, 'ball');
        if (ball) {
            ball.setScale(0.5); // Escala para que coincida con el tamaño del barco
            ball.body.allowGravity = false;
            ball.setVelocityX(450); // Velocidad constante hacia la derecha
        }
    }

    showGameOver(){
        this.scene.start('gameover');
    }
    showCongratulations(){
        this.scene.start('congratulations');
    }
}
