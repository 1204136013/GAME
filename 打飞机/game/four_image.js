class FourImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.alive = true
        this.name = name
    }
    draw() {
        if (this.alive) {
            this.game.drawImage(this)
        }
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    update() {

    }   
}

// 逻辑上， 不应该继承 GuaImage
// class Player extends FourImage{
//     constructor(game, name) {
        
//     }
// }