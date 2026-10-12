export class PhaseOne extends Phaser.Scene {
    constructor() {
        super({ key: 'phaseone' });
        this.animaHp = 40;
        this.animaMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isZanarkandActive = false;
        this.zanarkandTimerEvent = null;
        this.zanarkandCountDownTimer = null;
        this.shootTimer = null;
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('flyship', 'images/flyship.png.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('barra', 'images/barra.png.png');
        this.load.image('anima', 'images/anima.png');
        this.load.image('ataque', 'images/ataqueanima.png.png');
        this.load.image('zanarkand', 'images/zanarkandabes.png');
    }

    create() {
        // Reiniciar variables para cada partida
        this.animaHp = 40;
        this.animaMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isZanarkandActive = false;

        // Fondo
        this.add.image(400, 250, 'background');

        // Barco volador (a la mitad del lado izquierdo)
        this.flyShip = this.physics.add.image(100, 250, 'flyship').setScale(0.04);
        this.flyShip.body.setSize(this.flyShip.width * 0.85, this.flyShip.height * 0.75, true);
        this.flyShip.body.allowGravity = false;
        this.flyShip.setCollideWorldBounds(true);

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

        // Vidas del barco
        this.livesText = this.add.text(20, 20, `VIDAS: ${this.shipLives}`, {
            fontSize: '22px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 5
        });

        // Indicador HUD de la mejora de Zanarkand Abes
        this.abesBuffText = this.add.text(20, 52, '', {
            fontSize: '15px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffd700',
            stroke: '#002255',
            strokeThickness: 4
        });

        // Cursores para controlar el barco
        this.cursors = this.input.keyboard.createCursorKeys();

        // Grupos de proyectiles y mejoras
        this.balls = this.physics.add.group();
        this.animaAttacks = this.physics.add.group();
        this.powerups = this.physics.add.group();

        // Disparo inicial del barco (cadencia normal: 350ms)
        this.setShootTimer(350);

        // Aparición aleatoria del ítem de Zanarkand Abes
        this.scheduleNextZanarkandSpawn();

        // Ataque de Ánima hacia el barco
        this.time.addEvent({
            delay: 1600,
            callback: this.shootAnimaAttack,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        // 1. Las bolas del barco dañan a Ánima
        this.physics.add.overlap(this.balls, this.anima, this.hitAnima, null, this);

        // 2. El ataque de Ánima daña al barco
        this.physics.add.overlap(this.flyShip, this.animaAttacks, this.hitShip, null, this);

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

        // Limpieza de bolas que salen de la pantalla por la derecha
        this.balls.getChildren().forEach((ball) => {
            if (ball && ball.x > 850) {
                ball.destroy();
            }
        });

        // Limpieza de ataques de Ánima que salen de la pantalla
        this.animaAttacks.getChildren().forEach((attack) => {
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
        // Intervalo aleatorio entre 6 y 16 segundos para que aparezca por sorpresa
        const randomDelay = Phaser.Math.Between(6000, 16000);
        this.time.delayedCall(randomDelay, () => {
            this.spawnZanarkandPowerup();
            this.scheduleNextZanarkandSpawn();
        });
    }

    spawnZanarkandPowerup() {
        if (!this.flyShip || !this.flyShip.active || this.animaHp <= 0) return;
        if (this.powerups.countActive(true) > 0) return;

        const spawnX = 840;
        const spawnY = Phaser.Math.Between(80, 430); // Altura aleatoria
        const randomSpeed = Phaser.Math.Between(-100, -170); // Velocidad de avance aleatoria

        const item = this.powerups.create(spawnX, spawnY, 'zanarkand');
        if (item) {
            item.setScale(0.08); // Emblema dorado de los Abes
            item.body.allowGravity = false;
            item.setVelocityX(randomSpeed);

            // Movimiento ondulante vertical aleatorio
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

            // Brillo y pulso de tamaño para llamar la atención del jugador
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
        this.flyShip.setTint(0xffe066); // Aura dorada de los Abes en el barco
        this.setShootTimer(180);         // Ráfagas de disparo mucho más rápidas

        // Aviso flotante sobre el barco
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

        // Cuenta atrás del bufo en el HUD
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

        // Duración temporal de la mejora: 8 segundos
        if (this.zanarkandTimerEvent) this.zanarkandTimerEvent.remove();
        this.zanarkandTimerEvent = this.time.delayedCall(8000, () => {
            this.isZanarkandActive = false;
            this.abesBuffText.setText('');
            if (this.flyShip && this.flyShip.active) {
                this.flyShip.clearTint();
            }
            this.setShootTimer(350); // Vuelve a la cadencia de disparo normal
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
                // Disparo de Zanarkand Abes: Más grande (0.9 vs 0.5) y mucho más veloz (750 vs 450)
                ball.setScale(0.9);
                ball.setVelocityX(750);
                ball.setTint(0xffd700); // Esfera dorada brillante con poder de blitzball
                ball.isAbesBall = true;
            } else {
                // Disparo estándar
                ball.setScale(0.5);
                ball.setVelocityX(450);
                ball.isAbesBall = false;
            }
        }
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
        const isAbes = ball.isAbesBall;
        ball.destroy();

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
            this.scene.start('phasetwo');
        }
    }

    hitShip(ship, attack) {
        attack.destroy();

        // Si el barco está invulnerable temporalmente tras un golpe, ignora daño
        if (this.isShipInvulnerable) return;

        this.shipLives--;
        this.livesText.setText(`VIDAS: ${this.shipLives}`);

        if (this.shipLives <= 0) {
            this.scene.start('gameover');
        } else {
            // Parpadeo e invulnerabilidad temporal
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