class Scene extends FourScene {
    constructor(game) {
        super(game)

        //bg
        var bg = FourImage.new(game, "bg")
        this.addElement(bg)
        // 加入管子
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // TODO: 地面抽象成一个类
        //地面, 循环移动
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = FourImage.new(game, "ground")
            g.x = i * 19
            g.y = 530
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        //player
        var b = FourAnimation.new(game)
        b.x = 150
        b.y = 190
        this.bird = b
        this.addElement(this.bird)
        this.setupInputs()

    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        this.offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += this.offset
        }
    }
    setupInputs = () => {
        var b = this.bird
        this.game.registerAction("a", (keyStatus) => {
            log("eventa", keyStatus)
            b.move(-2, keyStatus)
        })
        this.game.registerAction("d", (keyStatus) => {
            log("eventd", keyStatus)
            b.move(2, keyStatus)
        })
        this.game.registerAction("j", (keyStatus) => {
            b.jump()
        })

    }
}

