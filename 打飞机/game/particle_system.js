class FourParticleSystem{
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(game){
        return new this(game)
    }

    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 50
        this.particles = []
    }
    
    update() {
        // 添加小火花
        log("update particlesys")
        this.duration--
        if (this.duration < 0){
            // TODO 删掉所有的火花, 从 scene的element中删掉这个ps元素
            // return
            this.particles = []
            return
        }
        if (this.particles.length < this.numberOfParticles) {
            var p = FourParticle.new(this.game)
            // 设置初始化坐标
            var s = 5
            var vx = 0.1 * randomBetween(-s, s)
            var vy = 0.1 * randomBetween(-s ,s)
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
        log("draw particlesys")
        for (var p of this.particles) {
            p.draw()
        }
    }
}

class FourParticle extends FourImage{
    constructor(game){
        super(game, "fire")
        this.setup()
    }
    setup() {
        this.life = 60
    }

    init(x, y, vx, vy){
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