export class Scoreboard {
    constructor(scene){
        this.relatedScene =scene;
        this.score =0;
    }
    create(){
        this.scoreText = this.relatedScene.add.text(16, 16, 'PUNTOS: 0', {
            fontSize: '24px',
            fontFamily: '"Trebuchet MS", "Optima", sans-serif',
            fontStyle: 'bold italic',
            fill: '#ffe680',           // Dorado claro
            stroke: '#002255',         // Borde azul marino estilo FFX
            strokeThickness: 5,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000814',
                blur: 4,
                stroke: true,
                fill: true
            }
        })
    }
    incrementPoint(points){
        this.score+=points;
        this.scoreText.setText('Puntos: '+ this.score);
    }
}