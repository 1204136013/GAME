const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 3,
    bullet_speed: 6,
    fire_cooldown: 10,
}

class Scene extends FourScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    update() {
        super.update()
        // this.cloud.y += 1
    }

    setup() {
        this.numberOfEnemies = 7
        this.bg = FourImage.new(this.game, "sky")
        this.cloud = Cloud.new(this.game, "cloud")
        this.player = Player.new(this.game)
        this.player.x = 100
        this.player.y = 150

        // 这里 push 的顺序需要注意, bg必须第一个， 不然会盖住其他图片
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
        this.addEnemies()
        var ps = FourParticleSystem.new(this.game)
        this.addElement(ps)
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game, i)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction("a", function () {
            s.player.moveLeft()
        })
        g.registerAction("d", function () {
            s.player.moveRight()
        })
        g.registerAction("w", function () {
            s.player.moveUp()
        })
        g.registerAction("s", function () {
            s.player.moveDown()
        })
        g.registerAction("j", function () {
            s.player.fire()
        })

        // game.registerAction("f", function () {
        //     ball.fire()
        // })

    }
}
