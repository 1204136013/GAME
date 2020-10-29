class SceneTitle extends FourScene {
    constructor(game) {
        super(game)
        var label = FourLabel.new(game, "hello")
        this.addElement(label)

        //cave
        var cave = FourImage.new(game, "cave")
        this.addElement(cave)
        
        //player
        var w = FourAnimation.new(game)
        w.x = 100
        w.y = 390
        this.w = w
        this.addElement(w)
        this.setupInputs()

    }
    setupInputs = () => {
        this.game.registerAction("a", (keyStatus) => {
            log("eventa", keyStatus)
            this.w.move(-2, keyStatus)
        })
        this.game.registerAction("d", (keyStatus) => {
            log("eventd", keyStatus)
            this.w.move(2, keyStatus)
        })
    }
}

