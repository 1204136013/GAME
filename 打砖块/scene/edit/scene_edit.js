class SceneEdit extends FourScene {
    constructor(game) {
        super(game)
        this.levels = [[]]
        this.blocks = [[]]
        this.l = 0

        game.registerAction("t", () => {
            var gs = game.sceneName()
            if (gs != "SceneEdit"){
                return
            }
            log("edit levels", levels)
            levels = this.levels
            log("edit this levels", this.levels)
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })

        game.registerAction("n",  () => {
            var gs = game.sceneName()
            if (gs != "SceneEdit"){
                return
            }
            this.l += 1
            this.levels.push([])
            this.blocks.push([])
        })

        game.canvas.addEventListener("mousedown", (event) => {
            var x = event.offsetX
            var y = event.offsetY
            log("生成 block", x, y)
            var p = [x, y]
            var b = Block(game, p)
            b.cell(x, y)
            for (var i = 0; i < this.levels[this.l].length; i++) {
                var p = this.levels[this.l][i]
                if (p[0] == b.x && p[1] == b.y) {
                    p[2] += 1
                    log("life + 1")
                    return
                }
            }
            this.blocks[this.l].push(b)
            this.levels[this.l].push([b.x, b.y, b.lifes])
            log("this.leves.push", this.levels)
        })
    }

    draw() {
        if (this.l == 1){
            log("log bug", this.blocks)
        }

        this.game.context.fillText("关卡编辑, 按 n 编辑下一关, 按 t 编辑结束回到标题", 100, 30)
        
        for (var i = 0; i < this.blocks[this.l].length; i++) {
            var block = this.blocks[this.l][i]
            this.game.drawImage(block)
        }

    }

    update() {

    }

    clear() {
        this.levels = [[]]
        this.blocks = [[]]
    }

}