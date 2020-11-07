class SceneEdit extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var s = Scene.new(game)
            game.replaceScene(s)
        })
        // levels[0] = []
        this.blocks = []
        game.canvas.addEventListener("mousedown", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log("生成 block", x, y)
            var p = [x, y]
            var b = Block(game, p)
            b.cell(x, y)
            this.blocks.push(b)
            for (var i = 0; i < levels[0].length; i++) {
                var block = levels[0][i]
                if (block[0] == b.x && block[1] == b.y) {
                    block[2] += 1
                    log("life + 1", block)
                    log("levels", levels)
                    return
                }
            }
            levels[0].push([b.x, b.y, b.lifes])
            log("levels", levels)
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