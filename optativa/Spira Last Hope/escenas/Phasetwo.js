import { PlayerShip } from "../Componentes/PlayerShip.js";
import { Scoreboard } from "../Componentes/Scoreboard.js";
import { SceneMusic } from "../Componentes/SceneMusic.js";

export class PhaseTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'phasetwo' });
        this.seymourHp = 40;
        this.seymourMaxHp = 40;
        this.isSeymourCharging = false;
        this.music = new SceneMusic(this, 'soundtrack_fase2');
    }

    preload() {
        this.load.image('background_2', 'images/background_2.png');
        PlayerShip.preload(this);
        this.load.image('barra', 'images/Barra.png');
        this.load.image('seymour', 'images/seymour.png');
        this.load.image('ataqueseymour', 'images/ataqueseymour.png');

        // Banda sonora de la fase 2
        this.load.audio('soundtrack_fase2', 'sounds/fase2.mp3');
    }

    create() {
        // Reiniciar variables para cada partida
        this.seymourHp = 40;
        this.seymourMaxHp = 40;
        this.isSeymourCharging = false;
        this.scoreboard = new Scoreboard(this);

        // Reproducir banda sonora de la fase 2
        this.playSoundtrack();

        // Asegurar que la música se detenga al salir o cambiar de escena
        this.events.once('shutdown', () => {
            this.stopMusic();
        });

        // Fondo de la fase 2 (Bosque de Macalania)
        this.add.image(400, 250, 'background_2').setDisplaySize(800, 500);
        this.scoreboard.create();

        // Crea el componente reutilizable de la nave, sus controles y sus mejoras.
        this.playerShip = new PlayerShip(this, { invulnerabilityRepeats: 6, destroyAttackOnHit: false });
        this.playerShip.create();
        this.flyShip = this.playerShip.flyShip;

        // Seymour (segundo jefe)
        this.seymour = this.physics.add.image(640, 220, 'seymour').setScale(0.40);
        this.seymour.body.setSize(this.seymour.width * 0.35, this.seymour.height * 0.85, true);
        this.seymour.body.allowGravity = false;
        this.seymour.setImmovable(true);

        // Movimiento flotante de Seymour (arriba y abajo)
        this.seymourTween = this.tweens.add({
            targets: this.seymour,
            y: 350,
            duration: 2200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Barra de vida de Seymour
        this.barBackground = this.add.rectangle(400, 38, 304, 22, 0x050c1e, 0.85).setStrokeStyle(2, 0x002255);
        this.healthBar = this.add.image(250, 38, 'barra').setOrigin(0, 0.5);
        this.healthBar.setDisplaySize(300, 18);

        this.seymourText = this.add.text(400, 16, `SEYMOUR: ${this.seymourHp} / ${this.seymourMaxHp}`, {
            fontSize: '18px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.seymourAttacks = this.physics.add.group();

        // Ciclo del gran ataque de energía de Seymour: se carga y desata periódicamente
        this.time.delayedCall(1200, () => {
            this.startSeymourAttackCycle();
        });

        this.attackTimer = this.time.addEvent({
            delay: 3800,
            callback: this.startSeymourAttackCycle,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        // 1. Las bolas del barco dañan a Seymour
        this.physics.add.overlap(this.playerShip.balls, this.seymour, this.hitSeymour, null, this);

        // 2. El haz de luz de Seymour daña al barco
        this.physics.add.overlap(this.flyShip, this.seymourAttacks, this.playerShip.hitShip, null, this.playerShip);

        // 3. El barco recoge el ítem de mejora de Zanarkand Abes
        this.physics.add.overlap(this.flyShip, this.playerShip.powerups, this.playerShip.collectZanarkandPowerup, null, this.playerShip);
    }

    update() {
        this.playerShip.update();
    }

    // 1. Fase de Carga del Ataque desde Seymour
    startSeymourAttackCycle() {
        if (!this.seymour || !this.seymour.active || this.seymourHp <= 0 || this.isSeymourCharging) return;

        this.isSeymourCharging = true;

        if (this.seymourTween) {
            this.seymourTween.pause();
        }

        const beamY = this.seymour.y;
        const spawnX = this.seymour.x - 30;

        this.seymour.setTint(0x88eeff);

        const chargeOrb = this.add.circle(spawnX, beamY, 8, 0x99eeff, 0.95);
        chargeOrb.setStrokeStyle(3, 0xffffff);

        const telegraph = this.add.rectangle(400, beamY, 800, 140, 0x66ccff, 0.15);

        this.tweens.add({
            targets: telegraph,
            alpha: { from: 0.12, to: 0.35 },
            duration: 200,
            yoyo: true,
            repeat: 4
        });

        this.tweens.add({
            targets: chargeOrb,
            scale: 3.8,
            duration: 1000,
            ease: 'Quad.easeInOut',
            onComplete: () => {
                chargeOrb.destroy();
                telegraph.destroy();

                if (this.seymour && this.seymour.active) {
                    this.seymour.clearTint();
                }

                if (this.seymour && this.seymour.active && this.seymourHp > 0) {
                    this.fireSeymourBeam(beamY);
                } else {
                    this.isSeymourCharging = false;
                }
            }
        });
    }

    // 2. Despliegue del gran haz de luz que ocupa una franja entera de la pantalla
    fireSeymourBeam(beamY) {
        if (!this.seymour || !this.seymour.active || this.seymourHp <= 0) return;

        this.cameras.main.shake(250, 0.006);

        const beamWidth = 750;
        const beamHeight = 160;
        const beamCenterX = (this.seymour.x - 20) - (beamWidth / 2);

        const beam = this.seymourAttacks.create(beamCenterX, beamY, 'ataqueseymour');
        if (beam) {
            beam.setDisplaySize(beamWidth, beamHeight);
            beam.body.setSize(beam.width * 0.95, beam.height * 0.45, true);
            beam.body.allowGravity = false;
            beam.body.immovable = true;

            this.tweens.add({
                targets: beam,
                alpha: { from: 0.85, to: 1 },
                duration: 90,
                yoyo: true,
                repeat: 5
            });

            this.time.delayedCall(850, () => {
                if (beam && beam.active) {
                    this.tweens.add({
                        targets: beam,
                        alpha: 0,
                        scaleY: 0,
                        duration: 200,
                        onComplete: () => {
                            if (beam) beam.destroy();
                        }
                    });
                }

                this.isSeymourCharging = false;
                if (this.seymourTween && this.seymour && this.seymour.active) {
                    this.seymourTween.resume();
                }
            });
        }
    }

    hitSeymour(seymour, ball) {
        if (this.seymourHp <= 0) {
            ball.destroy();
            return;
        }

        const isAbes = ball.isAbesBall;
        ball.destroy();
        this.scoreboard.incrementPoint(10);

        const damage = isAbes ? 2 : 1;
        this.seymourHp = Math.max(0, this.seymourHp - damage);

        const progress = Math.max(0, this.seymourHp / this.seymourMaxHp);
        this.healthBar.displayWidth = 300 * progress;
        this.seymourText.setText(`SEYMOUR: ${this.seymourHp} / ${this.seymourMaxHp}`);

        this.seymour.setTint(isAbes ? 0xffaa00 : 0xff5555);
        this.time.delayedCall(80, () => {
            if (this.seymour && this.seymour.active) {
                if (this.isSeymourCharging) {
                    this.seymour.setTint(0x88eeff);
                } else {
                    this.seymour.clearTint();
                }
            }
        });

        // 40 toques alcanzados -> Derrota a Seymour y avanza a PhaseThree (Sinh)
        if (this.seymourHp <= 0) {
            this.scoreboard.incrementPoint(100);
            this.seymourAttacks.clear(true, true);
            this.stopMusic();
            this.scene.start('phasethree');
        }
    }

    playSoundtrack() {
        this.music.play();
    }

    stopMusic() {
        this.music.stop();
    }
}

// Exportar también como phasetwo por compatibilidad
export { PhaseTwo as phasetwo };