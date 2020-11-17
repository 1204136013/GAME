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
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }

    fire() {
        if (this.cooldown != 0) {
            return
        }
        this.cooldown = config.fire_cooldown
        var x = this.x + this.w/2
        var y = this.y
        var b = Bullet.new(this.game)
        b.x = x
        b.y = y
        this.scene.addElement(b)
        this.scene.bullets.push(b)
    }
}
