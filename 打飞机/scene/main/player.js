class Player extends FourImage {
    constructor(game) {
        super(game, "player")
        this.setup()
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
        this.alive = true
        this.lifes = 1
        this.x = 100
        this.y = 400
    }
    moveLeft() {
        this.x -= this.speed
        if (this.x < 0){
            this.x = 0
        }
    }
    moveRight() {
        this.x += this.speed
        if (this.x + this.w > 400){
            this.x = 400 - this.w
        }

    }
    moveUp() {
        this.y -= this.speed
        if(this.y < 0){
            this.y = 0
        }
    }
    moveDown() {
        this.y += this.speed
        if (this.y + this.h > 600){
            this.y = 600 -  this.h
        }
    }

    fire() {
        if (this.cooldown != 0 || !this.alive) {
            return
        }
        this.cooldown = config.fire_cooldown
        var x = this.x + this.w/2
        var y = this.y
        var b = Bullet.new(this.game, "bullet")
        b.x = x - b.w / 2
        b.y = y - b.h
        this.scene.addElement(b)
        log("b", b)
        this.scene.bullets.push(b)
    }

    collide(es) {
        var killed = false
        for (var i = 0; i < es.length; i++){
            var b = es[i]
            if (this.alive && b.alive) {
                if (recIntersects(this, b) || recIntersects(b, this)){
                    if (this.kill()){
                        killed = true
                    }
                } 
            }
        }
        return killed
    }

    kill() {
        var o = this
        o.lifes = o.lifes - 1
        if (o.lifes < 1) {
            o.alive = false
            return true
        }
    }

    explode() {
        var x = this.x + this.w / 2
        var y = this.y + this.h / 2
        var ps = FourParticleSystem.new(this.game, x, y)
        this.scene.addElement(ps)
        log("爆炸")
    }


}
