class SceneTitle extends FourScene {
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
    }

    update() {
    }
    
    draw() {
        super.draw()
        this.game.context.fillText("标题界面, 按 k 开始 后 按 j 跳跃", 130, 100)
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
        var e = Scene.new(this.game)
        
        this.game.registerAction("k", () => {
            var gs = this.game.sceneName()
            if (gs != "SceneTitle"){
                return
            }
            e.setup()  
            log("title 2 main")
            this.game.replaceScene(e)
        })
    }

}