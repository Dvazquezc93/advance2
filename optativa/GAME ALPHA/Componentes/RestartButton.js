export class RestarButton {

    constructor(scene) {
        this.relatedScene = scene;
    }

    preload() {
        this.relatedScene.load.image('button', 'images/Restart.png');
    }

    create(x = 400, y = 350) {
        const texture = this.relatedScene.textures.get('button');
        const source = texture.getSourceImage();

        const frameWidth = Math.floor(source.width / 2);
        const frameHeight = source.height;

        // Añadir dinámicamente los dos fotogramas del botón:
        // 'hover': mitad izquierda (con el guante blanco estilo FFX)
        // 'normal': mitad derecha (sin el guante)
        if (!texture.has('hover')) {
            texture.add('hover', 0, 0, 0, frameWidth, frameHeight);
        }
        if (!texture.has('normal')) {
            texture.add('normal', 0, frameWidth, 0, frameWidth, frameHeight);
        }

        // Crear el botón en estado normal
        this.startButton = this.relatedScene.add.sprite(x, y, 'button', 'normal').setInteractive({ useHandCursor: true });

        // Escalar para que tenga el tamaño visual perfecto (~210px de ancho)
        const targetWidth = 210;
        const scale = targetWidth / frameWidth;
        this.startButton.setScale(scale);

        // Al pasar el ratón, aparece la mano indicadora de FFX
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame('hover');
        });

        // Al quitar el ratón, vuelve al estado normal
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame('normal');
        });

        // Al hacer clic, reinicia el combate en phaseone
        this.startButton.on('pointerdown', () => {
            console.log("Reiniciando combate...");
            this.relatedScene.scene.start('phaseone');
        });
    }
}