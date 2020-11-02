class FourLabel{
    constructor(game, text){
        this.game = game
        this.text = text
    }
    draw() {
        this.game.context.fillText(this.text, 100, 30)
    }
    static new(game, text){
        return new this(game, text)
    }
    update(){

    }
}
