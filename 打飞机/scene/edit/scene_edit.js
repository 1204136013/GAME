class SceneEdit extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var s  = Scene(game)
            game.replaceScene(s)
            })
        this.block = Block(game, [0, 0])
        game.canvas.addEventListener("mouseup", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, "up")
            log("this", this)
            log("thisblock", this.block)
            this.block.x = x
            this.block.y = y
        })
    }

    draw() {
        this.game.context.fillText("关卡编辑", 100, 30)
        this.game.drawImage(this.block)
    }
    update() {
        
    } 



}