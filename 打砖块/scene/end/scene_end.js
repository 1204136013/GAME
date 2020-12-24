class SceneEnd extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("r", function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText("游戏结束, 按 r 回到标题页", 100, 30)
    }

    update() {

    }
}