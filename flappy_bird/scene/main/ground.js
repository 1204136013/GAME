class Grounds {
    constructor(game) {
        this.game = game
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = FourImage.new(game, "ground")
            g.x = i * 19
            g.y = 530
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount--
        this.offset = -5

    }

    static new(game) {
        return new this(game)
    }

    update() {
        if (this.move){
            for (var p of this.pipes) {
                p.x -= 5
                if (p.x < -100) {
                    p.x += this.管子横向间距 * this.columsOfPipe
                }
            }
        }
    }

    draw() {
    }

    // 地面停止移动
    stop() {
        this.move  = false
    }
}