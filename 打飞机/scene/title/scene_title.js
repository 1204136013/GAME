class SceneTitle extends FourScene {
    constructor(game) {
        super(game)
        var label = FourLabel.new(game, "hello")
        this.addElement(label)
    }

}

