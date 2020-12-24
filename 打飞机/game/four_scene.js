class FourScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
    }

    draw() {
        for (var e of this.elements) {
            // this.game.drawImage(e)
            e.draw()
        }
    }
    
    static new(game) {
        this.i = this.i || new this(game)
        return this.i
    }

    update() {
        if (this.debugModeEnabled) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
}
