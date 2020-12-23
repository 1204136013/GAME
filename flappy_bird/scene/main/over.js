class Over {
    constructor(game) {
        this.game = game
        var g = FourImage.new(game, "over")
        g.x = 90
        g.y = 125
        this.icon = g
    }

    static new(game) {
        return new this(game)
    }

    update() {
    }

    draw() {
        this.icon.draw()
    }

}