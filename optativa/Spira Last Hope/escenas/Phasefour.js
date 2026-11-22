export class PhaseFour extends Phaser.Scene {
    constructor() {
        super({ key: 'phasefour' });
        this.jetchHp = 40;
        this.jetchMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isZanarkandActive = false;
        this.zanarkandTimerEvent = null;
        this.zanarkandCountDownTimer = null;
        this.shootTimer = null;
        this.attackTimer = null;
        this.specialAttackTimer = null;
        this.soundtrack = null;
    }

    preload() {
        this.load.image('background_4', 'images/background_4.jpeg');
        this.load.image('background', 'images/background_4.jpeg'); // Compatibilidad
        this.load.image('flyship', 'images/flyship.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('barra', 'images/Barra.png');
        this.load.image('jetch', 'images/jetch.png');
        this.load.image('espada', 'images/espada.webp');
        this.load.image('ataque jetch', 'images/espada.png'); // Compatibilidad
        this.load.image('zanarkand', 'images/zanarkandabes.png');

        // Precarga de la banda sonora oficial para el combate final
        this.load.audio('soundtrack_fase4', 'sounds/fase4.mp3');
    }

    create() {
        // Reiniciar variables para cada partida
        this.jetchHp = 40;
        this.jetchMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isZanarkandActive = false;

        // Reproducir banda sonora (soundtrack) en bucle con volumen adecuado
        this.playSoundtrack();

        // Asegurar que la música se detenga al salir o reiniciar la escena
        this.events.once('shutdown', () => {
            this.stopMusic();
        });

        // Fondo de la fase 4
        this.add.image(400, 250, 'background_4').setDisplaySize(800, 500);

        // Barco volador (a la mitad del lado izquierdo)
        this.flyShip = this.physics.add.image(100, 250, 'flyship').setScale(0.04);
        this.flyShip.body.setSize(this.flyShip.width * 0.85, this.flyShip.height * 0.75, true);
        this.flyShip.body.allowGravity = false;
        this.flyShip.setCollideWorldBounds(true);

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

        // Vidas del barco
        this.livesText = this.add.text(20, 20, `VIDAS: ${this.shipLives}`, {
            fontSize: '22px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 5
        });

        // Indicador HUD de Zanarkand Abes
        this.abesBuffText = this.add.text(20, 52, '', {
            fontSize: '15px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffd700',
            stroke: '#002255',
            strokeThickness: 4
        });

        // Controles de teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Grupos de proyectiles y mejoras
        this.balls = this.physics.add.group();
        this.jetchAttacks = this.physics.add.group();
        this.powerups = this.physics.add.group();

        // Disparo continuo del barco (cadencia normal: 350ms)
        this.setShootTimer(350);

        // Aparición aleatoria del ítem de Zanarkand Abes
        this.scheduleNextZanarkandSpawn();

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
        this.physics.add.overlap(this.balls, this.jetch, this.hitJetch, null, this);

        // 2. Las espadas de Jecht dañan al barco
        this.physics.add.overlap(this.flyShip, this.jetchAttacks, this.hitShip, null, this);

        // 3. El barco recoge el ítem de mejora de Zanarkand Abes
        this.physics.add.overlap(this.flyShip, this.powerups, this.collectZanarkandPowerup, null, this);
    }

    update() {
        const speed = 350;

        // Movimiento del barco
        if (this.cursors.left.isDown) {
            this.flyShip.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.flyShip.setVelocityX(speed);
        } else {
            this.flyShip.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.flyShip.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.flyShip.setVelocityY(speed);
        } else {
            this.flyShip.setVelocityY(0);
        }

        // Limpieza de bolas que salen de la pantalla
        this.balls.getChildren().forEach((ball) => {
            if (ball && ball.x > 850) {
                ball.destroy();
            }
        });

        // Limpieza de ataques de Jecht que salen de la pantalla
        this.jetchAttacks.getChildren().forEach((attack) => {
            if (attack && (attack.x < -100 || attack.y < -100 || attack.y > 600)) {
                attack.destroy();
            }
        });

        // Limpieza de ítems de Zanarkand Abes que salen por la izquierda
        this.powerups.getChildren().forEach((item) => {
            if (item && item.x < -80) {
                item.destroy();
            }
        });
    }

    playSoundtrack() {
        // Detener cualquier música previa de fases o menú anterior
        try {
            this.sound.stopAll();
        } catch (e) {}
        this.stopMusic();

        try {
            if (this.cache.audio.exists('soundtrack_fase4')) {
                this.soundtrack = this.sound.add('soundtrack_fase4', {
                    volume: 0.5,
                    loop: true
                });

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
            console.warn('Audio no disponible o bloqueado por el navegador:', e);
        }
    }

    stopMusic() {
        if (this.soundtrack) {
            try {
                if (this.soundtrack.isPlaying) {
                    this.soundtrack.stop();
                }
                this.soundtrack.destroy();
            } catch (e) {
                // Silencioso
            }
            this.soundtrack = null;
        }
    }

    setShootTimer(delay) {
        if (this.shootTimer) {
            this.shootTimer.remove();
        }
        this.shootTimer = this.time.addEvent({
            delay: delay,
            callback: this.shootBall,
            callbackScope: this,
            loop: true
        });
    }

    scheduleNextZanarkandSpawn() {
        const randomDelay = Phaser.Math.Between(6000, 15000);
        this.time.delayedCall(randomDelay, () => {
            this.spawnZanarkandPowerup();
            this.scheduleNextZanarkandSpawn();
        });
    }

    spawnZanarkandPowerup() {
        if (!this.flyShip || !this.flyShip.active || this.jetchHp <= 0) return;
        if (this.powerups.countActive(true) > 0) return;

        const spawnX = 840;
        const spawnY = Phaser.Math.Between(80, 430);
        const randomSpeed = Phaser.Math.Between(-100, -170);

        const item = this.powerups.create(spawnX, spawnY, 'zanarkand');
        if (item) {
            item.setScale(0.08);
            item.body.allowGravity = false;
            item.setVelocityX(randomSpeed);

            const waveOffset = Phaser.Math.Between(25, 45);
            const waveDuration = Phaser.Math.Between(900, 1500);
            this.tweens.add({
                targets: item,
                y: spawnY + (Phaser.Math.Between(0, 1) ? waveOffset : -waveOffset),
                duration: waveDuration,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.tweens.add({
                targets: item,
                scale: 0.095,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
        }
    }

    collectZanarkandPowerup(ship, item) {
        item.destroy();

        this.isZanarkandActive = true;
        this.flyShip.setTint(0xffe066);
        this.setShootTimer(180);

        const notice = this.add.text(this.flyShip.x, this.flyShip.y - 35, '¡ZANARKAND ABES!', {
            fontSize: '18px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: notice,
            y: notice.y - 40,
            alpha: 0,
            duration: 1200,
            onComplete: () => notice.destroy()
        });

        let remaining = 8;
        this.abesBuffText.setText(`★ ABES: ${remaining}s ★`);

        if (this.zanarkandCountDownTimer) this.zanarkandCountDownTimer.remove();
        this.zanarkandCountDownTimer = this.time.addEvent({
            delay: 1000,
            repeat: 7,
            callback: () => {
                remaining--;
                if (remaining > 0) {
                    this.abesBuffText.setText(`★ ABES: ${remaining}s ★`);
                } else {
                    this.abesBuffText.setText('');
                }
            }
        });

        if (this.zanarkandTimerEvent) this.zanarkandTimerEvent.remove();
        this.zanarkandTimerEvent = this.time.delayedCall(8000, () => {
            this.isZanarkandActive = false;
            this.abesBuffText.setText('');
            if (this.flyShip && this.flyShip.active) {
                this.flyShip.clearTint();
            }
            this.setShootTimer(350);
        });
    }

    shootBall() {
        if (!this.flyShip || !this.flyShip.active) return;

        const spawnX = this.flyShip.x + (this.flyShip.displayWidth / 2);
        const spawnY = this.flyShip.y;

        const ball = this.balls.create(spawnX, spawnY, 'ball');
        if (ball) {
            ball.body.allowGravity = false;

            if (this.isZanarkandActive) {
                ball.setScale(0.9);
                ball.setVelocityX(750);
                ball.setTint(0xffd700);
                ball.isAbesBall = true;
            } else {
                ball.setScale(0.5);
                ball.setVelocityX(450);
                ball.isAbesBall = false;
            }
        }
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
        const isAbes = ball.isAbesBall;
        ball.destroy();

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
            this.jetchAttacks.clear(true, true);
            this.stopMusic();
            this.scene.start('congratulations');
        }
    }

    hitShip(ship, attack) {
        attack.destroy();

        if (this.isShipInvulnerable) return;

        this.shipLives--;
        this.livesText.setText(`VIDAS: ${this.shipLives}`);

        if (this.shipLives <= 0) {
            this.stopMusic();
            this.scene.start('gameover');
        } else {
            this.isShipInvulnerable = true;
            this.tweens.add({
                targets: this.flyShip,
                alpha: 0.2,
                duration: 100,
                yoyo: true,
                repeat: 5,
                onComplete: () => {
                    if (this.flyShip) {
                        this.flyShip.alpha = 1;
                        if (this.isZanarkandActive) {
                            this.flyShip.setTint(0xffe066);
                        } else {
                            this.flyShip.clearTint();
                        }
                    }
                    this.isShipInvulnerable = false;
                }
            });
        }
    }
}

// Exportar también como phasefour por compatibilidad
export { PhaseFour as phasefour };


