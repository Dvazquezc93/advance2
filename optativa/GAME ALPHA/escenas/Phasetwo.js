export class PhaseTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'phasetwo' });
        this.seymourHp = 40;
        this.seymourMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isSeymourCharging = false;
        this.isZanarkandActive = false;
        this.zanarkandTimerEvent = null;
        this.zanarkandCountDownTimer = null;
        this.shootTimer = null;
    }

    preload() {
        this.load.image('background_2', 'images/background_2.png');
        this.load.image('flyship', 'images/flyship.png.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('barra', 'images/barra.png.png');
        this.load.image('seymour', 'images/seymour.png');
        this.load.image('ataqueseymour', 'images/ataqueseymour.png');
        this.load.image('zanarkand', 'images/zanarkandabes.png');
    }

    create() {
        // Reiniciar variables para cada partida
        this.seymourHp = 40;
        this.seymourMaxHp = 40;
        this.shipLives = 3;
        this.isShipInvulnerable = false;
        this.isSeymourCharging = false;
        this.isZanarkandActive = false;

        // Fondo de la fase 2 (Bosque de Macalania)
        this.add.image(400, 250, 'background_2').setDisplaySize(800, 500);

        // Barco volador (a la mitad del lado izquierdo)
        this.flyShip = this.physics.add.image(100, 250, 'flyship').setScale(0.04);
        this.flyShip.body.setSize(this.flyShip.width * 0.85, this.flyShip.height * 0.75, true);
        this.flyShip.body.allowGravity = false;
        this.flyShip.setCollideWorldBounds(true);

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
        this.seymourAttacks = this.physics.add.group();
        this.powerups = this.physics.add.group();

        // Disparo continuo del barco (cadencia normal: 350ms)
        this.setShootTimer(350);

        // Aparición aleatoria del ítem de Zanarkand Abes
        this.scheduleNextZanarkandSpawn();

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
        this.physics.add.overlap(this.balls, this.seymour, this.hitSeymour, null, this);

        // 2. El haz de luz de Seymour daña al barco
        this.physics.add.overlap(this.flyShip, this.seymourAttacks, this.hitShip, null, this);

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
        if (!this.flyShip || !this.flyShip.active || this.seymourHp <= 0) return;
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
        const isAbes = ball.isAbesBall;
        ball.destroy();

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
            this.seymourAttacks.clear(true, true);
            this.scene.start('phasethree');
        }
    }

    hitShip(ship, attack) {
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
                repeat: 6,
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

// Exportar también como phasetwo por compatibilidad
export { PhaseTwo as phasetwo };