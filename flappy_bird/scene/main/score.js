class Score {
    constructor(game) {
        this.game = game
        this.score = 0
        this.score_pictures = []
        for (var i = 0; i < 10; i++) {
            this.score_pictures.push(FourImage.new(game, "n" + i))
        }
    }

    static new(game) {
        return new this(game)
    }

    update() {

    }

    draw() {
        var context = this.game.context
        var ns = this.parseNumber(this.score)
        var x = 190
        for (var i = 0; i < ns.length; i++) {
            var n = ns[i]
            var p = this.score_pictures[n]
            context.drawImage(p.texture, x, 100)
            x = x + 24
        }
    }

    // 将数字的各个数位分离
    parseNumber(n) {
        n = "" + n
        var r = []
        for (var x of n) {
            r.push(+x)
        }
        return r
    }

    add() {
        this.score++
    }
} 