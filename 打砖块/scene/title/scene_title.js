class SceneTitle extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var gs = game.sceneName()
            if (gs != "SceneTitle") {
                return
            }
            var s = Scene.new(game)
            s.reset()
            game.replaceScene(s)
        })

        game.registerAction("e", function () {
            var gs = game.sceneName()
            if (gs != "SceneTitle") {
                return
            }
            var s = SceneEdit.new(game)
            s.clear()
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText("按 k 开始游戏后按 f 发射球, 按 e 进入关卡编辑", 100, 30)
    }

    update() {

    }

}