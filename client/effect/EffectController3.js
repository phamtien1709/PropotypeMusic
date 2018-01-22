class EffectController3 {
    constructor (x, y, spriteName, configs){
        this.configs = configs;
        this.sprite = KT.effectGroup.create(x, y, spriteName);
        this.sprite.anchor.set(0.5);
        this.sprite.update = this.update.bind(this);
        // this.sprite.alpha = 0;
        this.sprite.kill();
        this.getx = Math.random();
        this.gety = Math.random();
        // this.sprite.scale.set(0.25);
    }
    update(){
        if(KT.timeoutPlay.ms >= this.configs.time*1000){
            // this.sprite.alpha = 1;
            this.sprite.revive();
            this.sprite.position.x += this.getx;
            this.sprite.position.y -= this.gety;
            this.sprite.alpha -= 0.4;
        }
        if(KT.timeoutPlay.ms >= this.configs.time*1000 +500){
            this.sprite.destroy();
        }
    }
}