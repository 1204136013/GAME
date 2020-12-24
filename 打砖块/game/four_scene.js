class FourScene {
    constructor(game) {
        this.game = game
    }

    draw() {

    }

    static new(game) {
        this.i = this.i || new this(game)
        return this.i
    }

    update() {

    }
}
