class MatchScene extends Phaser.Scene {
constructor(){ super("match"); }

preload(){
this.load.image("pitch","assets/pitch.png");
this.load.image("player","assets/player.png");
this.load.image("enemy","assets/enemy.png");
this.load.image("ball","assets/ball.png");

this.load.audio("music","assets/music/stadium.mp3");
this.load.audio("crowd","assets/music/crowd.mp3");
this.load.audio("goal","assets/music/goal.mp3");
this.load.audio("pass","assets/music/pass.mp3");
}

create(){
// Pitch
const pitch = this.add.image(2000,1000,"pitch").setDisplaySize(4000,2000);
this.physics.world.setBounds(0,0,4000,2000);

// Ball
this.ball = this.physics.add.sprite(2000,1000,"ball");
this.ball.setBounce(0.9);

// Player team
this.players=[];
for(let i=0;i<11;i++){
const p = this.physics.add.sprite(1500+Phaser.Math.Between(-200,200),1000+Phaser.Math.Between(-200,200),"player");
this.players.push(p);
}
this.activePlayer=this.players[0];

// AI team
this.enemies=[];
for(let i=0;i<11;i++){
const e = this.physics.add.sprite(2500+Phaser.Math.Between(-200,200),1000+Phaser.Math.Between(-200,200),"enemy");
this.enemies.push(e);
}

// Camera follows ball
this.cameras.main.startFollow(this.ball);

// Scoreboard
this.playerScore=0;
this.aiScore=0;
this.scoreText=this.add.text(20,20,"0 - 0",{fontSize:"40px",fill:"#fff"}).setScrollFactor(0);

// Timer
this.matchTime=0;
this.timerText=this.add.text(window.innerWidth-150,20,"00:00",{fontSize:"32px",fill:"#fff"}).setScrollFactor(0);

// Music & crowd
this.music=this.sound.add("music",{loop:true,volume:0.4}); this.music.play();
this.crowd=this.sound.add("crowd",{loop:true,volume:0.5}); this.crowd.play();

// Commentary
Commentary.init(this);

// Controls
Controls.init(this,this.activePlayer,this.ball);
}

update(time,delta){
Controls.update();
AI.update(this.enemies,this.ball,this.players);
this.goalCheck();
this.updateTimer(delta);
}

updateTimer(delta){
this.matchTime+=delta;
let minutes=Math.floor(this.matchTime/60000);
let seconds=Math.floor((this.matchTime%60000)/1000);
this.timerText.setText((minutes<10?'0':'')+minutes+":"+(seconds<10?'0':'')+seconds);
}

goalCheck(){
if(this.ball.x<50){
this.aiScore++;
this.sound.play("goal");
Commentary.say("Goal for AI!");
this.resetPositions();
}
if(this.ball.x>3950){
this.playerScore++;
this.sound.play("goal");
Commentary.say("GOOOAL! Player scores!");
this.resetPositions();
}
this.scoreText.setText(this.playerScore+" - "+this.aiScore);
}

resetPositions(){
this.ball.setPosition(2000,1000);
this.activePlayer.setPosition(1500,1000);
this.players.forEach((p,i)=>{if(i!==0)p.setPosition(1500+Phaser.Math.Between(-200,200),1000+Phaser.Math.Between(-200,200))});
this.enemies.forEach(e=>{e.setPosition(2500+Phaser.Math.Between(-200,200),1000+Phaser.Math.Between(-200,200))});
}
}
