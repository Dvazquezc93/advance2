export class SceneMusic {
    constructor(scene, audioKey) {
        this.scene = scene;
        this.audioKey = audioKey;
        this.soundtrack = null;
    }

    play() {
        this.stop();
        this.scene.sound.stopAll();

        if (!this.scene.cache.audio.exists(this.audioKey)) return;

        try {
            const soundtrack = this.scene.sound.add(this.audioKey, {
                volume: 0.5,
                loop: true
            });
            this.soundtrack = soundtrack;

            if (this.scene.sound.locked) {
                this.scene.sound.once('unlocked', () => {
                    if (this.soundtrack === soundtrack && !soundtrack.isPlaying) {
                        soundtrack.play();
                    }
                });
            } else {
                soundtrack.play();
            }
        } catch (error) {
            console.warn('Audio no disponible o bloqueado por el navegador:', error);
        }
    }

    stop() {
        if (!this.soundtrack) return;

        const soundtrack = this.soundtrack;
        this.soundtrack = null;
        try {
            if (soundtrack.isPlaying) {
                soundtrack.stop();
            }
            soundtrack.destroy();
        } catch (error) {
            console.warn('No se pudo detener correctamente la música:', error);
        }
    }
}
