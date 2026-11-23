export class Scoreboard {
    constructor(scene) {
        this.relatedScene = scene;
        const savedScore = scene.registry.get('score');
        this.score = Number.isFinite(savedScore) ? savedScore : 0;
    }

    create() {
        this.scoreText = this.relatedScene.add.text(20, 84, `PUNTOS: ${this.score}`, {
            fontSize: '20px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',
            stroke: '#002255',
            strokeThickness: 5,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000814',
                blur: 4,
                stroke: true,
                fill: true
            }
        });
    }

    incrementPoint(points) {
        this.score += points;
        this.relatedScene.registry.set('score', this.score);
        this.scoreText.setText(`PUNTOS: ${this.score}`);
    }
}