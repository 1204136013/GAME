class Scene extends FourScene {
    constructor(game) {
        super(game)
        this.setup(game)
    }

    setup() {
        this.elements = []
        var game = this.game
        //bg
        var bg = FourImage.new(game, "bg")
        this.addElement(bg)
        // 加入管子
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        //bird
        var b = FourAnimation.new(game)
        b.x = 150
        b.y = 190
        this.bird = b
        this.addElement(this.bird)
        // 加入地面
        var g = Grounds.new(game)
        this.ground = g
        this.addElement(this.ground)
        this.setupInputs()

        //加入分数
        var s = Score.new(game)
        this.score = s
        this.addElement(s)        
    }

    update() {
        super.update()
        var b = this.bird
        var p = this.pipe
        if (this.pipe.pass(b)){
            this.score.add()
            log("超过", this.score.score)
        }
        if (b.collide(p)){
            log("玩家坠毁")
            this.stop()
            var e = SceneEnd.new(this.game)
            setTimeout(() => {
                log("main 2 end")
                this.game.replaceScene(e)
            }, 1500)
        }
    }

    stop(){
        var b = this.bird
        var p = this.pipe
        var g = this.ground
        b.fall()
        p.stop()
        g.stop()
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