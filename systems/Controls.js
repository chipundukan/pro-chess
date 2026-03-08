const Controls = {
scene: null,
activePlayer: null,
ball: null,
speed: 200,
switchCooldown: 0,

init(scene, activePlayer, ball){
    this.scene = scene;
    this.activePlayer = activePlayer;
    this.ball = ball;
    this.keys = scene.input.keyboard.addKeys('W,A,S,D,SHIFT,Q,SPACE');
},

update(){
    if(!this.activePlayer) return;

    let velX = 0, velY = 0;
    if(this.keys.W.isDown) velY = -this.speed;
    if(this.keys.S.isDown) velY = this.speed;
    if(this.keys.A.isDown) velX = -this.speed;
    if(this.keys.D.isDown) velX = this.speed;

    this.activePlayer.setVelocity(velX, velY);

    // Player switching (Q key)
    this.switchCooldown -= this.scene.game.loop.delta;
    if(this.keys.Q.isDown && this.switchCooldown <= 0){
        this.switchPlayer();
        this.switchCooldown = 500;
    }

    if(this.keys.SHIFT.isDown) this.speed = 350; else this.speed = 200;
},

shoot(){
    this.scene.physics.moveToObject(this.ball, {x:this.ball.x + 500, y:this.ball.y}, 700);
},

pass(){
    this.scene.sound.play("pass");
    this.scene.physics.moveToObject(this.ball, this.activePlayer, 350);
},

switchPlayer(){
    const teammates = this.scene.players.filter(p=>p!==this.activePlayer);
    let nearest = teammates[0];
    let minDist = Phaser.Math.Distance.Between(this.ball.x,this.ball.y,nearest.x,nearest.y);
    teammates.forEach(t=>{
        let dist = Phaser.Math.Distance.Between(this.ball.x,this.ball.y,t.x,t.y);
        if(dist<minDist){ minDist=dist; nearest=t; }
    });
    this.activePlayer = nearest;
}
};
