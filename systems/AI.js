const AI = {
update(enemies, ball, players){
    enemies.forEach((e,i)=>{
        // Goalkeeper
        if(i===0){
            if(ball.x>3700) e.y = Phaser.Math.Clamp(ball.y,900,1100);
        } else {
            e.scene.physics.moveToObject(e, ball, 150);
        }
    });
}
};
