class SceneTitle extends FourScene {
    constructor(game) {
        super(game)
        game.registerAction("k", function () {
            var s  = Scene(game)
            game.replaceScene(s)
            })
    }
    static new(game) {
        var i = new this(game)
        return i 
    }
    draw() {
        var gradient = this.game.context.createLinearGradient(0,0,400,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        this.game.context.fillStyle=gradient
        this.game.context.fillText("开始游戏, press k", 100, 30)

    }
    update() {

    }   

}