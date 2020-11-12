class SceneTitle extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var gs = game.sceneName()
            if (gs != "SceneTitle"){
                return
            }
            var s  = Scene.new(game)
            s.reset()
            game.replaceScene(s)
            })
        game.registerAction("e", function () {
            var gs = game.sceneName()
            if (gs != "SceneTitle"){
                return
            }
            var s  = SceneEdit.new(game)
            game.replaceScene(s)
            })

    }

    draw() {
        this.game.context.fillText("按 k 开始游戏", 100, 30)
    }
    update() {

    }   

}