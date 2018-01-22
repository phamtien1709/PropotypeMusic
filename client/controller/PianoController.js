class PianoController {
    constructor(x, y,spriteName, configs) {
        this.configs = configs;
        this.sprite = KT.pianoGroup.create(x, y, spriteName);
        this.sprite.anchor.set(0.5);
        this.sprite.update = this.update.bind(this);
        this.sprite.alpha = 1;
        // this.sprite.scale.set(0.5);
        // console.log(this.sprite.position);
        // this.sprite.kill();
        this.stretch = KT.game.height - KT.configs.HEIGHT_TOOL-16.05 - 41.5;
        this.time = 17.35;
        this.velo = 1;
        this.acceleration = (this.stretch-this.velo*this.time)/(this.time*this.time)/4;
        // console.log(this.sprite.y);
        // this.acceleration = 10;
    }
    update() {
        if (KT.checkPlay) {
            if(KT.timeoutPlay.ms >= this.configs.time*1000 - 1500){
                this.sprite.position.y += this.velo;
            }
            if (this.sprite.position.y >= 41.5) {
                this.velo = this.velo + this.acceleration; 
                this.sprite.position.y += this.velo;
            }
            if (this.sprite.position.y > KT.game.height) {
                KT.endGame = true;
                KT.checkPlay = false;
                KT.timeoutPlay.stop();
            }
        }
    }
}
// 10758
// 622.5
// 385.5