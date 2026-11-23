export class PlayerShip {
    constructor(scene, { invulnerabilityRepeats = 5, destroyAttackOnHit = true } = {}) {
        this.scene = scene;
        this.invulnerabilityRepeats = invulnerabilityRepeats;
        this.destroyAttackOnHit = destroyAttackOnHit;
        this.lives = 3;
        this.isInvulnerable = false;
        this.isZanarkandActive = false;
        this.zanarkandTimerEvent = null;
        this.zanarkandCountDownTimer = null;
        this.shootTimer = null;
    }

    static preload(scene) {
        scene.load.image('flyship', 'images/flyship.png');
        scene.load.image('ball', 'images/ball.png');
        scene.load.image('zanarkand', 'images/zanarkandabes.png');
    }

    create() {
        this.flyShip = this.scene.physics.add.image(100, 250, 'flyship').setScale(0.04);
        this.flyShip.body.setSize(this.flyShip.width * 0.85, this.flyShip.height * 0.75, true);
        this.flyShip.body.allowGravity = false;
        this.flyShip.setCollideWorldBounds(true);

        this.livesText = this.scene.add.text(20, 20, `VIDAS: ${this.lives}`, {
            fontSize: '22px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 5
        });

        this.abesBuffText = this.scene.add.text(20, 52, '', {
            fontSize: '15px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffd700',
            stroke: '#002255',
            strokeThickness: 4
        });

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.balls = this.scene.physics.add.group();
        this.powerups = this.scene.physics.add.group();

        this.setShootTimer(350);
        this.scheduleNextZanarkandSpawn();
    }

    update() {
        if (!this.flyShip || !this.flyShip.active) return;

        const speed = 350;

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

        this.balls.getChildren().forEach((ball) => {
            if (ball && ball.x > 850) {
                ball.destroy();
            }
        });

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
        this.shootTimer = this.scene.time.addEvent({
            delay,
            callback: this.shootBall,
            callbackScope: this,
            loop: true
        });
    }

    scheduleNextZanarkandSpawn() {
        const randomDelay = Phaser.Math.Between(6000, 16000);
        this.scene.time.delayedCall(randomDelay, () => {
            this.spawnZanarkandPowerup();
            this.scheduleNextZanarkandSpawn();
        });
    }

    spawnZanarkandPowerup() {
        if (!this.flyShip || !this.flyShip.active) return;
        if (this.powerups.countActive(true) > 0) return;

        const spawnX = 840;
        const spawnY = Phaser.Math.Between(80, 430);
        const randomSpeed = Phaser.Math.Between(-100, -170);
        const item = this.powerups.create(spawnX, spawnY, 'zanarkand');

        if (!item) return;

        item.setScale(0.08);
        item.body.allowGravity = false;
        item.setVelocityX(randomSpeed);

        const waveOffset = Phaser.Math.Between(25, 45);
        const waveDuration = Phaser.Math.Between(900, 1500);
        this.scene.tweens.add({
            targets: item,
            y: spawnY + (Phaser.Math.Between(0, 1) ? waveOffset : -waveOffset),
            duration: waveDuration,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.scene.tweens.add({
            targets: item,
            scale: 0.095,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    collectZanarkandPowerup(ship, item) {
        item.destroy();
        this.isZanarkandActive = true;
        this.flyShip.setTint(0xffe066);
        this.setShootTimer(180);

        const notice = this.scene.add.text(this.flyShip.x, this.flyShip.y - 35, '¡ZANARKAND ABES!', {
            fontSize: '18px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: notice,
            y: notice.y - 40,
            alpha: 0,
            duration: 1200,
            onComplete: () => notice.destroy()
        });

        let remaining = 8;
        this.abesBuffText.setText(`★ ABES: ${remaining}s ★`);

        if (this.zanarkandCountDownTimer) this.zanarkandCountDownTimer.remove();
        this.zanarkandCountDownTimer = this.scene.time.addEvent({
            delay: 1000,
            repeat: 7,
            callback: () => {
                remaining--;
                this.abesBuffText.setText(remaining > 0 ? `★ ABES: ${remaining}s ★` : '');
            }
        });

        if (this.zanarkandTimerEvent) this.zanarkandTimerEvent.remove();
        this.zanarkandTimerEvent = this.scene.time.delayedCall(8000, () => {
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
        const ball = this.balls.create(spawnX, this.flyShip.y, 'ball');
        if (!ball) return;

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

    hitShip(ship, attack) {
        if (this.destroyAttackOnHit && attack) {
            attack.destroy();
        }
        if (this.isInvulnerable) return;

        this.lives--;
        this.livesText.setText(`VIDAS: ${this.lives}`);

        if (this.lives <= 0) {
            this.scene.stopMusic();
            this.scene.scene.start('gameover');
            return;
        }

        this.isInvulnerable = true;
        this.scene.tweens.add({
            targets: this.flyShip,
            alpha: 0.2,
            duration: 100,
            yoyo: true,
            repeat: this.invulnerabilityRepeats,
            onComplete: () => {
                if (this.flyShip) {
                    this.flyShip.alpha = 1;
                    if (this.isZanarkandActive) {
                        this.flyShip.setTint(0xffe066);
                    } else {
                        this.flyShip.clearTint();
                    }
                }
                this.isInvulnerable = false;
            }
        });
    }
}
