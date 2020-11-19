class Enemy extends FourImage {
    constructor(game, i) {
        var type = initType(i)
        var name = "enemy" + type
        super(game, name)
        this.name = name
        this.setup(type)
    }
    setup(type) {
        this.type = type
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 350)
        this.y = - randomBetween(50, 200)
        this.limitX()
        this.alive = true
        this.lifes = 2 * (type + 1) // 根据敌人类型设置生命值
        // this.lifes = 1
    }
    update() {
        this.y += this.speed
        if (this.y > 620) {
            this.setup(this.type)
        }
    }
    
    // 如果敌人飞机超出画布的最右边, 则修正飞机的 x 轴坐标
    limitX() {
        if (this.x + this.w > 400) {
            this.x = 400 - this.w
        }
    }

    // 这里有一个 bug 如果原本没撞到的子弹, 后来撞到了, 会导致循环提前结束
    // 后面就算是撞到了的子弹也无法继续进行判断逻辑
    collide(bs) {
        var killed = false
        for (var i = 0; i < bs.length; i++){
            var b = bs[i]
            if (this.alive && b.alive) {
                if (recIntersects(this, b) || recIntersects(b, this)){
                    b.kill()
                    if (this.kill()){
                        killed = true
                        log("enmey scene", this.scene)
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
