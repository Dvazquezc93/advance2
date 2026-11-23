import { PlayerShip } from "../Componentes/PlayerShip.js";
import { Scoreboard } from "../Componentes/Scoreboard.js";
import { SceneMusic } from "../Componentes/SceneMusic.js";

export class PhaseThree extends Phaser.Scene {
    constructor() {
        super({ key: 'phasethree' });
        this.sinhHp = 40;
        this.sinhMaxHp = 40;
        this.music = new SceneMusic(this, 'soundtrack_fase3');
    }

    preload() {
        this.load.image('background_3', 'images/background_3.png');
        this.load.image('backboard', 'images/background_3.png'); // Por compatibilidad
        PlayerShip.preload(this);
        this.load.image('barra', 'images/Barra.png');
        this.load.image('sinh', 'images/sinh.png');
        this.load.image('ataquesinh', 'images/ataquesinh.png');
        this.load.image('ataque', 'images/ataquesinh.png'); // Por compatibilidad

        // Banda sonora de Sinh
        this.load.audio('soundtrack_fase3', 'sounds/fase3.mp3');
    }

    create() {
        // Reiniciar variables para cada partida
        this.sinhHp = 40;
        this.sinhMaxHp = 40;
        this.scoreboard = new Scoreboard(this);

        // Reproducir banda sonora de Sinh
        this.playSoundtrack();

        // Asegurar que la música se detenga al salir o cambiar de escena
        this.events.once('shutdown', () => {
            this.stopMusic();
        });

        // Fondo de la fase 3 (Ruinas de Zanarkand)
        this.add.image(400, 250, 'background_3').setDisplaySize(800, 500);
        this.scoreboard.create();

        // Crea el componente reutilizable de la nave, sus controles y sus mejoras.
        this.playerShip = new PlayerShip(this);
        this.playerShip.create();
        this.flyShip = this.playerShip.flyShip;

        // Sinh (jefe final) - Mirando hacia la izquierda
        this.sinh = this.physics.add.image(620, 240, 'sinh').setScale(0.38);
        this.sinh.body.setSize(this.sinh.width * 0.80, this.sinh.height * 0.75, true);
        this.sinh.body.allowGravity = false;
        this.sinh.setImmovable(true);

        // Movimiento flotante / ondeante de Sinh (arriba y abajo)
        this.tweens.add({
            targets: this.sinh,
            y: 330,
            duration: 2600,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Barra de vida de Sinh
        this.barBackground = this.add.rectangle(400, 38, 304, 22, 0x050c1e, 0.85).setStrokeStyle(2, 0x002255);
        this.healthBar = this.add.image(250, 38, 'barra').setOrigin(0, 0.5);
        this.healthBar.setDisplaySize(300, 18);

        this.sinhText = this.add.text(400, 16, `SINH: ${this.sinhHp} / ${this.sinhMaxHp}`, {
            fontSize: '18px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.sinhAttacks = this.physics.add.group();

        // Ataque de ondas de Sinh lanzado con rapidez
        this.time.addEvent({
            delay: 1200,
            callback: this.shootSinhAttack,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        // 1. Las bolas del barco dañan a Sinh
        this.physics.add.overlap(this.playerShip.balls, this.sinh, this.hitSinh, null, this);

        // 2. Las ondas de Sinh dañan al barco
        this.physics.add.overlap(this.flyShip, this.sinhAttacks, this.playerShip.hitShip, null, this.playerShip);

        // 3. El barco recoge el ítem de mejora de Zanarkand Abes
        this.physics.add.overlap(this.flyShip, this.playerShip.powerups, this.playerShip.collectZanarkandPowerup, null, this.playerShip);
    }

    update() {
        this.playerShip.update();

        // Limpieza de ondas de Sinh que salen de la pantalla
        this.sinhAttacks.getChildren().forEach((attack) => {
            if (attack && (attack.x < -100 || attack.y < -100 || attack.y > 600)) {
                attack.destroy();
            }
        });

    }

    shootSinhAttack() {
        if (!this.sinh || !this.sinh.active || this.sinhHp <= 0) return;

        const spawnX = this.sinh.x - (this.sinh.displayWidth * 0.40);
        const spawnY = this.sinh.y - 15;

        this.sinh.setTint(0xddccff);
        this.time.delayedCall(70, () => {
            if (this.sinh && this.sinh.active) {
                this.sinh.clearTint();
            }
        });

        const attack = this.sinhAttacks.create(spawnX, spawnY, 'ataquesinh');
        if (attack) {
            attack.setScale(0.16);

            attack.body.setSize(attack.width * 0.70, attack.height * 0.65, true);
            attack.body.allowGravity = false;

            const targetX = (this.flyShip && this.flyShip.active) ? this.flyShip.x : 100;
            const targetY = (this.flyShip && this.flyShip.active) ? this.flyShip.y : spawnY;
            const diffX = targetX - spawnX;
            const diffY = targetY - spawnY;
            const distance = Math.hypot(diffX, diffY);
            const speed = 520;

            if (distance > 0) {
                attack.setVelocityX((diffX / distance) * speed);
                attack.setVelocityY((diffY / distance) * speed);
            } else {
                attack.setVelocityX(-speed);
            }
        }
    }

    hitSinh(sinh, ball) {
        if (this.sinhHp <= 0) {
            ball.destroy();
            return;
        }

        const isAbes = ball.isAbesBall;
        ball.destroy();
        this.scoreboard.incrementPoint(10);

        const damage = isAbes ? 2 : 1;
        this.sinhHp = Math.max(0, this.sinhHp - damage);

        const progress = Math.max(0, this.sinhHp / this.sinhMaxHp);
        this.healthBar.displayWidth = 300 * progress;
        this.sinhText.setText(`SINH: ${this.sinhHp} / ${this.sinhMaxHp}`);

        this.sinh.setTint(isAbes ? 0xffaa00 : 0xff5555);
        this.time.delayedCall(80, () => {
            if (this.sinh && this.sinh.active) {
                this.sinh.clearTint();
            }
        });

        // 40 toques alcanzados -> Derrota a Sinh y avanza a PhaseFour (Jetch)
        if (this.sinhHp <= 0) {
            this.scoreboard.incrementPoint(100);
            this.sinhAttacks.clear(true, true);
            this.stopMusic();
            this.scene.start('phasefour');
        }
    }

    playSoundtrack() {
        this.music.play();
    }

    stopMusic() {
        this.music.stop();
    }
}

// Exportar también como phasethree por compatibilidad
export { PhaseThree as phasethree };
