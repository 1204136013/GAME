class FourScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            this.game.drawImage(e)
        }
    }
    static new(game) {
        var i = new this(game)
        return i
    }

    update() {

    }
    addElement(img) {
        this.elements.push(img)
    }
}
