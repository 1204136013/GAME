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
            log("生成 block", x, y)
            var p = [x, y]
            var b = Block(game, p)
            b.cell(x, y)
            this.blocks.push(b)
            levels[0].push(p)
        })

        window.addEventListener("keydown", event => {
            log(event.key)
            log(levels)
        })

    }

    draw() {
        this.game.context.fillText("关卡编辑", 100, 30)
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            this.game.drawImage(block)
        }
    }
    update() {

    }
}