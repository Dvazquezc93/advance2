export class StartButton {
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        this.startButton = this.relatedScene.add.text(400, 310, 'INICIAR', {
            fontSize: '42px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',           // Dorado claro
            stroke: '#002255',         // Borde azul marino estilo FFX
            strokeThickness: 6,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000814',
                blur: 5,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.startButton.on('pointerover', () => {
            this.startButton.setStyle({ fill: '#ffffff' });
            this.startButton.setScale(1.1);
        });

        this.startButton.on('pointerout', () => {
            this.startButton.setStyle({ fill: '#ffe680' });
            this.startButton.setScale(1.0);
        });

        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('phaseone');
        });
    }
}