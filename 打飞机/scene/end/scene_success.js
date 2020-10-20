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
        var gradient = this.game.context.createLinearGradient(0, 0, 400, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        this.game.context.fillStyle = gradient
        this.game.context.fillText("YOu DID IT, press r to restart", 100, 30)


    }
    update() {

    }
}