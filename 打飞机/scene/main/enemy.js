class Enemy extends FourImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = "enemy" + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 350)
        this.y = - randomBetween(50, 200)
        this.limitX()
    }
    update() {
        this.y += this.speed
        if (this.y > 620) {
            this.setup()
        }
    }
    
    // 如果飞机超出画布的最右边, 则修正飞机的 x 轴坐标
    limitX() {
        if (this.x + this.w > 400) {
            this.x = 400 - this.w
        }
    }
}
