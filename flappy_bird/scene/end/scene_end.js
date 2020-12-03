class SceneEnd extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("r", function () {
            var gs = game.sceneName()
            if (gs != "SceneEnd"){
                return
            }    
            var s = SceneTitle.new(game)
            log("end 2 title")
            game.replaceScene(s)
        })
    }
    
    draw() {
        this.game.context.fillText("游戏结束, 按 r 重开", 100, 30)
    }
    
    update() {

    }
}