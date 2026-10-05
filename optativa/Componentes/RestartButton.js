export class RestarButton {

    constructor(scene) {
        this.relatedScena = scene;
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
    preload() {
        this.relatedScene.load.spritesheet('button', 'images/RestarButton.png', { frameWidth: 190, framehHeight });

    }
    create() {
        this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();
       
    }
}