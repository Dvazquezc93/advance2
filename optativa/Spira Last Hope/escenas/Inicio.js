import { StartButton } from "../Componentes/StartButton.js";

export class Inicio extends Phaser.Scene {
    constructor() {
        super({ key: 'inicio' });
        this.startButton = new StartButton(this);
        this.soundtrack = null;
    }

    preload() {
        this.load.image('inicioFondo', 'images/inicio.png');
        this.load.audio('soundtrack_inicio', 'sounds/inicio.mp3');
    }

    create() {
        // Fondo interactivo
        const bg = this.add.image(400, 250, 'inicioFondo').setInteractive({ useHandCursor: true });

        // Botón INICIAR mediante componente
        this.startButton.create();

        // Iniciar la música de Inicio
        this.playSoundtrack();

        // Al hacer clic en cualquier lugar de la pantalla, asegurar que suene la música si el navegador la retenía
        const triggerPlay = () => {
            if (this.soundtrack && !this.soundtrack.isPlaying) {
                this.soundtrack.play();
            }
        };

        this.input.on('pointerdown', triggerPlay);
        bg.on('pointerdown', triggerPlay);
    }

    playSoundtrack() {
        this.stopMusic();

        try {
            if (this.cache.audio.exists('soundtrack_inicio')) {
                this.soundtrack = this.sound.add('soundtrack_inicio', {
                    volume: 0.5,
                    loop: true
                });

                // Si el navegador bloquea el audio hasta un clic, esperar al desbloqueo oficial
                if (this.sound.locked) {
                    this.sound.once('unlocked', () => {
                        if (this.soundtrack && !this.soundtrack.isPlaying) {
                            this.soundtrack.play();
                        }
                    });
                } else {
                    this.soundtrack.play();
                }
            }
        } catch (e) {
            console.warn('Audio en espera de interacción:', e);
        }
    }

    stopMusic() {
        if (this.soundtrack) {
            try {
                if (this.soundtrack.isPlaying) {
                    this.soundtrack.stop();
                }
                this.soundtrack.destroy();
            } catch (e) {}
            this.soundtrack = null;
        }
    }
}
