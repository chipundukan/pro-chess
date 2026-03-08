const Commentary = {
scene: null,
commentText: null,
lines: ["What a shot!","Incredible pass!","Goal!","Fantastic save!","Great defending!"],

init(scene){
    this.scene = scene;
    this.commentText = scene.add.text(scene.cameras.main.width/2,100,"",{fontSize:"36px", fill:"#ffff00"})
        .setOrigin(0.5).setScrollFactor(0);
},

say(text){
    this.commentText.setText(text);
    setTimeout(()=>{ this.commentText.setText(""); },3000);
},

sayRandom(){
    const line = this.lines[Math.floor(Math.random()*this.lines.length)];
    this.say(line);
}
};
