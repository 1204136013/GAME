class Bullet extends FourImage{
    constructor(game){
        super(game, "bullet")
        this.setup()
    }
    setup() {
        this.speed = 5
    }
    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}
