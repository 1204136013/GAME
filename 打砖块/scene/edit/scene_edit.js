class SceneEdit extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var s = Scene(game)
            game.replaceScene(s)
        })
        this.blocks = []
        game.canvas.addEventListener("mousedown", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, "up")
            log("this", this)
            log("thisblock", this.block)
            this.blocks.push(Block(game, [x, y]))
        })
    }

    draw() {
        var gradient = this.game.context.createLinearGradient(0, 0, 400, 0);
        gradient.addColorStop("0", "magenta")
        gradient.addColorStop("0.5", "blue")
        gradient.addColorStop("1.0", "red")
        this.game.context.fillStyle = gradient
        this.game.context.fillText("关卡编辑", 100, 30)
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            this.game.drawImage(block)
        }
    }
    update() {

    }



}