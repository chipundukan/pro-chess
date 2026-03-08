const config = {
type: Phaser.AUTO,
width: window.innerWidth,
height: window.innerHeight,
parent: "game",
physics:{
default:"arcade",
arcade:{debug:false}
},
scene:[MatchScene]
};

const game = new Phaser.Game(config);
