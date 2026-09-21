export class Game extends Phaser.Scene {
    constructor() {
        super ({key: 'game'});
            }

            preload() {
                this.load.image('background','images/background.png');
                this.load.image('gameover','images/gameover.png');
                this.load.image('platform','images/platform.png');
            }

            create() {
                //imagenes de fondo
                 this.add.image(400,250,'background');
                 this.gameoverImage = this .add.image(400,90,'gameover');
                 this.gameoverImage.visible =false;
                    //plataforma
                this.platform = this.physics.add.image (400,460, 'platform');
                this.platform.body.allowGravity = false
                this.cursors =this.input.keyboard.createCursorKeys();
               //this.platform.setVelocity(100,100)

        }
        update(){
            if (this.cursors.up.isDown){
                this.platform.setVelocityX(-500);
            }
            else if(this.cursors.down.isDown){
                this.platform.setVelocityX(500);
            }
            else this.platform.setVelocityX(0);
            }
        }
