class Grounds {
    constructor(game) {
        this.game = game
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = FourImage.new(game, "ground")
            g.x = i * 19
            g.y = 530
            this.grounds.push(g)
        }
        this.skipCount = 5
        this.move = true
    }

    static new(game) {
        return new this(game)
    }

    update() {
        if (!this.move) {
            return
        }
        this.skipCount--
        this.offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            this.offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += this.offset
        }
    }

    draw() {
        for (var x of this.grounds) {
            x.draw()
        }
    }

    stop() {
    // 地面停止移动
    this.move = false
    }
}