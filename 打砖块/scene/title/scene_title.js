class SceneTitle extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var s  = Scene.new(game)
            game.replaceScene(s)
            })
        game.registerAction("b", function () {
            var s  = SceneEdit.new(game)
            game.replaceScene(s)
            })

    }

    draw() {
        this.game.context.fillText("开始游戏, press k", 100, 30)

    }
    update() {

    }   

}