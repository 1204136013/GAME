class Bullet extends FourImage{
    constructor(game){
        super(game, "bullet")
        this.setup()
    }

    setup() {
        this.speed = 5
        this.alive = true
    }

    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
        if (this.y < 0){
            this.kill()
        }
    }

    kill() {
        this.alive = false
    }
}
