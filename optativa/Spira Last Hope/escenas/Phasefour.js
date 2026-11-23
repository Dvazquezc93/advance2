import { PlayerShip } from "../Componentes/PlayerShip.js";
import { Scoreboard } from "../Componentes/Scoreboard.js";
import { SceneMusic } from "../Componentes/SceneMusic.js";

export class PhaseFour extends Phaser.Scene {
    constructor() {
        super({ key: 'phasefour' });
        this.jetchHp = 40;
        this.jetchMaxHp = 40;
        this.attackTimer = null;
        this.specialAttackTimer = null;
        this.music = new SceneMusic(this, 'soundtrack_fase4');
    }

    preload() {
        this.load.image('background_4', 'images/background_4.jpeg');
        this.load.image('background', 'images/background_4.jpeg'); // Compatibilidad
        PlayerShip.preload(this);
        this.load.image('barra', 'images/Barra.png');
        this.load.image('jetch', 'images/jetch.png');
        this.load.image('espada', 'images/espada.png');
        this.load.image('ataque jetch', 'images/espada.png'); // Compatibilidad

        // Precarga de la banda sonora oficial para el combate final
        this.load.audio('soundtrack_fase4', 'sounds/fase4.mp3');
    }

    create() {
        // Reiniciar variables para cada partida
        this.jetchHp = 40;
        this.jetchMaxHp = 40;
        this.scoreboard = new Scoreboard(this);

        // Reproducir banda sonora (soundtrack) en bucle con volumen adecuado
        this.playSoundtrack();

        // Asegurar que la música se detenga al salir o reiniciar la escena
        this.events.once('shutdown', () => {
            this.stopMusic();
        });

        // Fondo de la fase 4
        this.add.image(400, 250, 'background_4').setDisplaySize(800, 500);
        this.scoreboard.create();

        // Crea el componente reutilizable de la nave, sus controles y sus mejoras.
        this.playerShip = new PlayerShip(this);
        this.playerShip.create();
        this.flyShip = this.playerShip.flyShip;

        // Jecht (Jefe Supremo Final)
        this.jetch = this.physics.add.image(630, 240, 'jetch').setScale(0.38);
        this.jetch.body.setSize(this.jetch.width * 0.70, this.jetch.height * 0.80, true);
        this.jetch.body.allowGravity = false;
        this.jetch.setImmovable(true);

        // Movimiento flotante e imponente de Jecht
        this.jetchTween = this.tweens.add({
            targets: this.jetch,
            y: 330,
            duration: 2400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Barra de vida de Jecht
        this.barBackground = this.add.rectangle(400, 38, 304, 22, 0x050c1e, 0.85).setStrokeStyle(2, 0x002255);
        this.healthBar = this.add.image(250, 38, 'barra').setOrigin(0, 0.5);
        this.healthBar.setDisplaySize(300, 18);

        this.jetchText = this.add.text(400, 16, `JECHT: ${this.jetchHp} / ${this.jetchMaxHp}`, {
            fontSize: '18px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.jetchAttacks = this.physics.add.group();

        // Patrón de ataques de Jecht:
        // 1. Lanzamiento de espadas giratorias
        this.attackTimer = this.time.addEvent({
            delay: 1400,
            callback: this.shootJetchAttack,
            callbackScope: this,
            loop: true
        });

        // 2. Ataque especial de ráfaga de espadas
        this.specialAttackTimer = this.time.addEvent({
            delay: 4500,
            callback: this.specialJetchAttack,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        // 1. Las bolas del barco dañan a Jecht
        this.physics.add.overlap(this.playerShip.balls, this.jetch, this.hitJetch, null, this);

        // 2. Las espadas de Jecht dañan al barco
        this.physics.add.overlap(this.flyShip, this.jetchAttacks, this.playerShip.hitShip, null, this.playerShip);

        // 3. El barco recoge el ítem de mejora de Zanarkand Abes
        this.physics.add.overlap(this.flyShip, this.playerShip.powerups, this.playerShip.collectZanarkandPowerup, null, this.playerShip);
    }

    update() {
        this.playerShip.update();

        // Limpieza de ataques de Jecht que salen de la pantalla
        this.jetchAttacks.getChildren().forEach((attack) => {
            if (attack && (attack.x < -100 || attack.y < -100 || attack.y > 600)) {
                attack.destroy();
            }
        });

    }

    playSoundtrack() {
        this.music.play();
    }

    stopMusic() {
        this.music.stop();
    }

    // Ataque estándar: Jecht lanza su gran espada giratoria hacia el jugador
    shootJetchAttack() {
        if (!this.jetch || !this.jetch.active || this.jetchHp <= 0) return;

        const spawnX = this.jetch.x - (this.jetch.displayWidth * 0.35);
        const spawnY = this.jetch.y - 10;

        // Efecto visual de destello en Jecht al atacar
        this.jetch.setTint(0xffaa55);
        this.time.delayedCall(90, () => {
            if (this.jetch && this.jetch.active) {
                this.jetch.clearTint();
            }
        });

        const sword = this.jetchAttacks.create(spawnX, spawnY, 'espada');
        if (sword) {
            sword.setScale(0.18);
            sword.body.setSize(sword.width * 0.70, sword.height * 0.65, true);
            sword.body.allowGravity = false;

            // Giro continuo de la espada en vuelo
            this.tweens.add({
                targets: sword,
                angle: -360,
                duration: 500,
                repeat: -1
            });

            // Trayectoria hacia la nave del jugador
            const targetX = (this.flyShip && this.flyShip.active) ? this.flyShip.x : 100;
            const targetY = (this.flyShip && this.flyShip.active) ? this.flyShip.y : spawnY;
            const diffX = targetX - spawnX;
            const diffY = targetY - spawnY;
            const distance = Math.hypot(diffX, diffY);
            const speed = 500;

            if (distance > 0) {
                sword.setVelocityX((diffX / distance) * speed);
                sword.setVelocityY((diffY / distance) * speed);
            } else {
                sword.setVelocityX(-speed);
            }
        }
    }

    // Ataque especial: ráfaga doble de espadas ardientes
    specialJetchAttack() {
        if (!this.jetch || !this.jetch.active || this.jetchHp <= 0) return;

        // Carga de energía en Jecht
        this.jetch.setTint(0xff3333);
        this.time.delayedCall(400, () => {
            if (!this.jetch || !this.jetch.active || this.jetchHp <= 0) return;
            this.jetch.clearTint();

            // Lanzar dos espadas en abanico
            const spawnX = this.jetch.x - (this.jetch.displayWidth * 0.35);
            const angles = [-15, 15];

            angles.forEach((offsetDeg) => {
                const sword = this.jetchAttacks.create(spawnX, this.jetch.y, 'espada');
                if (sword) {
                    sword.setScale(0.20);
                    sword.setTint(0xff7733);
                    sword.body.setSize(sword.width * 0.75, sword.height * 0.70, true);
                    sword.body.allowGravity = false;

                    this.tweens.add({
                        targets: sword,
                        angle: -360,
                        duration: 400,
                        repeat: -1
                    });

                    const baseSpeed = 540;
                    const rad = Phaser.Math.DegToRad(180 + offsetDeg);
                    sword.setVelocityX(Math.cos(rad) * baseSpeed);
                    sword.setVelocityY(Math.sin(rad) * baseSpeed);
                }
            });
        });
    }

    hitJetch(jetch, ball) {
        if (this.jetchHp <= 0) {
            ball.destroy();
            return;
        }

        const isAbes = ball.isAbesBall;
        ball.destroy();
        this.scoreboard.incrementPoint(10);

        const damage = isAbes ? 2 : 1;
        this.jetchHp = Math.max(0, this.jetchHp - damage);

        const progress = Math.max(0, this.jetchHp / this.jetchMaxHp);
        this.healthBar.displayWidth = 300 * progress;
        this.jetchText.setText(`JECHT: ${this.jetchHp} / ${this.jetchMaxHp}`);

        this.jetch.setTint(isAbes ? 0xffaa00 : 0xff4444);
        this.time.delayedCall(80, () => {
            if (this.jetch && this.jetch.active) {
                this.jetch.clearTint();
            }
        });

        // Victoria definitiva: Derrota a Jecht y pasa a la pantalla de felicitaciones
        if (this.jetchHp <= 0) {
            this.scoreboard.incrementPoint(100);
            this.jetchAttacks.clear(true, true);
            this.stopMusic();
            this.scene.start('congratulations');
        }
    }
}

// Exportar también como phasefour por compatibilidad
export { PhaseFour as phasefour };


