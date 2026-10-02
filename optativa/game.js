import { Scoreboard } from "./Componentes/Scoreboard.js"

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    init() {
        this.scoreboard = new Scoreboard(this);
    }
    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('bluebrick', 'images/brickBlue.png');
        this.load.image('blackbrick', 'images/brickBlack.png'),
            this.load.image('greenbrick', 'images/brickGreen.png');
        this.load.image('orangebrick', 'images/brickOrange.png');
        this.load.image('congratulation', 'images/congratulation.png');

    }


    create() {
        //imagenes de fondo
        this.add.image(400, 250, 'background');
        this.gameoverImage = this.add.image(400, 90, 'gameover').setScale(0.5);
        //final del juego
        this.gameoverImage.visible = false;
        this.congratulationImage = this.add.image(400.90, 'congratulation');
        this.congratulationImage = false;
        //plataforma
        this.platform = this.physics.add.image(400, 450, 'platform').setImmovable();
        //plataforma
        this.platform.body.allowGravity = false;
        //gravedad de la plataforma
        this.cursors = this.input.keyboard.createCursorKeys();
        //cursores       

        this.ball = this.physics.add.image(385, 370, 'ball');
        this.ball.setData('glue', true);
        //bola
        ///this.platform.setVelocity(100,100);
        //bricks

        //velocidad plataforma
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);
        //colisionado
        this.ball.setBounce(1);
        //rebote de bola
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.ball.setCollideWorldBounds(true);
        this.platform.setCollideWorldBounds(true);
        //inicializamos scoreboard
        this.scoreboard.create();
        this.bricks = this.physics.add.staticGroup({
            key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick'],
            frameQuantity: 10,
            gridAlign: {
                width: 10,
                height: 5,
                cellWidth: 67,
                cellHeight: 34,
                x: 112,
                y: 100
            }
        })
        this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);
        //let velocity = 100 * Phaser.Math.Between(1.3, 2);
        //if (Phaser.Math.Between(0, 10) > 5) {
        //    velocity = 0 - velocity;
        // }
        //this.ball.setVelocity(velocity, 10);
        // this.miGrupo = this.physics.add.staticGroup();
        // this.miGrupo.create(254,244,'bluebrick');
        // this.miGrupo.create(375,232, 'greenbrick');
        // this.miGrupo.create(375,232, 'greenbrick');
    }
    //metodo bola plataforma
    platformImpact(ball, platform) {
        this.scoreboard.incrementPoint(1);

        let relativeImpact = ball.x -platform.x;
        if(relativeImpact>0.1 && relativeImpact>-0.1){
          ball.setVelocityX(Phaser.Math.Between(-10,10));
        }
        else{
          ball.setVelocityX(10* relativeImpact);
        }
    }
    brickImpact(ball, brick) {
        brick.disableBody(true, true);
        this.scoreboard.incrementPoint(1);
        if (this.bricks.countActive() === 0) {
            this.congratsImage.visible = true;
            this.scene.pause();
        }
    }


    update() {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);

            if (this.ball.getData('Blue')) {
                this.ball.setVelocityX(500);
            }
        }
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);

            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(0);
            }
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
            this.bricks.setVisible(false);

        }
        if (this.ball.getData && this.cursors.up.isDown) {
            this.ball.setVelocity(-75, -300);
            this.ball.setData('glue', false);
        }
        else{

        }


    }
}
