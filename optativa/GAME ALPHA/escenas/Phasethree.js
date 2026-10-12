export class PhaseThree extends Phaser.Scene {
    constructor() {
        super({ key: 'phasethree' });
        this.sinhHp = 40;
        this.sinhMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isZanarkandActive = false;
        this.zanarkandTimerEvent = null;
        this.zanarkandCountDownTimer = null;
        this.shootTimer = null;
    }

    preload() {
        this.load.image('background_3', 'images/background_3.png');
        this.load.image('backboard', 'images/background_3.png'); // Por compatibilidad
        this.load.image('flyship', 'images/flyship.png.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('barra', 'images/barra.png.png');
        this.load.image('sinh', 'images/sinh.png.png');
        this.load.image('ataquesinh', 'images/ataquesinh.png');
        this.load.image('ataque', 'images/ataquesinh.png'); // Por compatibilidad
        this.load.image('zanarkand', 'images/zanarkandabes.png');
    }

    create() {
        // Reiniciar variables para cada partida
        this.sinhHp = 40;
        this.sinhMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isZanarkandActive = false;

        // Fondo de la fase 3 (Ruinas de Zanarkand)
        this.add.image(400, 250, 'background_3').setDisplaySize(800, 500);

        // Barco volador (a la mitad del lado izquierdo)
        this.flyShip = this.physics.add.image(100, 250, 'flyship').setScale(0.04);
        this.flyShip.body.setSize(this.flyShip.width * 0.85, this.flyShip.height * 0.75, true);
        this.flyShip.body.allowGravity = false;
        this.flyShip.setCollideWorldBounds(true);

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

        // Cursores para controlar el barco
        this.cursors = this.input.keyboard.createCursorKeys();

        // Grupos de proyectiles y mejoras
        this.balls = this.physics.add.group();
        this.sinhAttacks = this.physics.add.group();
        this.powerups = this.physics.add.group();

        // Disparo continuo del barco (cadencia normal: 350ms)
        this.setShootTimer(350);

        // Aparición aleatoria del ítem de Zanarkand Abes
        this.scheduleNextZanarkandSpawn();

        // Ataque de ondas de Sinh lanzado con rapidez
        this.time.addEvent({
            delay: 1200,
            callback: this.shootSinhAttack,
            callbackScope: this,
            loop: true
        });

        // Colisiones
        // 1. Las bolas del barco dañan a Sinh
        this.physics.add.overlap(this.balls, this.sinh, this.hitSinh, null, this);

        // 2. Las ondas de Sinh dañan al barco
        this.physics.add.overlap(this.flyShip, this.sinhAttacks, this.hitShip, null, this);

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

        // Limpieza de ondas de Sinh que salen de la pantalla
        this.sinhAttacks.getChildren().forEach((attack) => {
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
        if (!this.flyShip || !this.flyShip.active || this.sinhHp <= 0) return;
        if (this.powerups.countActive(true) > 0) return;

        const spawnX = 840;
        const spawnY = Phaser.Math.Between(80, 430); // Altura aleatoria
        const randomSpeed = Phaser.Math.Between(-100, -170); // Velocidad aleatoria

        const item = this.powerups.create(spawnX, spawnY, 'zanarkand');
        if (item) {
            item.setScale(0.08);
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

            // Pulso de brillo y tamaño
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
        const isAbes = ball.isAbesBall;
        ball.destroy();

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

        // 40 toques alcanzados -> Victoria definitiva (Congratulations)
        if (this.sinhHp <= 0) {
            this.sinhAttacks.clear(true, true);
            this.scene.start('congratulations');
        }
    }

    hitShip(ship, attack) {
        attack.destroy();

        if (this.isShipInvulnerable) return;

        this.shipLives--;
        this.livesText.setText(`VIDAS: ${this.shipLives}`);

        if (this.shipLives <= 0) {
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

// Exportar también como phasethree por compatibilidad
export { PhaseThree as phasethree };
