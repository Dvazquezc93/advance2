import { PlayerShip } from "../Componentes/PlayerShip.js";
import { Scoreboard } from "../Componentes/Scoreboard.js";
import { SceneMusic } from "../Componentes/SceneMusic.js";

export class PhaseOne extends Phaser.Scene {
    constructor() {
        super({ key: 'phaseone' });
        this.animaHp = 40;
        this.animaMaxHp = 40;
        this.music = new SceneMusic(this, 'soundtrack_fase1');
    }

    preload() {
        this.load.image('background', 'images/background.png');
        PlayerShip.preload(this);
        this.load.image('barra', 'images/Barra.png');
        this.load.image('anima', 'images/anima.png');
        this.load.image('ataque', 'images/ataqueanima.png');

        // Banda sonora de la fase 1
        this.load.audio('soundtrack_fase1', 'sounds/fase1.mp3');
    }

    create() {
        // Reiniciar variables para cada partida
        this.animaHp = 40;
        this.animaMaxHp = 40;
        this.registry.set('score', 0);
        this.scoreboard = new Scoreboard(this);

        // Reproducir banda sonora de la fase 1
        this.playSoundtrack();

        // Asegurar que la música se detenga al salir o cambiar de escena
        this.events.once('shutdown', () => {
            this.stopMusic();
        });

        // Fondo
        this.add.image(400, 250, 'background');
        this.scoreboard.create();

        // Crea el componente reutilizable de la nave, sus controles y sus mejoras.
        this.playerShip = new PlayerShip(this);
        this.playerShip.create();
        this.flyShip = this.playerShip.flyShip;

        // Ánima (primer enemigo): escala duplicada
        this.anima = this.physics.add.image(640, 200, 'anima').setScale(0.40);
        this.anima.body.setSize(this.anima.width * 0.80, this.anima.height * 0.85, true);
        this.anima.body.allowGravity = false;
        this.anima.setImmovable(true);

        // Movimiento flotante de Ánima (arriba y abajo)
        this.tweens.add({
            targets: this.anima,
            y: 350,
            duration: 2500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Barra de vida de Ánima
        this.barBackground = this.add.rectangle(400, 38, 304, 22, 0x050c1e, 0.85).setStrokeStyle(2, 0x002255);
        this.healthBar = this.add.image(250, 38, 'barra').setOrigin(0, 0.5);
        this.healthBar.setDisplaySize(300, 18);

        this.animaText = this.add.text(400, 16, `ÁNIMA: ${this.animaHp} / ${this.animaMaxHp}`, {
            fontSize: '18px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.animaAttacks = this.physics.add.group();

        // Ataque de Ánima hacia el barco
        this.time.addEvent({
            delay: 1600,
            callback: this.shootAnimaAttack,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        // 1. Las bolas del barco dañan a Ánima
        this.physics.add.overlap(this.playerShip.balls, this.anima, this.hitAnima, null, this);

        // 2. El ataque de Ánima daña al barco
        this.physics.add.overlap(this.flyShip, this.animaAttacks, this.playerShip.hitShip, null, this.playerShip);

        // 3. El barco recoge el ítem de mejora de Zanarkand Abes
        this.physics.add.overlap(this.flyShip, this.playerShip.powerups, this.playerShip.collectZanarkandPowerup, null, this.playerShip);
    }

    update() {
        this.playerShip.update();

        // Limpieza de ataques de Ánima que salen de la pantalla
        this.animaAttacks.getChildren().forEach((attack) => {
            if (attack && (attack.x < -100 || attack.y < -100 || attack.y > 600)) {
                attack.destroy();
            }
        });

    }

    shootAnimaAttack() {
        if (!this.anima || !this.anima.active || this.animaHp <= 0) return;

        const spawnX = this.anima.x - (this.anima.displayWidth / 2);
        const spawnY = this.anima.y;

        const attack = this.animaAttacks.create(spawnX, spawnY, 'ataque');
        if (attack) {
            attack.setScale(0.09); // Escala del proyectil

            // Hitbox ajustado con precisión al núcleo de fuego frontal (evita la estela vacía)
            attack.body.setSize(attack.width * 0.55, attack.height * 0.65);
            attack.body.setOffset(attack.width * 0.05, attack.height * 0.175);
            attack.body.allowGravity = false;

            // Trayectoria precisa: apunta directamente hacia la posición actual del barco
            const targetX = (this.flyShip && this.flyShip.active) ? this.flyShip.x : 100;
            const targetY = (this.flyShip && this.flyShip.active) ? this.flyShip.y : spawnY;
            const diffX = targetX - spawnX;
            const diffY = targetY - spawnY;
            const distance = Math.hypot(diffX, diffY);
            const speed = 460;

            if (distance > 0) {
                attack.setVelocityX((diffX / distance) * speed);
                attack.setVelocityY((diffY / distance) * speed);
            } else {
                attack.setVelocityX(-speed);
            }
        }
    }

    hitAnima(anima, ball) {
        if (this.animaHp <= 0) {
            ball.destroy();
            return;
        }

        const isAbes = ball.isAbesBall;
        ball.destroy();
        this.scoreboard.incrementPoint(10);

        // El disparo potenciado de Zanarkand Abes infringe el doble de daño (2 toques)
        const damage = isAbes ? 2 : 1;
        this.animaHp = Math.max(0, this.animaHp - damage);

        // Actualizar barra de vida y texto
        const progress = Math.max(0, this.animaHp / this.animaMaxHp);
        this.healthBar.displayWidth = 300 * progress;
        this.animaText.setText(`ÁNIMA: ${this.animaHp} / ${this.animaMaxHp}`);

        // Destello rojo en Ánima al recibir daño (dorado-rojizo si es Abes)
        this.anima.setTint(isAbes ? 0xffaa00 : 0xff5555);
        this.time.delayedCall(80, () => {
            if (this.anima && this.anima.active) {
                this.anima.clearTint();
            }
        });

        // 40 toques alcanzados -> Derrota a Ánima y avanza a PhaseTwo (Seymour)
        if (this.animaHp <= 0) {
            this.scoreboard.incrementPoint(100);
            this.stopMusic();
            this.scene.start('phasetwo');
        }
    }

    playSoundtrack() {
        this.music.play();
    }

    stopMusic() {
        this.music.stop();
    }
}