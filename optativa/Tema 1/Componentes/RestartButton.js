export class RestarButton {

    constructor(scene) {
       this.relatedScene= scene;
    }
    preload() {
        this.relatedScene.load.spritesheet('button', 'images/Restart.png', { frameWidth: 190, frameHeight: 49});

    }
    create() {
        this.startButton = this.relatedScene.add.sprite(400, 320, 'button').setInteractive();
     
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);

        })
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);

        })
        this.startButton.on('pointerdown',()=>{
            console.log("pasa por aqui");
            this.relatedScene.scene.start('game');
        })
    }
}