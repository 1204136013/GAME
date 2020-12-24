class FourImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.flipY = false
        this.rotation = 0
    }

    draw() {
        this.game.drawImage(this)
    }

    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    update() {

    }
}
