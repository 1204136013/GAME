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
        this.cooldown = 0
        this.speed = randomBetween(1, 3)
        this.x = randomBetween(0, 350)
        this.y = - randomBetween(50, 200)
        this.limitX()
        this.alive = true
        this.lifes = 2 * (type + 1) // 根据敌人类型设置生命值
    }
    
    update() {
        this.y += this.speed
        if (this.y > 620) {
            this.setup(this.type)
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
        this.fire()
    }

    // 如果敌人飞机超出画布的最右边, 则修正飞机的 x 轴坐标
    limitX() {
        if (this.x + this.w > 400) {
            this.x = 400 - this.w
        }
    }

    collide(bs) {
        var killed = false
        for (var i = 0; i < bs.length; i++) {
            var b = bs[i]
            if (this.alive && b.alive && !b.reverse) {
                if (recIntersects(this, b) || recIntersects(b, this)) {
                    b.kill()
                    if (this.kill()) {
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

    fire() {
        if (this.cooldown != 0 || !this.alive) {
            return
        }
        this.cooldown = config.enemy_fire_cooldown + Math.floor(this.x / 10) + this.speed * 5 // 敌机子弹冷却时间加上自己的随机值, 这样不会只能所有敌机同时开火
        var x = this.x + this.w / 2
        var y = this.y + this.h
        var b = Bullet.new(this.game, "bullete")
        b.x = x - b.w / 2
        b.y = y - b.h
        this.scene.addElement(b)
        this.scene.bullets.push(b)
    }
}

