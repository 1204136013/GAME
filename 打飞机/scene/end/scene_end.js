class SceneEnd extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("r", function () {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    
    draw() {
        this.game.context.fillText("Game Over, press r to restart", 100, 30)


    }
    update() {

    }
}