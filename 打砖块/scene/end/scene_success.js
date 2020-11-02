// 通关场景
class SceneSuccess extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("r", function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    
    draw() {
        this.game.context.fillText("YOu DID IT, press r to restart", 100, 30)


    }
    update() {

    }
}