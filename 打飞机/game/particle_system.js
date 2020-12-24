class FourParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.setup(x, y)
    }

    static new(game, x, y) {
        return new this(game, x, y)
    }

    setup(x, y) {
        this.duration = 30
        this.x = x
        this.y = y
        this.numberOfParticles = 50
        this.particles = []
    }

    update() {
        // 添加小火花
        this.duration--
        if (this.duration < 0) {
            this.particles = []
            return
        }
        if (this.particles.length < this.numberOfParticles) {
            var p = FourParticle.new(this.game)
            // 设置初始化坐标
            var s = 5
            var vx = 0.2 * randomBetween(-s, s)
            var vy = 0.2 * randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有小火花
        for (var p of this.particles) {
            p.update()
        }
        // 删掉小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        // log("draw particlesys")
        for (var p of this.particles) {
            p.draw()
        }
    }
}

class FourParticle extends FourImage {
    constructor(game) {
        super(game, "fire")
        this.setup()
    }
    
    setup() {
        this.life = 60
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}