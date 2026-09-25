//import { Scoreboard } from "./Componentes/Scoreboard"

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    init() {
        this.score = 0;
    }
    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('ball', 'images/ball.png')
    }

    create() {
        //imagenes de fondo
        this.add.image(400, 250, 'background');
        this.gameoverImage = this.add.image(400, 90, 'gameover').setScale(0.5);
        //final del juego
        this.gameoverImage.visible = false;
        //plataforma
        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
        //plataforma
        this.platform.body.allowGravity = false
        //gravedad de la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();
        //cursores       

        this.ball = this.physics.add.image(460, 30, 'ball');
        //bola
        ///this.platform.setVelocity(100,100);
        //velocidad plataforma
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
        //colisionador
        this.ball.setBounce(1);
        //rebote de bola
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.ball.setCollideWorldBounds(true);
        this.platform.setCollideWorldBounds(true);
        this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', {
            fontSize: '24px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',           // Dorado claro
            stroke: '#002255',         // Borde azul marino estilo FFX
            strokeThickness: 5,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000814',
                blur: 4,
                stroke: true,
                fill: true
            }
        })
        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);
    }
    //metodo bola plataforma
    platformImpact() {
        this.score++;
        this.scoreText.setText('Puntos: ' + this.score)
    }


    update() {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);

        }
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
        }
        // else if(this.cursors.down.isDown){
        //    this.platform.setVelocityY(-500);
        // }
        // else if(this.cursors.up.isDown){
        //     this.platform.setVelocityY(500);
        //}

        else {
            this.platform.setVelocityX(0);
        }
        if (this.ball.y > 500) {
            console.log("Fin de partida");
            this.gameoverImage.visible = true
            if (this.cursors.up.isDown) {
                this.scene.restart();
            }

        }

    }
}
