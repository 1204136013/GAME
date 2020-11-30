class Score {
    constructor(game) {
        this.game = game
        this.score = 0
    }

    static new(game) {
        return new this(game)
    }

    update() {

    }

    draw() {
        
    }

    // 将数字的各个数位分离
    parseNumber(n) {
        n = "" + n
        var r  = []
        for (x of n) {
            r.push(x)
        }
        return r
    }

    add(){
        this.score ++
    }

}